import * as encoders from './encoders';
import * as decoders from './decoders';

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

  public static readonly decoders: object = {
    version: decoders.IntDecoder,
    created: decoders.DateDecoder,
    lastUpdated: decoders.DateDecoder,
    cmpId: decoders.IntDecoder,
    cmpVersion: decoders.IntDecoder,
    consentScreen: decoders.IntDecoder,
    consentLanguage: decoders.LangDecoder,
    vendorListVersion: decoders.IntDecoder,
    policyVersion: decoders.IntDecoder,
    isServiceSpecific: decoders.BooleanDecoder,
    useNonStandardStacks: decoders.BooleanDecoder,
    specialFeatureOptIns: decoders.FixedVectorDecoder,
    purposeConsents: decoders.FixedVectorDecoder,
    purposeLITransparency: decoders.FixedVectorDecoder,
    vendorConsents: decoders.VendorVectorDecoder,
    vendorLegitimateInterest: decoders.VendorVectorDecoder,
    //    publisherRestrictions: PublisherRestrictionsDecoder,

  };

}

export {Encodings};
