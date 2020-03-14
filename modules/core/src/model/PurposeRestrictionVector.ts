import {PurposeRestriction} from './PurposeRestriction';
import {BinarySearchTree} from './BinarySearchTree';
import {RestrictionType} from './RestrictionType';
import {GVL} from '../GVL';
import {Vendor} from './gvl/Vendor';
import {Cloneable} from '../Cloneable';

export class PurposeRestrictionVector extends Cloneable<PurposeRestrictionVector> {

  /**
   * if this originatd from an encoded string we'll need a place to store the
   * bit length; it can be set and got from here
   */
  public bitLength = 0;

  /**
   * a map indexed by a string which will be a 'hash' of the purpose and
   * restriction type.
   *
   * Using a BST to keep vendors in a sorted order for encoding later
   */
  private map: Map<string, BinarySearchTree> = new Map<string, BinarySearchTree>();
  private gvl_: GVL;

  private has(hash: string): boolean {

    return this.map.has(hash);

  }

  private isOkToHave(restrictionType: RestrictionType, purposeId: number, vendorId: number): boolean {

    const vIDStr: string = vendorId.toString();

    /**
     * without a gvl set, there's no way to know... in that case we'll return
     * true but once the GVL is set later we'll go through these and clean up
     * the mess.
     */
    if (this.gvl) {

      if (this.gvl.vendors && this.gvl.vendors[vIDStr]) {

        const vendor: Vendor = this.gvl.vendors[vIDStr];

        if (vendor.flexiblePurposes) {

          switch (restrictionType) {

            case RestrictionType.NOT_ALLOWED:
              return (vendor.legIntPurposes.includes(purposeId) || vendor.purposes.includes(purposeId));

            case RestrictionType.REQUIRE_CONSENT:
              return (vendor.flexiblePurposes.includes(purposeId) && vendor.legIntPurposes.includes(purposeId));

            case RestrictionType.REQUIRE_LI:
              return (vendor.flexiblePurposes.includes(purposeId) && vendor.purposes.includes(purposeId));

            default:
              // if we made it here, they passed something strange for the
              // restriction type so we ain't gonna add it
              return false;

          }

        } else if (restrictionType === RestrictionType.NOT_ALLOWED) {

          /**
           * if it's "not allowed" we don't care about flexible basis but if
           * they don't even list it, no reason to encode the value so we check
           * both arrays to see if it exists
           */
          return (vendor.legIntPurposes.includes(purposeId) || vendor.purposes.includes(purposeId));

        }

      } else {

        // this vendor doesn't exist
        return false;

      }

    }

    // if the gvl isn't defined, we can't do anything until later
    return true;

  }

  /**
   * add - adds a given Vendor ID under a given Purpose Restriction
   *
   * @param {number} vendorId
   * @param {PurposeRestriction} purposeRestriction
   * @return {void}
   */
  public add(vendorId: number, purposeRestriction: PurposeRestriction): void {

    if (this.isOkToHave(purposeRestriction.restrictionType, purposeRestriction.purposeId, vendorId)) {

      const hash: string = purposeRestriction.hash;

      if (!this.has(hash)) {

        this.map.set(hash, new BinarySearchTree());
        this.bitLength = 0;

      }

      const currentRestrictions = this.getRestrictions(vendorId);
      currentRestrictions.forEach((curRestriction: PurposeRestriction): void => {

        /**
         * if this vendor is already restricted under this purpose they can only
         * be restricted in one way so we'll remove them from the other one.
         * It's a last value wins result
         */
        if (curRestriction.purposeId === purposeRestriction.purposeId) {

          this.remove(vendorId, curRestriction);

        }

      });

      (this.map.get(hash) as BinarySearchTree).add(vendorId);

    }

  }

  /**
   * getVendors - returns array of vendor ids optionally narrowed by a given
   * Purpose Restriction.  If no purpose restriction is passed then all vendor
   * ids will be returned.  One can expect this result to be a unique set of
   * ids no duplicates.
   *
   * @param {PurposeRestriction} [purposeRestriction] - optionally passed to
   * get only Vendor IDs restricted under the given Purpose Restriction
   * @return {number[]} - Unique ID set of vendors
   */
  public getVendors(purposeRestriction?: PurposeRestriction): number[] {

    let vendorIds: number[] = [];

    if (purposeRestriction) {

      const hash: string = purposeRestriction.hash;

      if (this.has(hash)) {

        vendorIds = (this.map.get(hash) as BinarySearchTree).get();

      }

    } else {

      const vendorSet = new Set<number>();

      this.map.forEach((bst: BinarySearchTree): void => {

        bst.get().forEach((vendorId: number): void => {

          vendorSet.add(vendorId);

        });

      });

      vendorIds = Array.from(vendorSet);

    }

    return vendorIds;

  }

