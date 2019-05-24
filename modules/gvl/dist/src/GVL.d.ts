import { GVLJson } from './GVLJson';
import { Purpose } from './GVLJson';
import { Purposes } from './GVLJson';
import { Vendor } from './GVLJson';
import { Vendors } from './GVLJson';
/**
 * @class
 */
declare class GVL {
    private static DEFAULT_BASE_URL;
    private static DEFAULT_FILENAME;
    static baseUrl: string;
    static filename: string;
    private readyPromise;
    private json;
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
    static setBaseUrl(newUrl: string): void;
    /**
     * setFilename - sets the filename in case it's different that just
     * vendorlist.json otherwise the default will be used of vendorlist.json
     *
     * @static
     * @param {string} newFilename - value other than vendorlist.json
     * @return {undefined}
     */
    static setFilename(newFilename: string): void;
    /**
     * @param {(string | object | number)} [versionOrJSON] - can be either the
     * JSON object that is the GVL or a version number represented as a string or
     * number to download.  If nothing is passed the latest version of the GVL
     * will be loaded
     *
     * @return {undefined}
     */
    constructor(versionOrJSON: string | GVLJson | number | undefined);
    /**
     * getVersion - returns the version specified by the Global Vendor List as
     * vendorListVersion
     *
     * @return {number}
     */
    getVersion(): number;
    /**
     * getPurpose - returns a single purpose by purpose id
     *
     * @param {number} purposeId - purpose id to return
     * @return {object}
     */
    getPurpose(purposeId: number): Purpose;
    /**
     * getPurposes returns the purposes array from the GVL which contains their
     * descriptions, names and ids.
     *
     * @return {array}
     */
    getPurposes(): Purposes;
    /**
     * getVendors returns the vendors array from the global vendor list
     *
     * @return {undefined}
     */
    getVendors(): Vendors;
    /**
     * getVendor returns a single vendor object by vendor id from the GVL
     *
     * @param {number} vendorId - vendor id to pull from the GVL
     * @return {object}
     */
    getVendor(vendorId: number): Vendor;
    /**
     * getReadyPromise - gets the promise object for when the GVL downloads and
     * this object is ready to operate.
     *
     * @return {Promise} - standard es6 promise object
     */
    getReadyPromise(): Promise<object>;
}
export { GVL };
