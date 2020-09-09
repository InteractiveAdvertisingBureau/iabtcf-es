import {FieldSequence} from '../../../src/encoder/sequence/FieldSequence';
import {expect} from 'chai';
import {Segment} from '../../../src/model/Segment';
import {Fields} from '../../../src/model/Fields';

describe('FieldSequence', (): void => {

  it('should have this for v1', (): void => {

    const seq = new FieldSequence();

    expect(seq['1'], 'keys seq["1"]').have.all.keys([Segment.CORE]);

    const coreSequence = seq['1'][Segment.CORE];

    expect(coreSequence, 'coreSequence').to.deep.equal([
      Fields.version,
      Fields.created,
      Fields.lastUpdated,
      Fields.cmpId,
      Fields.cmpVersion,
      Fields.consentScreen,
      Fields.consentLanguage,
      Fields.vendorListVersion,
      Fields.purposeConsents,
      Fields.vendorConsents,
    ]);

  });

  it('should have this for v2', (): void => {

    const seq = new FieldSequence();

    expect(seq['2'], 'keys seq["2"]').to.have.all.keys([
      Segment.CORE,
      Segment.PUBLISHER_TC,
      Segment.VENDORS_ALLOWED,
      Segment.VENDORS_DISCLOSED,
    ]);

    const coreSequence = seq['2'][Segment.CORE];

    expect(coreSequence, 'coreSequence').to.deep.equal([
      Fields.version,
      Fields.created,
      Fields.lastUpdated,
      Fields.cmpId,
      Fields.cmpVersion,
      Fields.consentScreen,
      Fields.consentLanguage,
      Fields.vendorListVersion,
      Fields.policyVersion,
      Fields.isServiceSpecific,
      Fields.useNonStandardStacks,
      Fields.specialFeatureOptins,
      Fields.purposeConsents,
      Fields.purposeLegitimateInterests,
      Fields.purposeOneTreatment,
      Fields.publisherCountryCode,
      Fields.vendorConsents,
      Fields.vendorLegitimateInterests,
      Fields.publisherRestrictions,
    ]);

    const publisherTCSequence = seq['2'][Segment.PUBLISHER_TC];

    expect(publisherTCSequence, 'publisherTCSequence').to.deep.equal([
      Fields.publisherConsents,
      Fields.publisherLegitimateInterests,
      Fields.numCustomPurposes,
      Fields.publisherCustomConsents,
      Fields.publisherCustomLegitimateInterests,
    ]);

    const vendorsAllowedSequence = seq['2'][Segment.VENDORS_ALLOWED];

    expect(vendorsAllowedSequence, 'vendorsAllowedSequence').to.deep.equal([
      Fields.vendorsAllowed,
    ]);

    const vendorsDiscloedSequence = seq['2'][Segment.VENDORS_DISCLOSED];

    expect(vendorsDiscloedSequence, 'vendorsDiscloedSequence').to.deep.equal([
      Fields.vendorsDisclosed,
    ]);

  });

});
