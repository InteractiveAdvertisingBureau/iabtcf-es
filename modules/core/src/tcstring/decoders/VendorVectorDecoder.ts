import {SpecificDecoder} from './SpecificDecoder';
import {VectorEncodingTypeEnum} from '../VectorEncodingTypeEnum';
import {DecodingError} from '../../errors';
import {IntDecoder} from './IntDecoder';
import {BooleanDecoder} from './BooleanDecoder';
import {BitLength} from '../../model/BitLength';
import {Vector} from '../../model/Vector';

export class VendorVectorDecoder implements SpecificDecoder {

  public static readonly RANGE_DEFAULT: boolean = false;
  private intDecoder: IntDecoder = new IntDecoder();
  private boolEnc: BooleanDecoder = new BooleanDecoder();
  private bitString: string;
  private ranges: number[][];
  private maxId: number;

  public decode(value: string): Vector {

    const intDecoder: IntDecoder = new IntDecoder();
    const boolDecoder: BooleanDecoder = new BooleanDecoder();
    const vector: Vector = new Vector();
    let index = 0;

    const maxId: number = intDecoder.decode(value.slice(index, BitLength.maxId));

    index += BitLength.maxId;

    const encodingType: VectorEncodingTypeEnum = intDecoder.decode(value.slice(index, 1));

    index += 1;

    /**
     * Range is handled in batches so we'll need a different decoding scheme
     */
    if (encodingType === VectorEncodingTypeEnum.RANGE) {

      const defaultValue: boolean = boolDecoder.decode(value.slice(index, 1));

      index += 1;

      // if default is true we need to set all the values and unset the ones listed in the ranges
      if (defaultValue) {

        for (let i =1; i <= maxId; i ++) {

          vector.set(i);

        }

      }

      const numEntries: number = intDecoder.decode(value.slice(index, BitLength.rangeEncodingNumEntries));

      index += BitLength.rangeEncodingNumEntries;

      // loop through each group of entries
      for (let i = 0; i < numEntries; i ++) {

        // Ranges can represent a single id or a range of ids.
        const isIdRange: boolean = boolDecoder.decode(value.slice(index, 1));

        index += 1;

        /**
         * regardless of whether or not it's a single entry or range, the next
         * set of bits is a vendor ID
         */
        const firstId: number = intDecoder.decode(value.slice(index, BitLength.vendorId));

        index += BitLength.vendorId;

        // if it's a range, the next set of bits is the second id
        if (isIdRange) {

          const secondId: number = intDecoder.decode(value.slice(index, BitLength.vendorId));

          index += BitLength.vendorId;

          // we'll need to set or unset all the vendor ids between the first and second
          for (let j = firstId; j <= secondId; j++) {

            /**
             * if defaultValue is === true, then we'll need to unset this
             * exception list otherwise, what I think will be really the only
             * case, we'll set the bit because nothing is set yet
             */
            if (defaultValue) {

              vector.unset(i);

            } else {

              vector.set(i);

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

      const bitField = value.slice(index);

      if (maxId !== bitField.length) {

        throw new DecodingError('Invalid bitfield -- length does not match maxId');

      }

      for (let i = 0; i < bitField.length; i++) {

        if (boolDecoder.decode(bitField[i])) {

          vector.set(i + 1);

        }

      }

    }

    return vector;

  }

};
