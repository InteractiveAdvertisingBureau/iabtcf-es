import {BitLength} from '../BitLength';
import {BooleanEncoder} from './BooleanEncoder';
import {DecodingError} from '../../errors';
import {IntEncoder} from './IntEncoder';
import {PurposeRestrictionVector, PurposeRestriction} from '../../model';

export class PurposeRestrictionVectorEncoder {

  public static encode(prVector: PurposeRestrictionVector): string {

    // start with the number of restrictions
    let bitString = IntEncoder.encode(prVector.numRestrictions, BitLength.numRestrictions);

    // if the vector is empty we'll just return a string with just the numRestricitons being 0
    if (!prVector.isEmpty()) {

      // create each restriction group
      prVector.getRestrictions().forEach((purpRestriction: PurposeRestriction): void => {

        // every restriction group has the purposeId and the restrictionType;
        bitString += IntEncoder.encode(purpRestriction.purposeId, BitLength.purposeId);
        bitString += IntEncoder.encode(purpRestriction.restrictionType, BitLength.restrictionType);

        // Get available vendor IDs from the GVL
        const gvlVendors = [...prVector.gvl.vendorIds];

        // Get all vendors to which the restriction applies
        const vendors: number[] = prVector.getVendors(purpRestriction);

        // Counts number of element occurances in the array
        const countElementOccurrences = (array, item): number =>
          array.reduce(
            (result, currentValue) => (currentValue === item ? result + 1 : result),
            0,
          );

        /**
         * Generate vendor ranges.
         *
         * When generating vendor range we are looking
         * for the consecutive vendor IDs in the vendor list
         */
        const filteredGvlVendors = gvlVendors.map((currentItem, index) =>
          // Mark unused vendors from the vendor list with null
          vendors.includes(currentItem) ? index : null,
        );

        const generatedVendorRanges = filteredGvlVendors.map((currentItem, index) =>
          currentItem === null ? null : [index, countElementOccurrences(filteredGvlVendors.slice(0, index), null)],
        )
          .filter(Boolean)
          .reduce((result, [vendorIndex, rangeIndex]) => {

            // Assigns range index to which the vendor belongs

            result[rangeIndex] = [
              ...(result[rangeIndex] || []),
              gvlVendors[vendorIndex],
            ];

            return result;

          }, {});

        const vendorRanges: number[][] = Object.values(generatedVendorRanges);

        const numEntries = vendorRanges.length;
        let rangeField = '';

        for (const vendorRange of vendorRanges) {

          // We have a vendor range if the range contains more than 1 vendor
          const isRange = vendorRange.length > 1;

          // 0 means single 1 means range
          rangeField += BooleanEncoder.encode(isRange);
          rangeField += IntEncoder.encode(vendorRange[0], BitLength.vendorId);

          if (isRange) {

            rangeField += IntEncoder.encode(
              vendorRange[vendorRange.length - 1],
              BitLength.vendorId,
            );

          }

        }

        /**
         * now that the range encoding is built, encode the number of ranges
         * and then append the range field to the bitString.
         */
        bitString += IntEncoder.encode(numEntries, BitLength.numEntries);
        bitString += rangeField;

      });

    }

    return bitString;

  }

  public static decode(encodedString: string): PurposeRestrictionVector {

    let index = 0;
    const vector: PurposeRestrictionVector = new PurposeRestrictionVector();
    const numRestrictions: number = IntEncoder.decode(encodedString.substr(index, BitLength.numRestrictions), BitLength.numRestrictions);

    index += BitLength.numRestrictions;

    for (let i = 0; i < numRestrictions; i++) {

      // First is purpose ID
      const purposeId = IntEncoder.decode(encodedString.substr(index, BitLength.purposeId), BitLength.purposeId);
      index += BitLength.purposeId;
      // Second Restriction Type
      const restrictionType = IntEncoder.decode(encodedString.substr(index, BitLength.restrictionType), BitLength.restrictionType);
      index += BitLength.restrictionType;

      const purposeRestriction: PurposeRestriction = new PurposeRestriction(purposeId, restrictionType);
      // Num Entries (number of vendors)
      const numEntries: number = IntEncoder.decode(encodedString.substr(index, BitLength.numEntries), BitLength.numEntries);
      index += BitLength.numEntries;

      for (let j = 0; j < numEntries; j++) {

        const isARange: boolean = BooleanEncoder.decode(encodedString.substr(index, BitLength.anyBoolean));
        index += BitLength.anyBoolean;

        const startOrOnlyVendorId: number = IntEncoder.decode(encodedString.substr(index, BitLength.vendorId), BitLength.vendorId);
        index += BitLength.vendorId;

        if (isARange) {

          const endVendorId: number = IntEncoder.decode(encodedString.substr(index, BitLength.vendorId), BitLength.vendorId);
          index += BitLength.vendorId;

          if (endVendorId < startOrOnlyVendorId) {

            throw new DecodingError(`Invalid RangeEntry: endVendorId ${endVendorId} is less than ${startOrOnlyVendorId}`);

          }

          for (let k: number = startOrOnlyVendorId; k <= endVendorId; k++) {

            vector.add(k, purposeRestriction);

          }

        } else {

          vector.add(startOrOnlyVendorId, purposeRestriction);

        }

      }

    }

    vector.bitLength = index;

    return vector;

  }

}
