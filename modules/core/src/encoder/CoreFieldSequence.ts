import {

  Fields,
  VersionMap,

} from '.';

export class CoreFieldSequence implements VersionMap {

  private fields: Fields;
  public readonly '1': string[];
  public readonly '2': string[];

  public constructor() {

    this.fields = new Fields();

    this['1'] = [
      this.fields.version,
      this.fields.created,
      this.fields.lastUpdated,
      this.fields.cmpId,
      this.fields.cmpVersion,
      this.fields.consentScreen,
      this.fields.consentLanguage,
      this.fields.vendorListVersion,
      this.fields.purposeConsents,
      this.fields.vendorConsents,
    ];

    this['2'] = [
      this.fields.version,
      this.fields.created,
      this.fields.lastUpdated,
      this.fields.cmpId,
      this.fields.cmpVersion,
      this.fields.consentScreen,
      this.fields.consentLanguage,
      this.fields.vendorListVersion,
      this.fields.policyVersion,
      this.fields.isServiceSpecific,
      this.fields.useNonStandardStacks,
      this.fields.specialFeatureOptIns,
      this.fields.purposeConsents,
      this.fields.purposeLITransparency,
      this.fields.purposeOneTreatment,
      this.fields.publisherCountryCode,
      this.fields.vendorConsents,
      this.fields.vendorLegitimateInterest,
      this.fields.publisherRestrictions,
    ];

  }

}
