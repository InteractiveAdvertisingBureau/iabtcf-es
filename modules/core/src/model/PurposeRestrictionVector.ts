import {PurposeRestriction} from './PurposeRestriction';
import {BinarySearchTree} from './BinarySearchTree';
export class PurposeRestrictionVector {

  /**
   * a map indexed by a string which will be a 'hash' of the purpose and
   * restriction type.  The number array will be the ordered vendor ids that
   * are restricted
   */
  private map: Map<string, BinarySearchTree> = new Map<string, BinarySearchTree>();
  private hashSeparator: string = '-';
  private makeHash(purposeRestriction: PurposeRestriction): string {

    return `${purposeRestriction.purposeId}${this.hashSeparator}${purposeRestriction.restrictionType}`;

  }
  private unHash(hash: string): PurposeRestriction {

    const splitUp: string[] = hash.split(this.hashSeparator);
    const purpRestriction: PurposeRestriction = new PurposeRestriction();

    purpRestriction.purposeId = parseInt(splitUp[0], 10);
    purpRestriction.restrictionType = parseInt(splitUp[1], 10);

    return purpRestriction;

  }
  private has(hash: string): boolean {

    return this.map.has(hash);

  }

  public add(vendorId: number, purposeRestriction: PurposeRestriction): void {

    const hash: string = this.makeHash(purposeRestriction);

    if (!this.has(hash)) {

      this.map.set(hash, new BinarySearchTree());


    }
    (this.map.get(hash) as BinarySearchTree).add(vendorId);

  }
  public getVendors(purposeRestriction: PurposeRestriction): number[] {

    const hash: string = this.makeHash(purposeRestriction);

    return this.has(hash) ? (this.map.get(hash) as BinarySearchTree).get() : [];

  }
  public getRestriction(vendorId: number): PurposeRestriction[] {

    const retr: PurposeRestriction[] = [];

    this.map.forEach((bst: BinarySearchTree, hash: string): void => {

      if (bst.contains(vendorId)) {

        retr.push(this.unHash(hash));

      }

    });

    return retr;

  }
  public getMaxVendor(purposeRestriction: PurposeRestriction): number | undefined {

    const hash: string = this.makeHash(purposeRestriction);
    const bst: BinarySearchTree | undefined = this.map.get(hash);

    return bst ? bst.max() : undefined;

  }
  public getMinVendor(purposeRestriction: PurposeRestriction): number | undefined {

    const hash: string = this.makeHash(purposeRestriction);
    const bst: BinarySearchTree | undefined = this.map.get(hash);

    return bst ? bst.min() : undefined;

  }
  public forEach(purposeRestriction: PurposeRestriction, callback: (vendorId: number) => {}): void {

    const hash: string = this.makeHash(purposeRestriction);
    const ids: number[] = (this.map.get(hash) as BinarySearchTree).get() || [];

    ids.forEach(callback);

  }

  public remove(vendorId: number, purposeRestriction: PurposeRestriction): void {

    const hash: string = this.makeHash(purposeRestriction);
    const bst: BinarySearchTree | undefined = this.map.get(hash);

    if (bst) {

      bst.remove(vendorId);

      // if it's empty let's delete the key so it doesn't show up empty
      if (bst.isEmpty()) {

        this.map.delete(hash);

      }

    }

  }

}
