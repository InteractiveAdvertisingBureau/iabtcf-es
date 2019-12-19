import {TCFields, Fields} from '../../model';

import {BooleanEncoder} from './BooleanEncoder';
import {DateEncoder} from './DateEncoder';
import {FixedVectorEncoder} from './FixedVectorEncoder';
import {IntEncoder} from './IntEncoder';
import {LangEncoder} from './LangEncoder';
import {PurposeRestrictionVectorEncoder} from './PurposeRestrictionVectorEncoder';
import {VendorVectorEncoder} from './VendorVectorEncoder';

export class FieldEncoderMap implements TCFields {

  public readonly [Fields.version]: typeof IntEncoder = IntEncoder;
  public readonly [Fields.created]: typeof DateEncoder = DateEncoder;
  public readonly [Fields.lastUpdated]: typeof DateEncoder = DateEncoder;
  public readonly [Fields.cmpId]: typeof IntEncoder = IntEncoder;
  public readonly [Fields.cmpVersion]: typeof IntEncoder = IntEncoder;
  public readonly [Fields.consentScreen]: typeof IntEncoder = IntEncoder;
  public readonly [Fields.consentLanguage]: typeof LangEncoder = LangEncoder;
  public readonly [Fields.vendorListVersion]: typeof IntEncoder = IntEncoder;
  public readonly [Fields.policyVersion]: typeof IntEncoder = IntEncoder;
  public readonly [Fields.isServiceSpecific]: typeof BooleanEncoder = BooleanEncoder;
  public readonly [Fields.useNonStandardStacks]: typeof BooleanEncoder = BooleanEncoder;
  public readonly [Fields.specialFeatureOptIns]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly [Fields.purposeConsents]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly [Fields.purposeLegitimateInterest]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly [Fields.purposeOneTreatment]: typeof BooleanEncoder = BooleanEncoder;
  public readonly [Fields.publisherCountryCode]: typeof LangEncoder = LangEncoder;
  public readonly [Fields.vendorConsents]: typeof VendorVectorEncoder = VendorVectorEncoder;
  public readonly [Fields.vendorLegitimateInterest]: typeof VendorVectorEncoder = VendorVectorEncoder;
  public readonly [Fields.publisherRestrictions]: typeof PurposeRestrictionVectorEncoder
  = PurposeRestrictionVectorEncoder;
  public readonly segmentType: typeof IntEncoder = IntEncoder;
  public readonly [Fields.vendorsDisclosed]: typeof VendorVectorEncoder = VendorVectorEncoder;
  public readonly [Fields.vendorsAllowed]: typeof VendorVectorEncoder = VendorVectorEncoder;
  public readonly [Fields.publisherConsents]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly [Fields.publisherLegitimateInterest]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly [Fields.numCustomPurposes]: typeof IntEncoder = IntEncoder;
  public readonly [Fields.publisherCustomConsents]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public readonly [Fields.publisherCustomLegitimateInterest]: typeof FixedVectorEncoder = FixedVectorEncoder;

}
