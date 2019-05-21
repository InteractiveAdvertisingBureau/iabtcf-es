import GetJSON from '../utils/GetJSON';
import GVLError from './GVLError';

const DEFAULT_BASE_URL = 'https://vendorlist.consensu.org/';
const DEFAULT_FILENAME = 'vendorlist.json';

/**
 * @class
 */
class GVL {
  /**
   * setBaseUrl - if the default GVL location isn't used this will be used
   *
   * @static
   *
   * @param {string} newUrl - new full base URL before the filename or the
   * versioned source url, defined by the TCF as
   * [baseUrl]/v-[versionNum]/[filename] default baseUrl is
   * 'https://vendorlist.consensu.org/'
   *
   * @return {undefined}
   */
  static setBaseUrl(newUrl) {
    // incase they forgot the trailing slash...
    newUrl += (newUrl[newUrl.length - 1] === '/') ? '' : '/';
    this.baseUrl = newUrl;
  }
  /**
   * setFilename - sets the filename in case it's different that just
   * vendorlist.json otherwise the default will be used of vendorlist.json
   *
   * @static
   * @param {string} newFilename - value other than vendorlist.json
   * @return {undefined}
   */
  static setFilename(newFilename) {
    this.filename = newFilename;
  }
  /**
   * @param {(string | object | number)} [versionOrJSON] - can be either the
   * JSON object that is the GVL or a version number represented as a string or
   * number to download.  If nothing is passed the latest version of the GVL
   * will be loaded
   *
   * @return {undefined}
   */
  constructor(versionOrJSON) {
    let url;

    /**
     * if these weren't set before this isntance was initialized then we will
     * set them to the default value.
     */
    if (!this.baseUrl) {
      this.baseUrl = DEFAULT_BASE_URL;
    }
    if (!this.filename) {
      this.filename = DEFAULT_FILENAME;
    }
    url = this.baseUrl;

    /**
     * figure out if they passed in a version to download, a GVL JSON object
     * or nothing.
     */
    switch (typeof versionOrJSON) {
      case 'string':
      case 'number':
        // download the version specified
        if (versionOrJSON > 0) {
          url += 'v-' + version + '/' + this.filename;
          this.readyPromise_ = GetJSON.get(url);
        } else {
          throw new GVLError('invalid vendor list version');
        }
        break;
      case 'object':
        // they have passed a GVL JSON
        this.readyPromise_ = new Promise((resolve, reject) => {
          if (!versionOrJSON.vendorListVersion
          || !Array.isArray(versionOrJSON.purposes)
          || !Array.isArray(versionOrJSON.vendors)) {
          // The provided vendor list does not look valid
            reject(new GVLError('Invalid vendor list format'));
          } else {
            resolve(versionOrJSON);
          }
        });
        break;
      default:
        // anything else we just get the latest
        url += this.filename;
        this.readyPromise_ = GetJSON.get(url);
    }

    this.readyPromise_.then((gvlJSON) => {
      this.json_ = gvlJSON;
      this.json_.vendors.sort((a, b) => {
        return a.id - b.id;
      });
    })
        .catch((err) => {
          throw new GVLError('unable to construct GVL Object' + err);
        });
  }
  /**
   * getVersion - returns the version specified by the Global Vendor List as
   * vendorListVersion
   *
   * @return {number}
   */
  getVersion() {
    return this.json_.vendorListVersion;
  }
  /**
   * getPurpose - returns a single purpose by purpose id
   *
   * @param {number} purposeId - purpose id to return
   * @return {object}
   */
  getPurpose(purposeId) {
    // purposes are sorted with no gaps but are 1-based instead of 0-based
    // like the array is
    return this.json_.purposes[purposeId - 1];
  }
  /**
   * getPurposes returns the purposes array from the GVL which contains their
   * descriptions, names and ids.
   *
   * @return {array}
   */
  getPurposes() {
    return this.json_.purposes;
  }
  /**
   * getVendors returns the vendors array from the global vendor list
   *
   * @return {undefined}
   */
  getVendors() {
    return vendors;
  }
  /**
   * getVendor returns a single vendor object by vendor id from the GVL
   *
   * @param {number} vendorId - vendor id to pull from the GVL
   * @return {object}
   */
  getVendor(vendorId) {
    // binary search since the array is sorted in the set method and
    // there are sparse ids
    const vendors = json.vendors;
    let left = 0;
    let right = vendors.length - 1;
    let mid;

    while (left <= right) {
      if (left === right) {
        mid = left;
      } else {
        mid = Math.floor((right - left) / 2) + left;
      }

      if (vendors[mid].id === vendorId) {
        return vendors[mid];
      }

      if (id < vendors[mid].id) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
  /**
   * getReadyPromise - gets the promise object for when the GVL downloads and
   * this object is ready to operate.
   *
   * @return {Promise} - standard es6 promise object
   */
  getReadyPromise() {
    return this.readyPromise_;
  }
}

export {GVL};
