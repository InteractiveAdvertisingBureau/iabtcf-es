import {Fields} from '../../src/model/Fields';
import {expect} from 'chai';

describe('Fields', (): void => {

  it('should be this', (): void => {

    const reference = {
      cmpId: 'cmpId',
      cmpVersion: 'cmpVersion',
      consentLanguage: 'consentLanguage',
      consentScreen: 'consentScreen',
      created: 'created',
      supportOOB: 'supportOOB',
      isServiceSpecific: 'isServiceSpecific',
      lastUpdated: 'lastUpdated',
      numCustomPurposes: 'numCustomPurposes',
      policyVersion: 'policyVersion',
      publisherCountryCode: 'publisherCountryCode',
      publisherCustomConsents: 'publisherCustomConsents',
      publisherCustomLegitimateInterests: 'publisherCustomLegitimateInterests',
      publisherLegitimateInterests: 'publisherLegitimateInterests',
      publisherConsents: 'publisherConsents',
      publisherRestrictions: 'publisherRestrictions',
      purposeConsents: 'purposeConsents',
      purposeLegitimateInterests: 'purposeLegitimateInterests',
      purposeOneTreatment: 'purposeOneTreatment',
      specialFeatureOptins: 'specialFeatureOptins',
      useNonStandardStacks: 'useNonStandardStacks',
      vendorConsents: 'vendorConsents',
      vendorLegitimateInterests: 'vendorLegitimateInterests',
      vendorListVersion: 'vendorListVersion',
      vendorsAllowed: 'vendorsAllowed',
      vendorsDisclosed: 'vendorsDisclosed',
      version: 'version',
    };

    Object.keys(reference).forEach((key: string): void => {

      expect(Fields[key], key).to.equal(reference[key]);

    });

  });

});
