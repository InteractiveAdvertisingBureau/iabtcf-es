/**
 * I need this interface to have type flexibility so I'm disabling eslint...
 * Don't know if there is a better way to achieve this...
 */

import {
  BooleanEncoder,
  DateEncoder,
  FixedVectorEncoder,
  IntEncoder,
  LangEncoder,
  PurposeRestrictionVectorEncoder,
  VendorVectorEncoder,
} from '../encoder';

import {Fields} from './Fields';
import {Vector} from './Vector';
import {PurposeRestrictionVector} from './PurposeRestrictionVector';

export interface TCFields {

  [Fields.cmpId]: typeof IntEncoder | number | string;
  [Fields.cmpVersion]: typeof IntEncoder | number | string;
  [Fields.consentLanguage]: typeof LangEncoder | string;
  [Fields.consentScreen]: typeof IntEncoder | number | string;
  [Fields.created]: typeof DateEncoder | Date;
  [Fields.isServiceSpecific]: typeof BooleanEncoder | boolean;
  [Fields.lastUpdated]: typeof DateEncoder | Date;
  [Fields.numCustomPurposes]: typeof IntEncoder | number | string;
  [Fields.policyVersion]: typeof IntEncoder | number | string;
  [Fields.publisherConsents]: typeof FixedVectorEncoder | Vector;
  [Fields.publisherCountryCode]: typeof LangEncoder | string;
  [Fields.publisherCustomConsents]: typeof FixedVectorEncoder | Vector;
  [Fields.publisherCustomLegitimateInterest]: typeof FixedVectorEncoder | Vector;
  [Fields.publisherLegitimateInterest]: typeof FixedVectorEncoder | Vector;
  [Fields.publisherRestrictions]: typeof PurposeRestrictionVectorEncoder | PurposeRestrictionVector;
  [Fields.purposeConsents]: typeof FixedVectorEncoder | Vector;
  [Fields.purposeLegitimateInterest]: typeof FixedVectorEncoder | Vector;
  [Fields.purposeOneTreatment]: typeof BooleanEncoder | boolean;
  [Fields.specialFeatureOptIns]: typeof FixedVectorEncoder | Vector;
  [Fields.useNonStandardStacks]: typeof BooleanEncoder | boolean;
  [Fields.vendorConsents]: typeof VendorVectorEncoder | Vector;
  [Fields.vendorLegitimateInterest]: typeof VendorVectorEncoder | Vector;
  [Fields.vendorListVersion]: typeof IntEncoder | number | string;
  [Fields.vendorsAllowed]: typeof VendorVectorEncoder | Vector;
  [Fields.vendorsDisclosed]: typeof VendorVectorEncoder | Vector;
  [Fields.version]: typeof IntEncoder | number | string;

}
