import {TCFields} from '../model';

export class Fields implements TCFields {

  public readonly version: string = 'version';
  public readonly created: string = 'created';
  public readonly lastUpdated: string = 'lastUpdated';
  public readonly cmpId: string = 'cmpId';
  public readonly cmpVersion: string = 'cmpVersion';
  public readonly consentScreen: string = 'consentScreen';
  public readonly consentLanguage: string = 'consentLanguage';
  public readonly vendorListVersion: string = 'vendorListVersion';
  public readonly policyVersion: string = 'policyVersion';
  public readonly isServiceSpecific: string = 'isServiceSpecific';
  public readonly useNonStandardStacks: string = 'useNonStandardStacks';
  public readonly specialFeatureOptIns: string = 'specialFeatureOptIns';
  public readonly purposeConsents: string = 'purposeConsents';
  public readonly purposeLITransparency: string = 'purposeLITransparency';
  public readonly purposeOneTreatment: string = 'purposeOneTreatment';
  public readonly publisherCountryCode: string = 'publisherCountryCode';
  public readonly vendorConsents: string = 'vendorConsents';
  public readonly vendorLegitimateInterest: string = 'vendorLegitimateInterest';
  public readonly publisherRestrictions: string = 'publisherRestrictions';

}
