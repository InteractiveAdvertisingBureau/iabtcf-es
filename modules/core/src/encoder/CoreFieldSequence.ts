import {Fields} from './Fields';

export class CoreFieldSequence {

  public static readonly'1': string[] = [
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

  public static readonly '2': string[] = [
    Fields.version,
    Fields.checksum,
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
    Fields.purposeLITransparency,
    Fields.purposeOneTreatment,
    Fields.referenceCountry,
    Fields.vendorConsents,
    Fields.vendorLegitimateInterest,
    Fields.publisherRestrictions,
  ]

}