  public getRestrictionType(vendorId: number, purposeId: number): RestrictionType | undefined {

    let rType: RestrictionType;

    this.getRestrictions(vendorId).forEach((purposeRestriction: PurposeRestriction): void => {

      if (purposeRestriction.purposeId === purposeId) {

        if (rType === undefined || rType > purposeRestriction.restrictionType) {

          rType = purposeRestriction.restrictionType;

        }

      }

    });

    return rType;

  }

  /**
   * vendorHasRestriction - determines whether a given Vendor ID is under a
   * given Purpose Restriction
   *
   * @param {number} vendorId
   * @param {PurposeRestriction} purposeRestriction
   * @return {boolean} - true if the give Vendor ID is under the given Purpose
   * Restriction
   */
  public vendorHasRestriction(vendorId: number, purposeRestriction: PurposeRestriction): boolean {

    let has = false;
    const restrictions = this.getRestrictions(vendorId);

    for (let i = 0; i < restrictions.length && !has; i++) {

      has = purposeRestriction.isSameAs(restrictions[i]);

    }

    return has;

  }

  /**
   * getMaxVendorId - gets the Maximum Vendor ID regardless of Purpose
   * Restriction
   *
   * @return {number} - maximum Vendor ID
   */
  public getMaxVendorId(): number {

    let retr = 0;

    this.map.forEach((bst: BinarySearchTree): void => {

      retr = Math.max(bst.max(), retr);

    });

    return retr;

  }

  public getRestrictions(vendorId?: number): PurposeRestriction[] {

    const retr: PurposeRestriction[] = [];

    this.map.forEach((bst: BinarySearchTree, hash: string): void => {

      if (vendorId) {

        if (bst.contains(vendorId)) {

          retr.push(PurposeRestriction.unHash(hash));

        }

      } else {

        retr.push(PurposeRestriction.unHash(hash));

      }

    });

    return retr;

  }

  public getPurposes(): number[] {

    const purposeIds = new Set<number>();

    this.map.forEach((bst: BinarySearchTree, hash: string): void => {

      purposeIds.add(PurposeRestriction.unHash(hash).purposeId);

    });

    return Array.from(purposeIds);

  }

  /**
   * remove - removes Vendor ID from a Purpose Restriction
   *
   * @param {number} vendorId
   * @param {PurposeRestriction} purposeRestriction
   * @return {void}
   */
  public remove(vendorId: number, purposeRestriction: PurposeRestriction): void {

    const hash: string = purposeRestriction.hash;
    const bst: BinarySearchTree | undefined = this.map.get(hash);

    if (bst) {

      bst.remove(vendorId);

      // if it's empty let's delete the key so it doesn't show up empty
      if (bst.isEmpty()) {

        this.map.delete(hash);
        this.bitLength = 0;

      }

    }

  }

  /**
   * Essential for being able to determine whether we can actually set a
   * purpose restriction since they have to have a flexible legal basis
   *
   * @param {GVL} value - the GVL instance
   */
  public set gvl(value: GVL) {

    if (!this.gvl_) {

      this.gvl_ = value;

      /**
       * if we have restrictions set before the gvl is set then we'll have to
       * go through and remove some if they're not valid
       */
      if (this.numRestrictions) {

        this.map.forEach((bst: BinarySearchTree, hash: string): void => {

          const purposeRestriction: PurposeRestriction = PurposeRestriction.unHash(hash);
          const vendors: number[] = bst.get();

          vendors.forEach((vendorId: number): void => {

            if (!this.isOkToHave(purposeRestriction.restrictionType, purposeRestriction.purposeId, vendorId)) {

              bst.remove(vendorId);

            }

          });

        });

      }

    }

  }

  /**
   * gvl returns local copy of the GVL these restrictions apply to
   *
   * @return {GVL}
   */
  public get gvl(): GVL {

    return this.gvl_;

  }

  /**
   * isEmpty - whether or not this vector has any restrictions in it
   *
   * @return {boolean}
   */
  public isEmpty(): boolean {

    return this.map.size === 0;

  };

  /**
   * isEncodable - The Vector will add restrictions even if they are not
   * allowed by the GVL until it can verify that the GVL permits them to be
   * added. This check determines if Vector is ready to be encoded. Another
   * case is that this vector is empty and does not need a GVL instance
   * because there's nothing to check.
   *
   * @return {boolean}
   */
  public isEncodable(): boolean {

    return (this.gvl_ !== undefined && !this.isEmpty());

  }

  /**
   * numRestrictions - returns the number of Purpose Restrictions.
   *
   * @return {number}
   */
  public get numRestrictions(): number {

    return this.map.size;

  }

}
