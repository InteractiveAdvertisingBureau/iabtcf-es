import {Fields} from '../../model';
import {BooleanEncoder} from './BooleanEncoder';
import {DateEncoder} from './DateEncoder';
import {FixedVectorEncoder} from './FixedVectorEncoder';
import {IntEncoder} from './IntEncoder';
import {LangEncoder} from './LangEncoder';
import {PurposeRestrictionVectorEncoder} from './PurposeRestrictionVectorEncoder';
import {VendorVectorEncoder} from './VendorVectorEncoder';

export class FieldEncoderMap {

  public static readonly [Fields.version]: typeof IntEncoder = IntEncoder;
  public static readonly [Fields.created]: typeof DateEncoder = DateEncoder;
  public static readonly [Fields.lastUpdated]: typeof DateEncoder = DateEncoder;
  public static readonly [Fields.cmpId]: typeof IntEncoder = IntEncoder;
  public static readonly [Fields.cmpVersion]: typeof IntEncoder = IntEncoder;
  public static readonly [Fields.consentScreen]: typeof IntEncoder = IntEncoder;
  public static readonly [Fields.consentLanguage]: typeof LangEncoder = LangEncoder;
  public static readonly [Fields.vendorListVersion]: typeof IntEncoder = IntEncoder;
  public static readonly [Fields.policyVersion]: typeof IntEncoder = IntEncoder;
  public static readonly [Fields.isServiceSpecific]: typeof BooleanEncoder = BooleanEncoder;
  public static readonly [Fields.useNonStandardStacks]: typeof BooleanEncoder = BooleanEncoder;
  public static readonly [Fields.specialFeatureOptins]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public static readonly [Fields.purposeConsents]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public static readonly [Fields.purposeLegitimateInterests]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public static readonly [Fields.purposeOneTreatment]: typeof BooleanEncoder = BooleanEncoder;
  public static readonly [Fields.publisherCountryCode]: typeof LangEncoder = LangEncoder;
  public static readonly [Fields.vendorConsents]: typeof VendorVectorEncoder = VendorVectorEncoder;
  public static readonly [Fields.vendorLegitimateInterests]: typeof VendorVectorEncoder = VendorVectorEncoder;
  public static readonly [Fields.publisherRestrictions]: typeof PurposeRestrictionVectorEncoder
  = PurposeRestrictionVectorEncoder;
  public static readonly segmentType: typeof IntEncoder = IntEncoder;
  public static readonly [Fields.vendorsDisclosed]: typeof VendorVectorEncoder = VendorVectorEncoder;
  public static readonly [Fields.vendorsAllowed]: typeof VendorVectorEncoder = VendorVectorEncoder;
  public static readonly [Fields.publisherConsents]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public static readonly [Fields.publisherLegitimateInterests]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public static readonly [Fields.numCustomPurposes]: typeof IntEncoder = IntEncoder;
  public static readonly [Fields.publisherCustomConsents]: typeof FixedVectorEncoder = FixedVectorEncoder;
  public static readonly [Fields.publisherCustomLegitimateInterests]: typeof FixedVectorEncoder = FixedVectorEncoder;

}
