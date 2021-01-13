import {

  expect,

} from 'chai';

import {

  BitLength,

} from '../../src/encoder';

export function run(): void {

  describe('BitLength', (): void => {

    it('should have these values', (): void => {

      expect(BitLength.anyBoolean, 'anyBoolean').to.equal(1);
      expect(BitLength.cmpId, 'cmpId').to.equal(12);
      expect(BitLength.cmpVersion, 'cmpVersion').to.equal(12);
      expect(BitLength.consentLanguage, 'consentLanguage').to.equal(12);
      expect(BitLength.consentScreen, 'consentScreen').to.equal(6);
      expect(BitLength.created, 'created').to.equal(36);
      expect(BitLength.encodingType, 'encodingType').to.equal(1);
      expect(BitLength.isServiceSpecific, 'isServiceSpecific').to.equal(1);
      expect(BitLength.lastUpdated, 'lastUpdated').to.equal(36);
      expect(BitLength.maxId, 'maxId').to.equal(16);
      expect(BitLength.numCustomPurposes, 'numCustomPurposes').to.equal(6);
      expect(BitLength.numEntries, 'numEntries').to.equal(12);
      expect(BitLength.numRestrictions, 'numRestrictions').to.equal(12);
      expect(BitLength.policyVersion, 'policyVersion').to.equal(6);
      expect(BitLength.publisherCountryCode, 'publisherCountryCode').to.equal(12);
      expect(BitLength.publisherLegitimateInterests, 'publisherLegitimateInterests').to.equal(24);
      expect(BitLength.purposeConsents, 'purposeConsents').to.equal(24);
      expect(BitLength.purposeId, 'purposeId').to.equal(6);
      expect(BitLength.purposeLegitimateInterests, 'purposeLegitimateInterests').to.equal(24);
      expect(BitLength.purposeOneTreatment, 'purposeOneTreatment').to.equal(1);
      expect(BitLength.restrictionType, 'restrictionType').to.equal(2);
      expect(BitLength.segmentType, 'segmentType').to.equal(3);
      expect(BitLength.singleOrRange, 'singleOrRange').to.equal(1);
      expect(BitLength.specialFeatureOptins, 'specialFeatureOptins').to.equal(12);
      expect(BitLength.useNonStandardStacks, 'useNonStandardStacks').to.equal(1);
      expect(BitLength.vendorId, 'vendorId').to.equal(16);
      expect(BitLength.vendorListVersion, 'vendorListVersion').to.equal(12);
      expect(BitLength.version, 'version').to.equal(6);

    });

  });

}
