import { PurposeRestriction } from './PurposeRestriction';
declare class VendorVector {
    private map;
    private maxVendorId;
    constructor();
    /**
     * setVendor -- sets a vendor value in this vector.  A value may be a simple
     * boolean or in the case of publisher restrictions it could be two integers
     *
     * @param {number} vendorId - id of the vendor from the GVL
     * @param {boolean|PurposeRestriction} value - either boolean value or the
     * publisher restriciton type which is two numbers
     * @return {void}
     */
    setVendor(vendorId: number, value: boolean | PurposeRestriction): void;
    /**
     * getVendor -- returns value set previously by setVendor
     *
     * @param {number} vendorId - id of the vendor from the GVL
     * @return {boolean | PurposeRestriction}
     */
    getVendor(vendorId: number): boolean | PurposeRestriction | undefined;
    /**
     * getMaxVendorId -- gets the maxVendorId
     *
     * @return {number} -- Whatever the highest number vendor id that was set was.
     */
    getMaxVendorId(): number;
}
export { VendorVector };
