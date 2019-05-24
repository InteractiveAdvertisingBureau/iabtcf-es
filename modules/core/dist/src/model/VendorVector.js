class VendorVector {
    constructor() {
        this.map = new Map();
    }
    /**
     * setVendor -- sets a vendor value in this vector.  A value may be a simple
     * boolean or in the case of publisher restrictions it could be two integers
     *
     * @param {number} vendorId - id of the vendor from the GVL
     * @param {boolean|PurposeRestriction} value - either boolean value or the
     * publisher restriciton type which is two numbers
     * @return {void}
     */
    setVendor(vendorId, value) {
        this.map.set(vendorId, value);
        /**
         * if the max vendor id isn't set yet (ie. this is the first vendor added),
         * then set it to this id.  Otherwise, check if it's a higher number than
         * the previous max.
         */
        if (!this.maxVendorId || vendorId > this.maxVendorId) {
            this.maxVendorId = vendorId;
        }
    }
    ;
    /**
     * getVendor -- returns value set previously by setVendor
     *
     * @param {number} vendorId - id of the vendor from the GVL
     * @return {boolean | PurposeRestriction}
     */
    getVendor(vendorId) {
        return this.map.get(vendorId);
    }
    ;
    /**
     * getMaxVendorId -- gets the maxVendorId
     *
     * @return {number} -- Whatever the highest number vendor id that was set was.
     */
    getMaxVendorId() {
        return this.maxVendorId;
    }
    ;
}
export { VendorVector };
