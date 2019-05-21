import OutOfRangeError from './OutOfRangeError';
import {valueWithinRange} from './FieldBitLengths';

let _cmpId;
let _cmpVersion;

/**
 * CMPManifest class that collects CMP specific values for encoding a TC String
 */
class CMPManifest {
  /**
   * constructor - constructs a CMPManifest Object
   *
   * @param {number} cmpId=null - unique ID assigned to a Consent Manager
   * Provider (CMP) by the iab. This ID is encoded in the string. To register as
   * a CMP please go to https://register.consensu.org/CMP
   * @param {number} cmpVersion=null - Consent Manager Provider version. This is
   * a CMP's own internal versioning number.  Each change to an operating CMP
   * should receive a new version number, for logging proof of consent
   * @return {undefined}
   */
  constructor(cmpId = null, cmpVersion = null) {
    _cmpId = cmpId;
    _cmpVersion = cmpVersion;
  }
  /**
   * setCmpId - sets the Consent Manager Provider ID that last updated the TC
   * string
   *
   * @param {number} num -  unique ID assigned to a Consent Manager Provider
   * (CMP) by the iab. This ID is encoded in the string. To register as a CMP
   * please go to https://register.consensu.org/CMP
   * @return {undefined}
   */
  setCmpId(num) {
    if (valueWithinRange('CmpId', num)) {
      _cmpId = num;
    } else {
      throw new OutOfRangeError('CmpVersion');
    }
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
   * setCmpVersion - sets the Consent Manager Provider version. This is a CMP's
   * own internal versioning number.  Each change to an operating CMP should
   * receive a new version number, for logging proof of consent
   *
   * @param {number} num - number to set CmpVersion to
   * @return {undefined}
   */
  setCmpVersion(num) {
    if (valueWithinRange('CmpVersion', num)) {
      _cmpVersion = num;
    } else {
      throw new OutOfRangeError('CmpVersion');
    }
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
   * isValid
   *
   * @return {boolean} whether or not this CMP manifest is valid ie. are the
   * values all set and within reasonable parameters for those values
   */
  isValid() {
    return (_cmpId > 1 && _cmpVersion > 0);
  }
}

export default CMPManifest;
