import {Vector} from '../model/Vector';
import {PurposeRestrictionVector} from '../model/PurposeRestrictionVector';

import {

  Encoder,
  IntEncoder,
  DateEncoder,
  LangEncoder,
  BooleanEncoder,
  FixedVectorEncoder,
  VendorVectorEncoder,
  PurposeRestrictionVectorEncoder,

} from './';

export class EncoderMap {

  public static readonly version: { new(): Encoder<number> } = IntEncoder;
  public static readonly created: { new(): Encoder<Date> } = DateEncoder;
  public static readonly lastUpdated: { new(): Encoder<Date> } = DateEncoder;
  public static readonly cmpId: { new(): Encoder<number> } = IntEncoder;
  public static readonly cmpVersion: { new(): Encoder<number> } = IntEncoder;
  public static readonly consentScreen: { new(): Encoder<number> } = IntEncoder;
  public static readonly consentLanguage: { new(): Encoder<string> } = LangEncoder;
  public static readonly vendorListVersion: { new(): Encoder<number> } = IntEncoder;
  public static readonly policyVersion: { new(): Encoder<number> } = IntEncoder;
  public static readonly isServiceSpecific: { new(): Encoder<boolean> } = BooleanEncoder;
  public static readonly useNonStandardStacks: { new(): Encoder<boolean> } = BooleanEncoder;
  public static readonly specialFeatureOptIns: { new(): Encoder<Vector> } = FixedVectorEncoder;
  public static readonly purposeConsents: { new(): Encoder<Vector> } = FixedVectorEncoder;
  public static readonly purposeLITransparency: { new(): Encoder<Vector> } = FixedVectorEncoder;
  public static readonly purposeOneTreatment: { new(): Encoder<boolean> } = BooleanEncoder;
  public static readonly referenceCountry: { new(): Encoder<string> } = LangEncoder;
  public static readonly vendorConsents: { new(): Encoder<Vector> } = VendorVectorEncoder;
  public static readonly vendorLegitimateInterest: { new(): Encoder<Vector> } = VendorVectorEncoder;
  public static readonly publisherRestrictions: { new(): Encoder<PurposeRestrictionVector> }
  = PurposeRestrictionVectorEncoder;

}
