import {

  Vector,

} from '../../model';

import {

  BitLength,

} from '../';

import {

  IntEncoder,
  BooleanEncoder,
  FixedVectorEncoder,
  VectorEncodingType,

} from '.';

export class VendorVectorEncoder {

  public static readonly RANGE_DEFAULT: boolean = false;

  public static encode(value: Vector): string {

    let range: number[] = [];
    let bitField = '';
    let retrString = IntEncoder.encode(value.maxId, BitLength.maxId);

    const ranges: number[][] = [];

    value.forEach((curValue: boolean, i): void => {

      // build our bitfield no matter what
      bitField += BooleanEncoder.encode(curValue);

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
          ranges.push(range);

          // clear the array for the next range
          range = [];

        } else if (range.length === 0) {

          // this is the first  value for this range
          range.push(i);

        }

      }

    });

    if (this.rangeIsSmaller(ranges, value.maxId)) {

      retrString += VectorEncodingType.RANGE + '';
      retrString += this.buildRangeEncoding(ranges);

    } else {

      retrString += VectorEncodingType.FIELD + '';
      retrString += bitField;

    }

    return retrString;

  }

  public static decode(value: string): Vector {

    let vector: Vector;

    let index = 0;

    const maxId: number = IntEncoder.decode(value.substr(index, BitLength.maxId));

    index += BitLength.maxId;

    const encodingType: VectorEncodingType = IntEncoder.decode(value.charAt(index));

    index += BitLength.encodingType;

    /**
     * Range is handled in batches so we'll need a different decoding scheme
     */
    if (encodingType === VectorEncodingType.RANGE) {

      const defaultValue: boolean = BooleanEncoder.decode(value.charAt(index));

      index += BitLength.encodingType;
      vector = new Vector();

      // if default is true we need to set all the values and unset the ones listed in the ranges
      if (defaultValue) {

        for (let i = 1; i <= maxId; i ++) {

          vector.set(i);

        }

      }

      const numEntries: number = IntEncoder.decode(value.substr(index, BitLength.numEntries));

      index += BitLength.numEntries;

      // loop through each group of entries
      for (let i = 0; i < numEntries; i ++) {

        // Ranges can represent a single id or a range of ids.
        const isIdRange: boolean = BooleanEncoder.decode(value.charAt(index));

        index += BitLength.singleOrRange;

        /**
         * regardless of whether or not it's a single entry or range, the next
         * set of bits is a vendor ID
         */
        const firstId: number = IntEncoder.decode(value.substr(index, BitLength.vendorId));

        index += BitLength.vendorId;

        // if it's a range, the next set of bits is the second id
        if (isIdRange) {

          const secondId: number = IntEncoder.decode(value.substr(index, BitLength.vendorId));

          index += BitLength.vendorId;

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

      const bitField = value.substr(index, maxId);

      index += maxId;
      vector = FixedVectorEncoder.decode(bitField);

    }

    return vector;

  }

  private static buildRangeEncoding(ranges: number[][]): string {

    const numEntries = ranges.length;

    // set with range default (always 0 because there is no practical case for a default of 1)
    let rangeString = BooleanEncoder.encode(VendorVectorEncoder.RANGE_DEFAULT);

    // describe the number of entries to follow
    rangeString += IntEncoder.encode(numEntries, BitLength.numEntries);

    // each range
    ranges.forEach((range: number[]): void => {

      // is this range a single?
      const single = (range.length === 1);

      // first is the indicator of whether this is a single id or range (two)
      // 0 is single and range is 1
      rangeString += BooleanEncoder.encode(!single);

      // second is the first (or only) vendorId
      rangeString += IntEncoder.encode(range[0], BitLength.vendorId);

      if (!single) {

        // add the second id if it exists
        rangeString += IntEncoder.encode(range[1], BitLength.vendorId);

      }

    });

    return rangeString;

  }

  private static rangeIsSmaller(ranges: number[][], maxId: number): boolean {

    // the boolean value is for the default consent value
    let rLength = BitLength.anyBoolean + BitLength.numEntries;

    ranges.forEach((range: number[]): void => {

      const single = (range.length === 1);

      rLength += BitLength.singleOrRange;
      rLength += BitLength.vendorId;

      if (!single) {

        rLength += BitLength.vendorId;

      }

    });

    return rLength < maxId;

  }

}
