import {SequenceVersionMap, SVMItem} from './SequenceVersionMap';
import {Segment, Fields} from '../../model';

export class FieldSequence implements SequenceVersionMap {

  public readonly '1': SVMItem = {
    [Segment.CORE]: [
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
    ],
  };
  public readonly '2': SVMItem = {
    [Segment.CORE]: [
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
      Fields.specialFeatureOptins,
      Fields.purposeConsents,
      Fields.purposeLegitimateInterests,
      Fields.purposeOneTreatment,
      Fields.publisherCountryCode,
      Fields.vendorConsents,
      Fields.vendorLegitimateInterests,
      Fields.publisherRestrictions,
    ],
    [Segment.PUBLISHER_TC]: [
      Fields.publisherConsents,
      Fields.publisherLegitimateInterests,
      Fields.numCustomPurposes,
      Fields.publisherCustomConsents,
      Fields.publisherCustomLegitimateInterests,
    ],
    [Segment.VENDORS_ALLOWED]: [
      Fields.vendorsAllowed,
    ],
    [Segment.VENDORS_DISCLOSED]: [
      Fields.vendorsDisclosed,
    ],
  };

}
