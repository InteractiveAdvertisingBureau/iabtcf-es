import {IntEncoder} from './encoder/IntEncoder';
import {LangEncoder} from './encoder/LangEncoder';
import {BooleanEncoder} from './encoder/BooleanEncoder';
import {DateEncoder} from './encoder/DateEncoder';
import {VectorEncoder} from './encoder/VectorEncoder';
import {SpecificEncoder} from './encoder/SpecificEncoder';

class Encodings {

  /**
   * The outer array describes index is encoding version - 1 (since it's
   * zero-based) and the inner array is the string representation of the BITS
   * static above ordered by "IAB Tech Lab - Consent string and vendor list
   * formats v2"
   */

  public static order: readonly (readonly string[])[] = [

    // tcf v1
    [
      'version',
      'created',
      'lastUpdated',
      'cmpId',
      'cmpVersion',
      'consentScreen',
      'consentLanguage',
      'vendorListVersion',
      'purposeConsents',
      'vendorConsents',
    ],

    // tcf v2
    [
      'version',
      'checksum',
      'created',
      'lastUpdated',
      'cmpId',
      'cmpVersion',
      'consentScreen',
      'consentLanguage',
      'vendorListVersion',
      'policyVersion',
      'isServiceSpecific',
      'useNonStandardStacks',
      'specialFeatureOptIns',
      'purposeConsents',
      'purposeLITransparency',
      'vendorConsents',
      'vendorLegitimateInterest',
      'publisherRestrictions',
    ],
  ];

  public static readonly encoders: object = {
    version: IntEncoder,
    created: DateEncoder,
    lastUpdated: DateEncoder,
    cmpId: IntEncoder,
    cmpVersion: IntEncoder,
    consentScreen: IntEncoder,
    consentLanguage: LangEncoder,
    vendorListVersion: IntEncoder,
    policyVersion: IntEncoder,
    isServiceSpecific: BooleanEncoder,
    useNonStandardStacks: BooleanEncoder,
    specialFeatureOptIns: VectorEncoder,
    purposeConsents: VectorEncoder,
    purposeLITransparency: VectorEncoder,
    vendorConsents: VectorEncoder,
    vendorLegitimateInterest: VectorEncoder,
    publisherRestrictions: VectorEncoder,

  };

}

export {Encodings, SpecificEncoder};
