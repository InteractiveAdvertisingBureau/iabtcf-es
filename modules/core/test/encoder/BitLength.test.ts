import {

  expect,

} from 'chai';

import {

  BitLength,

} from '../../src/encoder';

export function run(): void {

  describe('BitLength', (): void => {

    it('should have these values', (): void => {

      expect(BitLength.anyBoolean).to.equal(1);
      expect(BitLength.singleOrRange).to.equal(1);
      expect(BitLength.encodingType).to.equal(1);
      expect(BitLength.segmentType).to.equal(3);
      expect(BitLength.version).to.equal(6);
      expect(BitLength.checksum).to.equal(18);
      expect(BitLength.created).to.equal(36);
      expect(BitLength.lastUpdated).to.equal(36);
      expect(BitLength.cmpId).to.equal(12);
      expect(BitLength.cmpVersion).to.equal(12);
      expect(BitLength.consentScreen).to.equal(6);
      expect(BitLength.consentLanguage).to.equal(12);
      expect(BitLength.vendorListVersion).to.equal(12);
      expect(BitLength.policyVersion).to.equal(6);
      expect(BitLength.isServiceSpecific).to.equal(1);
      expect(BitLength.useNonStandardStacks).to.equal(1);
      expect(BitLength.specialFeatureOptIns).to.equal(12);
      expect(BitLength.purposeConsents).to.equal(24);
      expect(BitLength.purposeLegitimateInterest).to.equal(24);
      expect(BitLength.vendorId).to.equal(16);
      expect(BitLength.purposeId).to.equal(6);
      expect(BitLength.numEntries).to.equal(12);
      expect(BitLength.maxId).to.equal(16);
      expect(BitLength.restrictionType).to.equal(2);
      expect(BitLength.numRestrictions).to.equal(12);

    });

  });

}
