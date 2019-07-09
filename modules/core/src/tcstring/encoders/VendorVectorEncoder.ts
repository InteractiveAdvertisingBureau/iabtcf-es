import {SpecificEncoder} from './SpecificEncoder';
import {VectorEncodingType} from '../VectorEncodingType';
import {IntEncoder} from './IntEncoder';
import {BooleanEncoder} from './BooleanEncoder';
import {BitLength} from '../BitLength';
import {Vector} from '../../model/Vector';

export class VendorVectorEncoder implements SpecificEncoder {

  public static readonly RANGE_DEFAULT: boolean = false;
  private intEncoder: IntEncoder = new IntEncoder();
  private boolEnc: BooleanEncoder = new BooleanEncoder();
  private bitString: string;
  private ranges: number[][];
  private maxId: number;

  public encode(vector: Vector): string {

    let range: number[] = [];
    let bitString = '';

    this.ranges = [];
    this.maxId = vector.maxId;

    let bitField = '';

    vector.forEach((curValue: boolean, i): void => {

      // build our bitfield no matter what
      bitField += this.boolEnc.encode(curValue);

      /**
       * if our value is positive and we're still assuming range encoding we
       * may want to start building a range or add this to an existing range
       */
      if (curValue) {

        /**
         * Look ahead to see if this is the last value in our range
         */
        const nextValue = vector.has(i + 1);

        // if there isn't a next value, then we'll wrap up this range
        if (!nextValue) {

          /**
           * this is the last value of the range, so we'll push it on to the
           * end into position 1
           */
          range.push(i);

          // store the array in our bigger array
          this.ranges.push(range);

          // clear the array for the next range
          range = [];

        } else if (range.length === 0) {

          // this is the first  value for this range
          range.push(i);

        }

      }

    });


    const encodingType: VectorEncodingType = this.rangeIsSmaller()
      ? VectorEncodingType.RANGE
      : VectorEncodingType.FIELD;

    // maxId
    bitString = this.intEncoder.encode(this.maxId, BitLength.maxId);

    // encoding type
    bitString += encodingType + '';

    if (encodingType === VectorEncodingType.RANGE) {

      bitString += this.buildRangeEncoding();

    } else {

      bitString += bitField;

    }

    this.ranges = [];

    return bitString;

  }

  private buildRangeEncoding(): string {

    const numEntries = this.ranges.length;

    // set with range default (always 0 because there is no practical case for a default of 1)
    let rangeString = this.boolEnc.encode(VendorVectorEncoder.RANGE_DEFAULT);

    // describe the number of entries to follow
    rangeString += this.intEncoder.encode(numEntries, BitLength.numEntries);


    // each range
    this.ranges.forEach((range: number[]): void => {

      // is this range a single?
      const single = (range.length === 1);

      // first is the indicator of whether this is a single id or range (two)
      // 0 is single and range is 1
      rangeString += this.boolEnc.encode(!single);

      // second is the first (or only) vendorId
      rangeString += this.intEncoder.encode(range[0], BitLength.vendorId);

      if (!single) {

        // add the second id if it exists
        rangeString += this.intEncoder.encode(range[1], BitLength.vendorId);

      }

    });

    return rangeString;

  }
  private rangeIsSmaller(): boolean {

    // the one is for the default consent value
    let rLength = 1 + BitLength.numEntries;

    this.ranges.forEach((range: number[]): void => {

      const single = (range.length === 1);

      rLength += BitLength.vendorId;
      rLength += (single) ? 0 : BitLength.vendorId;

    });

    return rLength < this.maxId;

  }

};
