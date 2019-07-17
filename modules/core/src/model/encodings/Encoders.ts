import * as enc from '../../encoders';

export class Encoders {

  public static readonly version: Object = enc.IntEncoder;
  public static readonly created: Object = enc.DateEncoder;
  public static readonly lastUpdated: Object = enc.DateEncoder;
  public static readonly cmpId: Object = enc.IntEncoder;
  public static readonly cmpVersion: Object = enc.IntEncoder;
  public static readonly consentScreen: Object = enc.IntEncoder;
  public static readonly consentLanguage: Object = enc.LangEncoder;
  public static readonly vendorListVersion: Object = enc.IntEncoder;
  public static readonly policyVersion: Object = enc.IntEncoder;
  public static readonly isServiceSpecific: Object = enc.BooleanEncoder;
  public static readonly useNonStandardStacks: Object = enc.BooleanEncoder;
  public static readonly specialFeatureOptIns: Object = enc.FixedVectorEncoder;
  public static readonly purposeConsents: Object = enc.FixedVectorEncoder;
  public static readonly purposeLITransparency: Object = enc.FixedVectorEncoder;
  public static readonly purposeOneTreatment: Object = enc.BooleanEncoder;
  public static readonly referenceCountry: Object = enc.LangEncoder;
  public static readonly vendorConsents: Object = enc.VendorVectorEncoder;
  public static readonly vendorLegitimateInterest: Object = enc.VendorVectorEncoder;
  public static readonly publisherRestrictions: Object = enc.PurposeRestrictionsEncoder;

};
