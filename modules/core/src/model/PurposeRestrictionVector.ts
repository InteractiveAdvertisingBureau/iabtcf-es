import {PurposeRestriction} from './PurposeRestriction';
import {BinarySearchTree} from './BinarySearchTree';
export class PurposeRestrictionVector {

  /**
   * a map indexed by a string which will be a 'hash' of the purpose and
   * restriction type.
   *
   * You may be wondering, why would we use a data structure like a
   * BinarySearchTree to store the vendors?  What's that, you don't care? Well,
   * I'll tell you anyway!  In the event that a publisher restricts all vendor
   * purposes in the same way and the entire GVL is showing, with the inclusion
   * of Google there is potentially 2k+ vendors on the list.  If that is true,
   * sorting the list so that it can be encoded properly will require O(n log
   * n) operations.  To find a vendor to remove could be O(n log n) if the list
   * isn't kept sorted.  With a tree we can do all operations in O(log n), for
   * a list of 2048 vendors it will take no more than 11 operations to do
   * anything.  An O(n log n) operation would be n times larger than that, on
   * 2048 vendors 22,528 operations -- of course assuming that the list was
   * sorted at the end.
   */
  private map: Map<string, BinarySearchTree> = new Map<string, BinarySearchTree>();

  private has(hash: string): boolean {

    return this.map.has(hash);

  }

  public add(vendorId: number, purposeRestriction: PurposeRestriction): void {

    const hash: string = purposeRestriction.hash;

    if (!this.has(hash)) {

      this.map.set(hash, new BinarySearchTree());


    }
    (this.map.get(hash) as BinarySearchTree).add(vendorId);

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
  public isEmpty(): boolean {

    return this.map.size === 0;

  };
  public get numRestrictions(): number {

    return this.map.size;

  }

}
