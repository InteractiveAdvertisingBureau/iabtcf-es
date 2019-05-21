import OutOfRangeError from './OutOfRangeError';
import InvalidValueError from './InvalidValueError';
import CMPManifest from './CMPManifest';
import {valueWithinRange} from './FieldBitLengths';

let _version;
let _created;
let _lastUpdated;
let _cmpId;
let _cmpVersion;
let _consentScreen;
let _consentLanguage;
let _vendorListVersion;
let _policyVersion;
let _isServiceSpecific;
let _useNonStandardStacks;

/**
 * Class representing a Transparancy and Consent String as defined by the iab's
 * Transparency and Consent Framework v2
 */
class TCModel {
  /**
   * constructor - constructs a TCModel
   *
   * @type {CMPManifest}
   * @param {CMPManifest} cmpManifest - To generate a model, there must be iab
   * sanctioned CMP parameters.
   * @return {undefined}
   */
  constructor(cmpManifest) {
    if (cmpManifest instanceof CMPManifest && cmpManifest.isValid()) {
      _cmpId = cmpManifest.getCmpId();
      _cmpVersion = cmpManifest.getCmpId();
    }
  }
  /**
   * getVersion
   *
   * @return {number} version of the consent string encoding
   */
  getVersion() {
    return _version;
  }
  /**
   * getCreated
   *
   * @return {Date} when this TC String was created
   */
  getCreated() {
    return _created;
  }
  /**
   * getLastUpdated
   *
   * @return {Date} the last time the string was updated
   */
  getLastUpdated() {
    return _lastUpdated;
  }
  /**
   * getCmpId - gets the Consent Manager Provider ID that last updated the TC
   * string
   *
   * @return {number} unique ID assigned to a Consent Manager Provider (CMP) by
   * the iab. This ID is encoded in the string. To register as a CMP please go
   * to https://register.consensu.org/CMP
   */
  getCmpId() {
    return _cmpId;
  }
  /**
   * getCmpVersion - gets the Consent Manager Provider version. This is a CMP's
   * own internal versioning number.  Each change to an operating CMP should
   * receive a new version number, for logging proof of consent
   *
   * @return {number}
   */
  getCmpVersion() {
    return _cmpVersion;
  }

  /**
   * setConsentScreen - sets the screen number in the CMP where consent was
   * given. The screen number is CMP and CmpVersion specific, and is for logging
   * proof of consent.(For example, a CMP could keep records so that a publisher
   * can request information about the context in which consent was gathered.)
   *
   * @param {number} num - number to set the consent screen to
   * @return {undefined}
   */
  setConsentScreen(num) {
    if (valueWithinRange('ConsentScreen', num)) {
      _consentScreen = num;
    } else {
      throw new OutOfRangeError('CmpVersion');
    }
  }
  /**
   * getConsentScreen - gets the screen number in the CMP where consent was
   * given. The screen number is CMP and CmpVersion specific, and is for logging
   * proof of consent.(For example, a CMP could keep records so that a publisher
   * can request information about the context in which consent was gathered.)
   *
   * @return {number}
   */
  getConsentScreen() {
    return _consentScreen;
  }
  /**
   * setConsentLanguage - sets the Two-letter ISO639-1 language code in which
   * the CMP UI was presented.
   *
   * @param {string} twoLetterLangCode - two letter lowercase language code
   * eg. 'en' or 'fr', etc..
   * @return {undefined}
   */
  setConsentLanguage(twoLetterLangCode) {
    if (typeof twoLetterLangCode === 'string'
      && twoLetterLangCode.length === 2) {
      _consentLanguage = twoLetterLangCode.toLowerCase();
    } else {
      throw new InvalidValueError('ConsentLanguage');
    }
  }
  /**
   * getConsentLanguage - gets the Two-letter ISO639-1 language code in which
   * the CMP UI was presented.
   *
   * @return {string} two letter lowercase language code
   * eg. 'en' or 'fr', etc..
   */
  getConsentLanguage() {
    return _consentLanguage;
  }
  /**
   * getVendorListVersion - gets the version of global vendor list used in most
   * recent TC string update. Global vendor list versions will be released
   * periodically.
   *
   * @return {number}
   */
  getVendorListVersion() {
    return _vendorListVersion;
  }

  /**
   * getPolicyVersion - gets the value from the corresponding field in the GVL
   * that was used for obtaining consent. A new policy version invalidates
   * existing strings and requires CMPs to re-establish transparency and consent
   * from users. If a TC string’s policy version number is different from the
   * one from the latest GVL, the CMP must re-establish transparency and consent
   *
   * @return {number}
   */
  getPolicyVersion() {
    return _policyVersion;
  }

  /**
   * setIsServiceSpecific - sets whether the signals encoded in this TC String
   * were from site-specific storage (True) versus ‘global’ consensu.org shared
   * storage (False).
   *
   * A string intended to be stored in global/shared scope but the CMP is unable
   * to store due to a user agent not accepting third-party cookies would be
   * considered site-specific (True).
   *
   * @param {boolean} bool - value to set whether this sting will be stored in a
   * service-specific mannor or whether it will be stored in the global consensu
   * domain space
   * @return {undefined}
   */
  setIsServiceSpecific(bool) {
    if (typeof bool === 'boolean') {
      _isServiceSpecific = bool;
    } else {
      throw new InvalidValueError('IsServiceSpecific');
    }
  }
  /**
   * getIsServiceSpecific - gets whether the signals encoded in this TC String
   * were from site-specific storage (True) versus ‘global’ consensu.org shared
   * storage (False).
   *
   * A string intended to be stored in global/shared scope but the CMP is unable
   * to store due to a user agent not accepting third-party cookies would be
   * considered site-specific (True).
   *
   * @return {boolean}
   */
  getIsServiceSpecific() {
    return _isServiceSpecific;
  }
  /**
   * setUseNonStandardStacks - Non-standard stacks means that a CMP is using
   * publisher-customized stack descriptions.
   *
   * Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are
   * titles. Descriptions are pre-set, but publishers can customize them. If
   * they do, they need to set this bit to indicate that they've customized
   * descriptions
   *
   * @param {boolean} bool - true if CMP used non-standard stacks during consent
   * gathering; false if IAB standard stacks were used.
   * @return {undefined}
   */
  setUseNonStandardStacks(bool) {
    if (typeof bool === 'boolean') {
      _useNonStandardStacks = bool;
    } else {
      throw new InvalidValueError('UseNonStandardStacks');
    }
  }
  /**
   * getUseNonStandardStacks - Non-standard stacks means that a CMP is using
   * publisher-customized stack descriptions.
   *
   * Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are
   * titles. Descriptions are pre-set, but publishers can customize them. If
   * they do, they need to set this bit to indicate that they've customized
   * descriptions
   *
   *
   * @return {boolean} - true if CMP used non-standard stacks during consent
   * gathering; false if IAB standard stacks were used.
   */
  getUseNonStandardStacks() {
    return _useNonStandardStacks;
  }
}

export default TCModel;
