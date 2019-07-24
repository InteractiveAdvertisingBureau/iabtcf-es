import {

  Encoder,
  IntEncoder,
  BooleanEncoder,
  BitLength,

} from '.';

import {

  PurposeRestrictionVector,
  PurposeRestriction,

} from '../model';

export class PurposeRestrictionVectorEncoder implements Encoder<PurposeRestrictionVector> {

  private bitLength: number = 0;
  /**
   * TODO: Must check to see if vendor has flexible purposes first
   * TODO: if the RestrctionType is NOT_ALLOWED it doesn't matter if the vendor
   * has a flexible purpose
   */

  public encode(value: PurposeRestrictionVector): string {

    const intEnc: IntEncoder = new IntEncoder();
    // start with the number of restrictions
    let bitString = intEnc.encode(value.numRestrictions, BitLength.numRestrictions);

    // if the vector is empty we'll just return an empty string, this vector is not required
    if (!value.isEmpty()) {

      const boolEnc: BooleanEncoder = new BooleanEncoder();

      // create each restriction group
      value.getAllRestrictions().forEach((purpRestriction: PurposeRestriction): void => {

        // every restriction group has the purposeId and the restrictionType;
        bitString += intEnc.encode(purpRestriction.purposeId, BitLength.purposeId);
        bitString += intEnc.encode(purpRestriction.restrictionType, BitLength.restrictionType);

        // now get all the vendors under that restriction
        const vendors: number[] = value.getVendors(purpRestriction);
        const len: number = vendors.length;
        /**
         * numEntries comes first so we will have to keep a counter and the do
         * the encoding at the end
         */
        let numEntries = 0;
        let startId = 0;
        let rangeField = '';

        for (let i = 0; i < len; i ++) {

          const vendorId: number = vendors[i];

          if (startId === 0) {

            numEntries++;
            startId = vendorId;

          }

          // either end of the loop or there's a gap greater than 1 number
          if (i === len - 1 || vendors[i + 1] > vendorId + 1) {

            /**
             * it's a range entry if we've got something other than the start
             * ID
             */
            const isRange = !(vendorId === startId);

            // 0 means single 1 means range
            rangeField += boolEnc.encode(isRange);
            rangeField += intEnc.encode(startId, BitLength.vendorId);

            if (isRange) {

              rangeField += intEnc.encode(vendorId, BitLength.vendorId);

            }

            // reset the startId so we grab the next id in the list
            startId = 0;

          }

        }

        /**
         * now that  the range encoding is built, encode the number of ranges
         * and then append the range field to the bitString.
         */
        bitString += intEnc.encode(numEntries, BitLength.numEntries);
        bitString += rangeField;

      });

    }

    this.bitLength = bitString.length;
    return bitString;

  }

  public getBitLength(): number {

    return this.bitLength;

  }

  public decode(value: string): PurposeRestrictionVector {

    const vector: PurposeRestrictionVector = new PurposeRestrictionVector();

    return vector;

  }

}
