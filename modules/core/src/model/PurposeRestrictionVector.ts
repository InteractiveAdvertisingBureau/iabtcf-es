import {PurposeRestriction} from './PurposeRestriction';
import {BinarySearchTree} from './BinarySearchTree';
interface PRMap {
  [hash: string]: BinarySearchTree;
}
export class PurposeRestrictionVector {

  /**
   * a map indexed by a string which will be a 'hash' of the purpose and
   * restriction type.  The number array will be the ordered vendor ids that
   * are restricted
   */
  private map: PRMap = {};;
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

    return (this.map[hash] !== undefined);

  }

  public add(vendorId: number, purposeRestriction: PurposeRestriction): void {

    const hash: string = this.makeHash(purposeRestriction);

    if (!this.has(hash)) {

      this.map[hash] = new BinarySearchTree();


    }
    this.map[hash].add(vendorId);

  }
  public getVendors(purposeRestriction: PurposeRestriction): number[] {

    const hash: string = this.makeHash(purposeRestriction);

    return this.has(hash) ? this.map[hash].get() : [];

  }
  public getRestriction(vendorId: number): PurposeRestriction[] {

    const retr: PurposeRestriction[] = [];
    const hashes: string[] = Object.keys(this.map);


    hashes.forEach((hash: string): void => {

      const bst: BinarySearchTree = this.map[hash];

      if (bst.contains(vendorId)) {

        retr.push(this.unHash(hash));

      }

    });

    return retr;

  }
  public getMax(purposeRestriction: PurposeRestriction): number | undefined {

    const hash: string = this.makeHash(purposeRestriction);
    const bst: BinarySearchTree = this.map[hash];

    return bst ? bst.max() : undefined;

  }
  public getMin(purposeRestriction: PurposeRestriction): number | undefined {

    const hash: string = this.makeHash(purposeRestriction);
    const bst: BinarySearchTree = this.map[hash];

    return bst ? bst.min() : undefined;

  }
  public forEach(purposeRestriction: PurposeRestriction, callback: (vendorId: number) => {}): void {

    const hash: string = this.makeHash(purposeRestriction);
    const ids: number[] = this.map[hash].get() || [];

    ids.forEach(callback);

  }

  public remove(vendorId: number, purposeRestriction: PurposeRestriction): void {

    const hash: string = this.makeHash(purposeRestriction);
    const bst: BinarySearchTree = this.map[hash];

    if (bst) {

      bst.remove(vendorId);

      // if it's empty let's delete the key so it doesn't show up empty
      if (bst.isEmpty()) {

        delete this.map[hash];

      }

    }

  }

}
