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
    constructor(cmpId = NaN, cmpVersion = NaN) {
        this.cmpId = cmpId;
        this.cmpVersion = cmpVersion;
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
        this.cmpId = num;
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
        return this.cmpId;
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
        this.cmpVersion = num;
    }
    /**
     * getCmpVersion - gets the Consent Manager Provider version. This is a CMP's
     * own internal versioning number.  Each change to an operating CMP should
     * receive a new version number, for logging proof of consent
     *
     * @return {number}
     */
    getCmpVersion() {
        return this.cmpVersion;
    }
    /**
     * isValid
     *
     * @return {boolean} whether or not this CMP manifest is valid ie. are the
     * values all set and within reasonable parameters for those values
     */
    isValid() {
        return (this.cmpId > 1 && this.cmpVersion > 0);
    }
}
export { CMPManifest };
