import {

  Encoder,
  IntEncoder,
  DateEncoder,
  LangEncoder,
  BooleanEncoder,
  FixedVectorEncoder,
  VendorVectorEncoder,
  PurposeRestrictionVectorEncoder,

} from '../../encoder';

export class EncoderMap {

  public static readonly version: Record<string, any> = IntEncoder;
  public static readonly created: Record<string, any> = DateEncoder;
  public static readonly lastUpdated: Record<string, any> = DateEncoder;
  public static readonly cmpId: Record<string, any> = IntEncoder;
  public static readonly cmpVersion: Record<string, any> = IntEncoder;
  public static readonly consentScreen: Record<string, any> = IntEncoder;
  public static readonly consentLanguage: Record<string, any> = LangEncoder;
  public static readonly vendorListVersion: Record<string, any> = IntEncoder;
  public static readonly policyVersion: Record<string, any> = IntEncoder;
  public static readonly isServiceSpecific: Record<string, any> = BooleanEncoder;
  public static readonly useNonStandardStacks: Record<string, any> = BooleanEncoder;
  public static readonly specialFeatureOptIns: Record<string, any> = FixedVectorEncoder;
  public static readonly purposeConsents: Record<string, any> = FixedVectorEncoder;
  public static readonly purposeLITransparency: Record<string, any> = FixedVectorEncoder;
  public static readonly purposeOneTreatment: Record<string, any> = BooleanEncoder;
  public static readonly referenceCountry: Record<string, any> = LangEncoder;
  public static readonly vendorConsents: Record<string, any> = VendorVectorEncoder;
  public static readonly vendorLegitimateInterest: Record<string, any> = VendorVectorEncoder;
  public static readonly publisherRestrictions: Record<string, any> = PurposeRestrictionVectorEncoder;

}
