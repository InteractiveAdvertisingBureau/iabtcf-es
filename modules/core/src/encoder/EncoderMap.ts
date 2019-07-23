import {
  Vector,
  PurposeRestrictionVector,
  TCFields,
} from '../model';

import {
  Encoder,
  IntEncoder,
  DateEncoder,
  LangEncoder,
  BooleanEncoder,
  FixedVectorEncoder,
  VendorVectorEncoder,
  PurposeRestrictionVectorEncoder,
} from '.';

export class EncoderMap implements TCFields {

  public readonly version: { new(): Encoder<number> } = IntEncoder;
  public readonly created: { new(): Encoder<Date> } = DateEncoder;
  public readonly lastUpdated: { new(): Encoder<Date> } = DateEncoder;
  public readonly cmpId: { new(): Encoder<number> } = IntEncoder;
  public readonly cmpVersion: { new(): Encoder<number> } = IntEncoder;
  public readonly consentScreen: { new(): Encoder<number> } = IntEncoder;
  public readonly consentLanguage: { new(): Encoder<string> } = LangEncoder;
  public readonly vendorListVersion: { new(): Encoder<number> } = IntEncoder;
  public readonly policyVersion: { new(): Encoder<number> } = IntEncoder;
  public readonly isServiceSpecific: { new(): Encoder<boolean> } = BooleanEncoder;
  public readonly useNonStandardStacks: { new(): Encoder<boolean> } = BooleanEncoder;
  public readonly specialFeatureOptIns: { new(): Encoder<Vector> } = FixedVectorEncoder;
  public readonly purposeConsents: { new(): Encoder<Vector> } = FixedVectorEncoder;
  public readonly purposeLITransparency: { new(): Encoder<Vector> } = FixedVectorEncoder;
  public readonly purposeOneTreatment: { new(): Encoder<boolean> } = BooleanEncoder;
  public readonly publisherCountryCode: { new(): Encoder<string> } = LangEncoder;
  public readonly vendorConsents: { new(): Encoder<Vector> } = VendorVectorEncoder;
  public readonly vendorLegitimateInterest: { new(): Encoder<Vector> } = VendorVectorEncoder;
  public readonly publisherRestrictions: { new(): Encoder<PurposeRestrictionVector> }
  = PurposeRestrictionVectorEncoder;

}
