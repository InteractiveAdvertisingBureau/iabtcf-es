import {VersionMap} from './VersionMap';
import {Fields} from '../../model';

export class CoreFieldSequence implements VersionMap {

  public readonly '1': string[] = [
    Fields.version,
    Fields.created,
    Fields.lastUpdated,
    Fields.cmpId,
    Fields.cmpVersion,
    Fields.consentScreen,
    Fields.consentLanguage,
    Fields.vendorListVersion,
    Fields.purposeConsents,
    Fields.vendorConsents,
  ];
  public readonly '2': string[] = [
    Fields.version,
    Fields.created,
    Fields.lastUpdated,
    Fields.cmpId,
    Fields.cmpVersion,
    Fields.consentScreen,
    Fields.consentLanguage,
    Fields.vendorListVersion,
    Fields.policyVersion,
    Fields.isServiceSpecific,
    Fields.useNonStandardStacks,
    Fields.specialFeatureOptIns,
    Fields.purposeConsents,
    Fields.purposeLegitimateInterest,
    Fields.purposeOneTreatment,
    Fields.publisherCountryCode,
    Fields.vendorConsents,
    Fields.vendorLegitimateInterest,
    Fields.publisherRestrictions,
  ];

}
