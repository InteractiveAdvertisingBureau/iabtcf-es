/**
 * CMPManifest class that collects CMP specific values for encoding a TC String
 */
declare class CMPManifest {
    private cmpId;
    private cmpVersion;
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
    constructor(cmpId?: number, cmpVersion?: number);
    /**
     * setCmpId - sets the Consent Manager Provider ID that last updated the TC
     * string
     *
     * @param {number} num -  unique ID assigned to a Consent Manager Provider
     * (CMP) by the iab. This ID is encoded in the string. To register as a CMP
     * please go to https://register.consensu.org/CMP
     * @return {undefined}
     */
    setCmpId(num: number): void;
    /**
     * getCmpId - gets the Consent Manager Provider ID that last updated the TC
     * string
     *
     * @return {number} unique ID assigned to a Consent Manager Provider (CMP) by
     * the iab. This ID is encoded in the string. To register as a CMP please go
     * to https://register.consensu.org/CMP
     */
    getCmpId(): number;
    /**
     * setCmpVersion - sets the Consent Manager Provider version. This is a CMP's
     * own internal versioning number.  Each change to an operating CMP should
     * receive a new version number, for logging proof of consent
     *
     * @param {number} num - number to set CmpVersion to
     * @return {undefined}
     */
    setCmpVersion(num: number): void;
    /**
     * getCmpVersion - gets the Consent Manager Provider version. This is a CMP's
     * own internal versioning number.  Each change to an operating CMP should
     * receive a new version number, for logging proof of consent
     *
     * @return {number}
     */
    getCmpVersion(): number;
    /**
     * isValid
     *
     * @return {boolean} whether or not this CMP manifest is valid ie. are the
     * values all set and within reasonable parameters for those values
     */
    isValid(): boolean;
}
export { CMPManifest };
