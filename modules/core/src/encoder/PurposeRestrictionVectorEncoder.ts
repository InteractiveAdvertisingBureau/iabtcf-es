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
  private intEnc: IntEncoder = new IntEncoder();
  private boolEnc: BooleanEncoder = new BooleanEncoder();

  public encode(value: PurposeRestrictionVector): string {

    // start with the number of restrictions
    let bitString = this.intEnc.encode(value.numRestrictions, BitLength.numRestrictions);

    // if the vector is empty we'll just return a string with just the numRestricitons being 0
    if (!value.isEmpty()) {

      // create each restriction group
      value.getAllRestrictions().forEach((purpRestriction: PurposeRestriction): void => {

        // every restriction group has the purposeId and the restrictionType;
        bitString += this.intEnc.encode(purpRestriction.purposeId, BitLength.purposeId);
        bitString += this.intEnc.encode(purpRestriction.restrictionType, BitLength.restrictionType);

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
            rangeField += this.boolEnc.encode(isRange);
            rangeField += this.intEnc.encode(startId, BitLength.vendorId);

            if (isRange) {

              rangeField += this.intEnc.encode(vendorId, BitLength.vendorId);

            }

            // reset the startId so we grab the next id in the list
            startId = 0;

          }

        }

        /**
         * now that  the range encoding is built, encode the number of ranges
         * and then append the range field to the bitString.
         */
        bitString += this.intEnc.encode(numEntries, BitLength.numEntries);
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

    let index = 0;
    const vector: PurposeRestrictionVector = new PurposeRestrictionVector();
    const numRestrictions: number = this.intEnc.decode(value.substr(index, BitLength.maxId));
    index += BitLength.maxId;

    for (let i = 0; i < numRestrictions; i++) {

      // First is purpose ID
      const purposeId = this.intEnc.decode(value.substr(index, BitLength.purposeId));
      index += BitLength.purposeId;
      // Second Restriction Type
      const restrictionType = this.intEnc.decode(value.substr(index, BitLength.restrictionType));
      index += BitLength.restrictionType;

      const purposeRestriction: PurposeRestriction = new PurposeRestriction(purposeId, restrictionType);
      // Num Entries (number of vendors)
      const numEntries: number = this.intEnc.decode(value.substr(index, BitLength.numEntries));
      index += BitLength.numEntries;

      for (let j = 0; j < numEntries; j++) {

        const isARange: boolean = this.boolEnc.decode(value.substr(index, BitLength.anyBoolean));
        const startOrOnlyVendorId: number = this.intEnc.decode(value.substr(index, BitLength.vendorId));
        index += BitLength.vendorId;

        if (isARange) {

          const endVendorId: number = this.intEnc.decode(value.substr(index, BitLength.vendorId));
          index += BitLength.vendorId;

          for ( let k: number = startOrOnlyVendorId; k < startOrOnlyVendorId + endVendorId; k++) {

            vector.add(k, purposeRestriction);

          }

        } else {

          vector.add(startOrOnlyVendorId, purposeRestriction);

        }

      }

    }

    return vector;

  }

}
