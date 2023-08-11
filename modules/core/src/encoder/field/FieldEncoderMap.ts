import {Fields} from '../../model/index.js';
import {BooleanEncoder} from './BooleanEncoder.js';
import {DateEncoder} from './DateEncoder.js';
import {FixedVectorEncoder} from './FixedVectorEncoder.js';
import {IntEncoder} from './IntEncoder.js';
import {LangEncoder} from './LangEncoder.js';
import {PurposeRestrictionVectorEncoder} from './PurposeRestrictionVectorEncoder.js';
import {VendorVectorEncoder} from './VendorVectorEncoder.js';

export function FieldEncoderMap(): object {

  return {
    [Fields.version]: IntEncoder,
    [Fields.created]: DateEncoder,
    [Fields.lastUpdated]: DateEncoder,
    [Fields.cmpId]: IntEncoder,
    [Fields.cmpVersion]: IntEncoder,
    [Fields.consentScreen]: IntEncoder,
    [Fields.consentLanguage]: LangEncoder,
    [Fields.vendorListVersion]: IntEncoder,
    [Fields.policyVersion]: IntEncoder,
    [Fields.isServiceSpecific]: BooleanEncoder,
    [Fields.useNonStandardTexts]: BooleanEncoder,
    [Fields.specialFeatureOptins]: FixedVectorEncoder,
    [Fields.purposeConsents]: FixedVectorEncoder,
    [Fields.purposeLegitimateInterests]: FixedVectorEncoder,
    [Fields.purposeOneTreatment]: BooleanEncoder,
    [Fields.publisherCountryCode]: LangEncoder,
    [Fields.vendorConsents]: VendorVectorEncoder,
    [Fields.vendorLegitimateInterests]: VendorVectorEncoder,
    [Fields.publisherRestrictions]: PurposeRestrictionVectorEncoder,
    segmentType: IntEncoder,
    [Fields.vendorsDisclosed]: VendorVectorEncoder,
    [Fields.vendorsAllowed]: VendorVectorEncoder,
    [Fields.publisherConsents]: FixedVectorEncoder,
    [Fields.publisherLegitimateInterests]: FixedVectorEncoder,
    [Fields.numCustomPurposes]: IntEncoder,
    [Fields.publisherCustomConsents]: FixedVectorEncoder,
    [Fields.publisherCustomLegitimateInterests]: FixedVectorEncoder,
  };

}
