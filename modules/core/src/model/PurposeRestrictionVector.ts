import {PurposeRestriction} from './PurposeRestriction';
import {BinarySearchTree} from './BinarySearchTree';
export class PurposeRestrictionVector {

  /**
   * a map indexed by a string which will be a 'hash' of the purpose and
   * restriction type.  The number array will be the ordered vendor ids that
   * are restricted
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

  public getRestrictions(vendorId: number): PurposeRestriction[] {

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

  public getMaxVendor(purposeRestriction: PurposeRestriction): number | undefined {

    const bst: BinarySearchTree | undefined = this.map.get(purposeRestriction.hash);

    return bst ? bst.max() : undefined;

  }

  public getMinVendor(purposeRestriction: PurposeRestriction): number | undefined {

    const bst: BinarySearchTree | undefined = this.map.get(purposeRestriction.hash);

    return bst ? bst.min() : undefined;

  }

  public forEach(purposeRestriction: PurposeRestriction, callback: (vendorId: number) => void): void {

    const bst: BinarySearchTree = (this.map.get(purposeRestriction.hash) as BinarySearchTree);
    const ids: number[] = (bst) ? bst.get() : [];

    ids.forEach(callback);

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
