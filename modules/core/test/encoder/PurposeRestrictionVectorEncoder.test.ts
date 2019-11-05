import {expect} from 'chai';

import {IntEncoder} from '../../src/encoder/IntEncoder';
import {PurposeRestrictionVectorEncoder} from '../../src/encoder/PurposeRestrictionVectorEncoder';
import {PurposeRestrictionVector} from '../../src/model/PurposeRestrictionVector';
import {PurposeRestriction} from '../../src/model/PurposeRestriction';
import {RestrictionType} from '../../src/model/RestrictionType';
import {BitLength} from '../../src/encoder/BitLength';

export function run(): void {

  describe('PurposeRestrictionVectorEncoder', (): void => {

    it(`should return ${BitLength.numRestrictions} 0's for an empty PurposeRestrictionVector`, (): void => {

      const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();
      const pre: PurposeRestrictionVectorEncoder = new PurposeRestrictionVectorEncoder();
      const encoded: string = pre.encode(prVector);

      expect(encoded).to.equal('0'.repeat(BitLength.numRestrictions));

    });

    it('should create one restriction group and two vendor ranges', (): void => {

      const purposeId = 2;
      const vendors: number[] = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
      const purposeRestriction: PurposeRestriction
        = new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

      const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

      for (let i = 0; i < vendors.length; i++) {

        prVector.add(vendors[i], purposeRestriction);

      }

      /**
       * ORDER:
       * num pub restrictions
       * purposeId
       * restrictionType
       * numEntries
       * ----
       * singleOrRange
       * startVendorId
       * endVendorId (may not be there)
       */
      const prve: PurposeRestrictionVectorEncoder = new PurposeRestrictionVectorEncoder();
      const encoded: string = prve.encode(prVector);
      const intEnc: IntEncoder = new IntEncoder();
      let index = 0;

      expect(encoded).not.to.be.empty;

      // num restrictions
      const numRestrictions: number = intEnc.decode(encoded.substr(index, BitLength.numRestrictions));

      expect(numRestrictions).to.equal(prVector.numRestrictions);
      index += BitLength.numRestrictions;

      // purposeId
      const purpId: number = intEnc.decode(encoded.substr(index, BitLength.purposeId));

      expect(purpId).to.equal(purposeId);
      index += BitLength.purposeId;

      // restrictionType
      const restrictionType: number = intEnc.decode(encoded.substr(index, BitLength.restrictionType));

      expect(restrictionType).to.equal(RestrictionType.NOT_ALLOWED);
      index += BitLength.restrictionType;

      // numEntries
      const numEntries: number = intEnc.decode(encoded.substr(index, BitLength.numEntries));

      expect(numEntries).to.equal(2);
      index += BitLength.numEntries;

    });

  });

}
