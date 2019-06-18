import {SpecificEncoder} from './SpecificEncoder';
import {VectorEncodingTypeEnum} from './VectorEncodingTypeEnum';
import {IntEncoder} from './IntEncoder';
import {BooleanEncoder} from './BooleanEncoder';
import {BitLength} from '../../model/BitLength';
import {Vector} from '../../model/Vector';
import {TCModelPropType} from '../../types/TCModelPropType';

export class VendorVectorEncoder implements SpecificEncoder {

  public static readonly RANGE_DEFAULT: boolean = false;
  private encodingType: VectorEncodingTypeEnum;
  protected intEncoder: IntEncoder = new IntEncoder();
  protected boolEnc: BooleanEncoder = new BooleanEncoder();
  private bitString: string = '';
  private range: number[];
  protected ranges: number[][];
  private maxId: number;

  public encode(vector: TCModelPropType): string {

    vector = vector as Vector<boolean>;
    this.encodingType = VectorEncodingTypeEnum.RANGE;
    this.range = [];
    this.ranges = [];
    this.maxId = vector.maxId;

    let bitField = '';

    for (let i = 1; i <= vector.maxId; i ++) {

      const curValue = !!vector.get(i);

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
        const nextValue = !!vector.get(i + 1);

        // if there isn't a next value, then we'll wrap up this range
        if (!nextValue) {

          /**
           * this is the last value of the range, so we'll push it on to the
           * end into position 1
           */
          this.range.push(i);

          // store the array in our bigger array
          this.ranges.push(this.range);

          // clear the array for the next range
          this.range = [];

        } else if (this.range.length === 0) {

          // this is the first  value for this range
          this.range.push(i);

        }

      }

    }


    // if the range encoding is shorter
    if (this.useRange) {

      this.bitString = this.buildRangeEncoding();

    } else {

      this.encodingType = VectorEncodingTypeEnum.FIELD;
      // first item after maxId
      this.bitString = this.intEncoder.encode(this.maxId, BitLength.maxId);
      this.bitString += this.encodingType + '';

      this.bitString += bitField;

    }

    this.ranges = [];

    return this.bitString;

  }

  protected buildRangeEncoding(): string {

    const numEntries = this.ranges.length;

    let rangeString = this.intEncoder.encode(this.maxId, BitLength.maxId);

    rangeString += this.encodingType + '';

    // first set the max Vendor ID

    rangeString += this.boolEnc.encode(VendorVectorEncoder.RANGE_DEFAULT);
    rangeString += this.intEncoder.encode(numEntries, BitLength.rangeEncodingNumEntries);


    this.ranges.forEach((range: number[]): void => {

      const single = (range.length === 1);

      // first is the indicator of whether this is a single id or range (two)
      // 0 is single and range is 1
      rangeString += this.boolEnc.encode(!single);

      // second is the first (or only) vendorId
      rangeString += this.intEncoder.encode(range[0], BitLength.vendorId);

      if (!single) {

        rangeString += this.intEncoder.encode(range[1], BitLength.vendorId);

      }

    });

    return rangeString;

  }
  protected get useRange(): boolean {

    // the one is for the default consent value
    let rLength = BitLength.rangeEncodingDefaultConsent + BitLength.rangeEncodingNumEntries;

    this.ranges.forEach((range: number[]): void => {

      const single = (range.length === 1);

      rLength += BitLength.vendorId;
      rLength += (single) ? 0 : BitLength.vendorId;

    });

    return rLength < this.maxId;

  }

};
