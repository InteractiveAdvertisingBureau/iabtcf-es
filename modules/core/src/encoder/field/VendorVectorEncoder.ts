import {Vector} from '../../model';
import {BitLength} from '../';
import {IntEncoder} from './IntEncoder';
import {BooleanEncoder} from './BooleanEncoder';
import {FixedVectorEncoder} from './FixedVectorEncoder';
import {VectorEncodingType} from './VectorEncodingType';

export class VendorVectorEncoder {

  public static encode(value: Vector): string {

    // collectors for range encoding
    const ranges: number[][] = [];
    let range: number[] = [];

    // since both encodings need the maxId, start with that
    let retrString = IntEncoder.encode(value.maxId, BitLength.maxId);

    // bit field will be just the vendors as we walk through the vector
    let bitField = '';
    let rangeIsSmaller;

    // some math
    const headerLength = BitLength.maxId + BitLength.encodingType;
    const bitFieldLength = headerLength + value.maxId;
    const minRangeLength = (BitLength.vendorId*2 + BitLength.singleOrRange + BitLength.numEntries);

    // gets larger as we walk through the vector
    let rangeLength = headerLength + BitLength.numEntries;

    // walk through every value in the vector
    value.forEach((curValue: boolean, i): void => {

      // build our bitfield no matter what
      bitField += BooleanEncoder.encode(curValue);

      /**
       * A range is a minimum of 45 bits, if the number of vendors in this
       * vector is less than 45 then we know that a bitfield encoding will be
       * shorter than any range encoding.
       *
       * The second check checks while we walk through the vector and abandons
       * building the ranges once it becomes larger
       */
      rangeIsSmaller = (value.maxId > minRangeLength && rangeLength < bitFieldLength);

      /**
       * if the curValue is true and our rangeLength is less than the bitField
       * length, we'll continue to push these ranges into the array.  Once the
       * ranges become a larger encoding there is no reason to continue
       * building the structure because we will be choosing the bitfield
       * encoding
       */
      if (rangeIsSmaller && curValue) {

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

          // add to the range length the additional vendorId
          rangeLength += BitLength.vendorId;

          // store the array in our bigger array
          ranges.push(range);

          // clear the array for the next range
          range = [];

        } else if (range.length === 0) {

          // this is the first  value for this range
          range.push(i);

          // update our count with new range overhead
          rangeLength += BitLength.singleOrRange;
          rangeLength += BitLength.vendorId;

        }

      }

    });

    if (rangeIsSmaller) {

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
    const maxId: number = IntEncoder.decode(value.substr(index, BitLength.maxId), BitLength.maxId);
    index += BitLength.maxId;
    const encodingType: VectorEncodingType = IntEncoder.decode(value.charAt(index), BitLength.encodingType);
    index += BitLength.encodingType;

    /**
     * Range is handled in batches so we'll need a different decoding scheme
     */
    if (encodingType === VectorEncodingType.RANGE) {

      vector = new Vector();

      const numEntries: number = IntEncoder.decode(value.substr(index, BitLength.numEntries), BitLength.numEntries);

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
        const firstId: number = IntEncoder.decode(value.substr(index, BitLength.vendorId), BitLength.vendorId);

        index += BitLength.vendorId;

        // if it's a range, the next set of bits is the second id
        if (isIdRange) {

          const secondId: number = IntEncoder.decode(value.substr(index, BitLength.vendorId), BitLength.vendorId);

          index += BitLength.vendorId;

          // we'll need to set or unset all the vendor ids between the first and second
          for (let j = firstId; j <= secondId; j++) {

            vector.set(j);

          }

        } else {

          vector.set(firstId);

        }

      }

    } else {

      const bitField = value.substr(index, maxId);

      index += maxId;
      vector = FixedVectorEncoder.decode(bitField, maxId);

    }

    vector.bitLength = index;

    return vector;

  }

  private static buildRangeEncoding(ranges: number[][]): string {

    // describe the number of entries to follow
    const numEntries = ranges.length;
    let rangeString = IntEncoder.encode(numEntries, BitLength.numEntries);

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

}
