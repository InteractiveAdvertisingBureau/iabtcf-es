import {VariableLengthSpecificDecoder} from './VariableLengthSpecificDecoder';
import {VectorEncodingType} from '../model/VectorEncodingType';
import {IntDecoder} from './IntDecoder';
import {BooleanDecoder} from './BooleanDecoder';
import {FixedVectorDecoder} from './FixedVectorDecoder';
import {BitLength} from '../model/BitLength';
import {Vector} from '../model/structures/Vector';

export class VendorVectorDecoder implements VariableLengthSpecificDecoder {

  private index: number;

  public decode(value: string): Vector {

    const intDecoder: IntDecoder = new IntDecoder();
    const boolDecoder: BooleanDecoder = new BooleanDecoder();
    let vector: Vector;

    this.index = 0;

    const maxId: number = intDecoder.decode(value.substr(this.index, BitLength.maxId));

    this.index += BitLength.maxId;

    const encodingType: VectorEncodingType = intDecoder.decode(value.charAt(this.index));

    this.index += 1;

    /**
     * Range is handled in batches so we'll need a different decoding scheme
     */
    if (encodingType === VectorEncodingType.RANGE) {

      const defaultValue: boolean = boolDecoder.decode(value.charAt(this.index));

      this.index += 1;
      vector = new Vector();

      // if default is true we need to set all the values and unset the ones listed in the ranges
      if (defaultValue) {

        for (let i =1; i <= maxId; i ++) {

          vector.set(i);

        }

      }

      const numEntries: number = intDecoder.decode(value.substr(this.index, BitLength.numEntries));

      this.index += BitLength.numEntries;

      // loop through each group of entries
      for (let i = 0; i < numEntries; i ++) {

        // Ranges can represent a single id or a range of ids.
        const isIdRange: boolean = boolDecoder.decode(value.charAt(this.index));

        this.index += 1;

        /**
         * regardless of whether or not it's a single entry or range, the next
         * set of bits is a vendor ID
         */
        const firstId: number = intDecoder.decode(value.substr(this.index, BitLength.vendorId));

        this.index += BitLength.vendorId;

        // if it's a range, the next set of bits is the second id
        if (isIdRange) {

          const secondId: number = intDecoder.decode(value.substr(this.index, BitLength.vendorId));

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

      const fvDec: FixedVectorDecoder = new FixedVectorDecoder();
      const bitField = value.substr(this.index, maxId);

      this.index += maxId;
      vector = fvDec.decode(bitField);

    }

    return vector;

  }

  public getBitLength(): number {

    return this.index;

  }

};
