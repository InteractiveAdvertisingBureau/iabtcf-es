import {Fields} from '../model/index.js';

export class BitLength {

  public static readonly [Fields.cmpId]: number = 12;
  public static readonly [Fields.cmpVersion]: number = 12;
  public static readonly [Fields.consentLanguage]: number = 12;
  public static readonly [Fields.consentScreen]: number = 6;
  public static readonly [Fields.created]: number = 36;
  public static readonly [Fields.isServiceSpecific]: number = 1;
  public static readonly [Fields.lastUpdated]: number = 36;
  public static readonly [Fields.policyVersion]: number = 6;
  public static readonly [Fields.publisherCountryCode]: number = 12;
  public static readonly [Fields.publisherLegitimateInterests]: number = 24;
  public static readonly [Fields.publisherConsents]: number = 24;
  public static readonly [Fields.purposeConsents]: number = 24;
  public static readonly [Fields.purposeLegitimateInterests]: number = 24;
  public static readonly [Fields.purposeOneTreatment]: number = 1;
  public static readonly [Fields.specialFeatureOptins]: number = 12;
  public static readonly [Fields.useNonStandardTexts]: number = 1;
  public static readonly [Fields.vendorListVersion]: number = 12;
  public static readonly [Fields.version]: number = 6;

  public static readonly anyBoolean: number = 1;
  public static readonly encodingType: number = 1;
  public static readonly maxId: number = 16;
  public static readonly numCustomPurposes: number = 6;
  public static readonly numEntries: number = 12;
  public static readonly numRestrictions: number = 12;
  public static readonly purposeId: number = 6;
  public static readonly restrictionType: number = 2;
  public static readonly segmentType: number = 3;
  public static readonly singleOrRange: number = 1;
  public static readonly vendorId: number = 16;

}
