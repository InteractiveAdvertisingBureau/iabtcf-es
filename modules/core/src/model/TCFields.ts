/**
 * I need this interface to have type flexibility so I'm disabling eslint...
 * Don't know if there is a better way to achieve this...
 */

/* eslint-disable */
export interface TCFields {

  version: any;
  created: any;
  lastUpdated: any;
  cmpId: any;
  cmpVersion: any;
  consentScreen: any;
  consentLanguage: any;
  vendorListVersion: any;
  policyVersion: any;
  isServiceSpecific: any;
  useNonStandardStacks: any;
  specialFeatureOptIns: any;
  purposeConsents: any;
  purposeLegitimateInterest: any;
  purposeOneTreatment: any;
  publisherCountryCode: any;
  vendorConsents: any;
  vendorLegitimateInterest: any;
  publisherRestrictions: any;
  vendorsDisclosed: any;
  vendorsAllowed: any;
  publisherConsents: any;
  publisherLITransparency:any;
  numCustomPurposes:any;
  publisherCustomConsents:any;
  publisherCustomLITransparency:any;

}
