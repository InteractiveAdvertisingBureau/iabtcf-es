import {TCFields} from '../model';

import {
  BooleanEncoder,
  DateEncoder,
  FixedVectorEncoder,
  IntEncoder,
  LangEncoder,
  PurposeRestrictionVectorEncoder,
  VendorVectorEncoder,
} from '.';

export class EncoderMap implements TCFields {

  public readonly version: typeof IntEncoder = IntEncoder;
  public readonly created: typeof DateEncoder = DateEncoder;
  public readonly lastUpdated: typeof DateEncoder = DateEncoder;
  public readonly cmpId: typeof IntEncoder = IntEncoder;
  public readonly cmpVersion: typeof IntEncoder = IntEncoder;
  public readonly consentScreen: typeof IntEncoder = IntEncoder;
  public readonly consentLanguage: typeof LangEncoder = LangEncoder;
  public readonly vendorListVersion: typeof IntEncoder = IntEncoder;
  public readonly policyVersion: typeof IntEncoder = IntEncoder;
  public readonly isServiceSpecific: typeof BooleanEncoder = BooleanEncoder;
  public readonly useNonStandardStacks: typeof BooleanEncoder = BooleanEncoder;
  public readonly specialFeatureOptIns: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly purposeConsents: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly purposeLegitimateInterest: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly purposeOneTreatment: typeof BooleanEncoder = BooleanEncoder;
  public readonly publisherCountryCode: typeof LangEncoder = LangEncoder;
  public readonly vendorConsents: typeof VendorVectorEncoder = VendorVectorEncoder;
  public readonly vendorLegitimateInterest: typeof VendorVectorEncoder = VendorVectorEncoder;
  public readonly publisherRestrictions: typeof PurposeRestrictionVectorEncoder
  = PurposeRestrictionVectorEncoder;
  public readonly segmentType: typeof IntEncoder = IntEncoder;
  public readonly vendorsDisclosed: typeof VendorVectorEncoder = VendorVectorEncoder;
  public readonly vendorsAllowed: typeof VendorVectorEncoder = VendorVectorEncoder;
  public readonly publisherConsents: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly publisherLegitimateInterest: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly numCustomPurposes: typeof IntEncoder = IntEncoder;
  public readonly publisherCustomConsents: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly publisherCustomLegitimateInterest: typeof FixedVectorEncoder = FixedVectorEncoder;

}
