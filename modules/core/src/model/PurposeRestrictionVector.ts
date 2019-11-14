import {PurposeRestriction} from './PurposeRestriction';
import {BinarySearchTree} from './BinarySearchTree';
import {RestrictionType} from './RestrictionType';
import {GVL} from '../GVL';
import {Vendor} from './gvl/Vendor';

export class PurposeRestrictionVector {

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
     * without a gvl set, there's no way to know...
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

          }

          // if we made it here, they passed something strange for the
          // restriction type so we ain't gonna add it
          return false;

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

  public add(vendorId: number, purposeRestriction: PurposeRestriction): void {

    if (this.isOkToHave(purposeRestriction.restrictionType, purposeRestriction.purposeId, vendorId)) {

      const hash: string = purposeRestriction.hash;

      if (!this.has(hash)) {

        this.map.set(hash, new BinarySearchTree());

      }

      (this.map.get(hash) as BinarySearchTree).add(vendorId);

    }

  }

  public getVendors(purposeRestriction: PurposeRestriction): number[] {

    const hash: string = purposeRestriction.hash;

    return this.has(hash) ? (this.map.get(hash) as BinarySearchTree).get() : [];

  }

  public getRestriction(vendorId: number): PurposeRestriction[] {

    const retr: PurposeRestriction[] = [];

    this.map.forEach((bst: BinarySearchTree, hash: string): void => {

      if (bst.contains(vendorId)) {

        retr.push(PurposeRestriction.unHash(hash));

      }

    });

    return retr;

  }

  public getAllRestrictions(): PurposeRestriction[] {

    const retr: PurposeRestriction[] = [];

    this.map.forEach((bst: BinarySearchTree, hash: string): void => {

      retr.push(PurposeRestriction.unHash(hash));

    });

    return retr;

  }

  public remove(vendorId: number, purposeRestriction: PurposeRestriction): void {

    const hash: string = purposeRestriction.hash;
    const bst: BinarySearchTree | undefined = this.map.get(hash);

    if (bst) {

      bst.remove(vendorId);

      // if it's empty let's delete the key so it doesn't show up empty
      if (bst.isEmpty()) {

        this.map.delete(hash);

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

  public get gvl(): GVL {

    return this.gvl_;

  }

  public isEmpty(): boolean {

    return this.map.size === 0;

  };
  public isValid(): boolean {

    return this.gvl_ !== undefined;

  }

  public get numRestrictions(): number {

    return this.map.size;

  }

}
