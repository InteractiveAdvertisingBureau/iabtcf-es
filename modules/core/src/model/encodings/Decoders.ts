import * as dec from '../../decoders';

export class Decoders {

  public static readonly version: Function = dec.IntDecoder.constructor;
  public static readonly created: Function = dec.DateDecoder.constructor;
  public static readonly lastUpdated: Function = dec.DateDecoder.constructor;
  public static readonly cmpId: Function = dec.IntDecoder.constructor;
  public static readonly cmpVersion: Function = dec.IntDecoder.constructor;
  public static readonly consentScreen: Function = dec.IntDecoder.constructor;
  public static readonly consentLanguage: Function = dec.LangDecoder.constructor;
  public static readonly vendorListVersion: Function = dec.IntDecoder.constructor;
  public static readonly policyVersion: Function = dec.IntDecoder.constructor;
  public static readonly isServiceSpecific: Function = dec.BooleanDecoder.constructor;
  public static readonly useNonStandardStacks: Function = dec.BooleanDecoder.constructor;
  public static readonly specialFeatureOptIns: Function = dec.FixedVectorDecoder.constructor;
  public static readonly purposeConsents: Function = dec.FixedVectorDecoder.constructor;
  public static readonly purposeLITranspardecy: Function = dec.FixedVectorDecoder.constructor;
  public static readonly purposeOneTreatment: Function = dec.BooleanDecoder.constructor;
  public static readonly referdeceCountry: Function = dec.LangDecoder.constructor;
  public static readonly vendorConsents: Function = dec.VendorVectorDecoder.constructor;
  public static readonly vendorLegitimateInterest: Function = dec.VendorVectorDecoder.constructor;
  public static readonly publisherRestrictions: Function = dec.PurposeRestrictionsDecoder.constructor;

};
