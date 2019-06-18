import {expect} from 'chai';
import {BitLength} from '../src/model/BitLength';

describe('BitLength', (): void => {

  it('should have these values', (): void => {

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
    expect(BitLength.purposeLITransparency).to.equal(24);
    expect(BitLength.vendorId).to.equal(16);
    expect(BitLength.rangeEncodingNumEntries).to.equal(12);
    expect(BitLength.rangeEncodingDefaultConsent).to.equal(1);
    expect(BitLength.maxId).to.equal(16);
    expect(BitLength.purposeRestrictionId).to.equal(6);
    expect(BitLength.purposeRestrictionType).to.equal(2);

  });

});
