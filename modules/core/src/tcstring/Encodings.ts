import * as encoders from './encoders';

class Encodings {

  /**
   * The outer array describes index is encoding version - 1 (since it's
   * zero-based) and the inner array is the string representation of the BITS
   * static above ordered by "IAB Tech Lab - Consent string and vendor list
   * formats v2"
   */

  public static order: readonly (readonly string[])[] = [

    // tcf v1
    [
      'version',
      'created',
      'lastUpdated',
      'cmpId',
      'cmpVersion',
      'consentScreen',
      'consentLanguage',
      'vendorListVersion',
      'purposeConsents',
      'vendorConsents',
    ],

    // tcf v2
    [
      'version',
      'checksum',
      'created',
      'lastUpdated',
      'cmpId',
      'cmpVersion',
      'consentScreen',
      'consentLanguage',
      'vendorListVersion',
      'policyVersion',
      'isServiceSpecific',
      'useNonStandardStacks',
      'specialFeatureOptIns',
      'purposeConsents',
      'purposeLITransparency',
      'vendorConsents',
      'vendorLegitimateInterest',
      //      'publisherRestrictions',
    ],
  ];

  public static readonly encoders: object = {
    version: encoders.IntEncoder,
    created: encoders.DateEncoder,
    lastUpdated: encoders.DateEncoder,
    cmpId: encoders.IntEncoder,
    cmpVersion: encoders.IntEncoder,
    consentScreen: encoders.IntEncoder,
    consentLanguage: encoders.LangEncoder,
    vendorListVersion: encoders.IntEncoder,
    policyVersion: encoders.IntEncoder,
    isServiceSpecific: encoders.BooleanEncoder,
    useNonStandardStacks: encoders.BooleanEncoder,
    specialFeatureOptIns: encoders.FixedVectorEncoder,
    purposeConsents: encoders.FixedVectorEncoder,
    purposeLITransparency: encoders.FixedVectorEncoder,
    vendorConsents: encoders.VendorVectorEncoder,
    vendorLegitimateInterest: encoders.VendorVectorEncoder,
    //    publisherRestrictions: PublisherRestrictionsEncoder,

  };

}

export {Encodings};
export {SpecificEncoder, TCModelPropType} from './encoders';
