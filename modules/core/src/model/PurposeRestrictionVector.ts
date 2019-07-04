import {PurposeRestriction} from './PurposeRestriction';
interface PRMap {
  [hash: string]: number[];
}
export class PurposeRestrictionVector {

  /**
   * a map indexed by a string which will be a 'hash' of the purpose and
   * restriction type.  The number array will be the ordered vendor ids that
   * are restricted
   */
  private map: PRMap = {};;
  private hashSeparator: string = '-';
  private makeHash(purposeId: number, restrictionType: number): string {

    return `${purposeId}${this.hashSeparator}${restrictionType}`;

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

    const hash: string = this.makeHash(purposeRestriction.purposeId, purposeRestriction.restrictionType);

    if (this.has(hash)) {

      const ids: number[] | undefined = this.map[hash] || [];

      this.insert(vendorId, ids);

    } else {

      // first one
      this.map[hash] = [vendorId];

    }

  }
  public getVendors(purposeRestriction: PurposeRestriction): number[] {

    const hash: string = this.makeHash(purposeRestriction.purposeId, purposeRestriction.restrictionType);

    if (this.has(hash)) {

      return this.map[hash] || [];

    } else {

      return [];

    }

  }
  /*
  public getRestriction(vendorId: number): PurposeRestriction[] {

    const retr: PurposeRestriction[] = [];

    for (const item of this.map.entries()) {

      if (item[1].includes(vendorId)) {

        retr.push(this.unHash(item[0]));

      }

    }

    return retr;

  }
  */
  public forEach(purposeRestriction: PurposeRestriction, callback: (vendorId: number) => {}): void {

    const hash: string = this.makeHash(purposeRestriction.purposeId, purposeRestriction.restrictionType);
    const ids: number[] = this.map[hash] || [];

    ids.forEach(callback);

  }

  // 29, [33];
  private insert(value: number, arr: number[]): void {

    let left = 0; // 0
    let right = arr.length - 1; // 1

    while (left <= right) {

      const mid = Math.round((left + right)/2);// 0

      if (arr.length === 0) {

        arr.push(value);
        break;

      }
      if (arr[left] > value) {

        arr.splice(left, 0, value);
        break;

      }
      if (arr[right] < value) {

        arr.splice(right + 1, 0, value);
        break;

      }

      if (arr[mid] === value) { // 33

        /**
         * this value exists already in the array -- so no insert
         */
        break;

      } else if (arr[mid] < value) {

        left = mid + 1;

      } else {

        right = mid - 1;

      }


    }

  }

  public remove(vendorId: number, purposeRestriction: PurposeRestriction): void {

    const hash: string = this.makeHash(purposeRestriction.purposeId, purposeRestriction.restrictionType);

    if (this.has(hash)) {

      const ids: number[] | undefined = this.map[hash] || [];

      for (let i = 0; i < ids.length; i ++) {

        if (vendorId === ids[i]) {

          ids.splice(i, 1);
          break;

        }

      }
      if (!ids || ids.length === 0) {

        delete this.map[hash];

      }

    }

  }

}
