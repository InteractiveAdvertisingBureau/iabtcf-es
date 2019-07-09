import {SpecificEncoder} from './SpecificEncoder';
import {IntEncoder} from './IntEncoder';
import {BooleanEncoder} from './BooleanEncoder';
import {BitLength} from '../BitLength';
import {PurposeRestrictionVector} from '../../model/PurposeRestrictionVector';
import {PurposeRestriction} from '../../model/PurposeRestriction';

export class PurposeRestrictionsEncoder implements SpecificEncoder {

  public encode(vector: PurposeRestrictionVector): string {

    let bitString = '';

    // if the vector is empty we'll just return an empty string, this vector is not required
    if (!vector.isEmpty()) {

      const intEnc: IntEncoder = new IntEncoder();
      const boolEnc: BooleanEncoder = new BooleanEncoder();

      // start with the number of restrictions
      bitString += intEnc.encode(vector.numRestrictions, BitLength.purposeRestrictionNumRestrictions);

      // create each restriction group
      vector.getAllRestrictions().forEach((purpRestriction: PurposeRestriction): void => {

        // every restriction group has the purposeId and the restrictionType;
        bitString += intEnc.encode(purpRestriction.purposeId, BitLength.purposeRestrictionId);
        bitString += intEnc.encode(purpRestriction.restrictionType, BitLength.purposeRestrictionType);

        // now get all the vendors under that restriction
        const vendors: number[] = vector.getVendors(purpRestriction);
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
        bitString += intEnc.encode(numEntries, BitLength.rangeEncodingNumEntries);
        bitString += rangeField;

      });

    }

    return bitString;

  }

}
