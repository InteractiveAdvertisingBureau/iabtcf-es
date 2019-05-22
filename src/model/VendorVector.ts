import {PurposeRestriction} from './PurposeRestriction';

class VendorVector {

  private map: Map<number, boolean | PurposeRestriction>;
  private maxVendorId: number;

  public constructor() {

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
  public setVendor(vendorId: number, value: boolean | PurposeRestriction): void {

    this.map.set(vendorId, value);

    /**
     * if the max vendor id isn't set yet (ie. this is the first vendor added),
     * then set it to this id.  Otherwise, check if it's a higher number than
     * the previous max.
     */
    if (!this.maxVendorId || vendorId > this.maxVendorId) {

      this.maxVendorId = vendorId;

    }

  };

  /**
   * getVendor -- returns value set previously by setVendor
   *
   * @param {number} vendorId - id of the vendor from the GVL
   * @return {boolean | PurposeRestriction}
   */
  public getVendor(vendorId: number): boolean | PurposeRestriction {

    return this.map.get(vendorId);

  };

  /**
   * getMaxVendorId -- gets the maxVendorId
   *
   * @return {number} -- Whatever the highest number vendor id that was set was.
   */
  public getMaxVendorId(): number {

    return this.maxVendorId;

  };

}

export {VendorVector};
