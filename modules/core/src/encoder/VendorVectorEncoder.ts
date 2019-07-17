import {Encoder} from './Encoder';
import {Vector} from '../model/Vector';
import {IntEncoder} from './IntEncoder';
import {BooleanEncoder} from './BooleanEncoder';
import {FixedVectorEncoder} from './FixedVectorEncoder';
import {VectorEncodingType} from '../model/VectorEncodingType';
import {BitLength} from '../model/BitLength';

export class VendorVectorEncoder implements Encoder<Vector> {

  public static readonly RANGE_DEFAULT: boolean = false;
  private intEncoder: IntEncoder = new IntEncoder();
  private boolEnc: BooleanEncoder = new BooleanEncoder();
  private bitString: string;
  private ranges: number[][];
  private maxId: number;
  private index: number;

  public encode(value: Vector): string {

    let range: number[] = [];
    let bitString = '';

    this.ranges = [];
    this.maxId = value.maxId;

    let bitField = '';

    value.forEach((curValue: boolean, i): void => {

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
        const nextValue = value.has(i + 1);

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

  public decode(value: string): Vector {

    const intEncoder: IntEncoder = new IntEncoder();
    const boolEncoder: BooleanEncoder = new BooleanEncoder();
    let vector: Vector;

    this.index = 0;

    const maxId: number = intEncoder.decode(value.substr(this.index, BitLength.maxId));

    this.index += BitLength.maxId;

    const encodingType: VectorEncodingType = intEncoder.decode(value.charAt(this.index));

    this.index += 1;

    /**
     * Range is handled in batches so we'll need a different decoding scheme
     */
    if (encodingType === VectorEncodingType.RANGE) {

      const defaultValue: boolean = boolEncoder.decode(value.charAt(this.index));

      this.index += 1;
      vector = new Vector();

      // if default is true we need to set all the values and unset the ones listed in the ranges
      if (defaultValue) {

        for (let i =1; i <= maxId; i ++) {

          vector.set(i);

        }

      }

      const numEntries: number = intEncoder.decode(value.substr(this.index, BitLength.numEntries));

      this.index += BitLength.numEntries;

      // loop through each group of entries
      for (let i = 0; i < numEntries; i ++) {

        // Ranges can represent a single id or a range of ids.
        const isIdRange: boolean = boolEncoder.decode(value.charAt(this.index));

        this.index += 1;

        /**
         * regardless of whether or not it's a single entry or range, the next
         * set of bits is a vendor ID
         */
        const firstId: number = intEncoder.decode(value.substr(this.index, BitLength.vendorId));

        this.index += BitLength.vendorId;

        // if it's a range, the next set of bits is the second id
        if (isIdRange) {

          const secondId: number = intEncoder.decode(value.substr(this.index, BitLength.vendorId));

          this.index += BitLength.vendorId;

          // we'll need to set or unset all the vendor ids between the first and second
          for (let j = firstId; j <= secondId; j++) {

            /**
             * if defaultValue is === true, then we'll need to unset this
             * exception list otherwise, what I think will be really the only
             * case, we'll set the bit because nothing is set yet
             */
            if (defaultValue) {

              vector.unset(j);

            } else {

              vector.set(j);

            }

          }

        } else {

          /**
           * this is a single id so we'll set or unset it depending on what the
           * default value is
           */
          if (defaultValue) {

            vector.unset(firstId);

          } else {

            vector.set(firstId);

          }

        }

      }


    } else {

      const fvDec: FixedVectorEncoder = new FixedVectorEncoder();
      const bitField = value.substr(this.index, maxId);

      this.index += maxId;
      vector = fvDec.decode(bitField);

    }

    return vector;


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

      rLength += 1; // for the SingleOrRange bit
      rLength += BitLength.vendorId;
      rLength += (single) ? 0 : BitLength.vendorId;

    });

    return rLength < this.maxId;

  }

}
