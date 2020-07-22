import {Cloneable} from '../Cloneable';
import {TCModelError} from '../errors';
import {IntMap} from './IntMap';

type SingleIDOrCollection = number | number[] | IntMap<unknown> | Set<number | string>;
export type IdBoolTuple = [number, boolean];

/**
 * Vector class is like a Set except it keeps track of a max id
 */
class Vector extends Cloneable<Vector> implements Iterable<IdBoolTuple> {

  /**
   * if this originatd from an encoded string we'll need a place to store the
   * bit length; it can be set and got from here
   */
  public bitLength = 0;
  private maxId_ = 0;
  /**
   * keep a set for faster lookup
   */
  private set_: Set<number> = new Set<number>();

  public* [Symbol.iterator](): Iterator<IdBoolTuple> {

    for (let i = 1; i <= this.maxId; i++) {

      yield [i, this.has(i)] as IdBoolTuple;

    }

  }

  /**
   * maxId
   *
   * @return {number} - the highest id in this Vector
   */
  public get maxId(): number {

    return this.maxId_;

  }

  /**
   * get
   *
   * @param {number} id - key for value to check
   * @return {boolean} - value of that key, if never set it will be false
   */
  public has(id: number): boolean {

    /**
     * if it exists in the set we'll return true
     */
    return this.set_.has(id);

  }
  /**
   * unset
   *
   * @param {SingleIDOrCollection} id - id or ids to unset
   * @return {void}
   */
  public unset(id: SingleIDOrCollection): void {

    if (Array.isArray(id)) {

      id.forEach((id): void => this.unset(id));

    } else if (typeof id === 'object') {

      this.unset(Object.keys(id).map((strId: string): number => +strId));

    } else {

      this.set_.delete(id);

      /**
       * if bitLength was set before, it must now be unset
       */
      this.bitLength = 0;

      if (id === this.maxId) {

        /**
         * aww bummer we lost our maxId... now we've got to search through
         * all the ids and find the biggest one.
         */
        this.maxId_ = 0;

        for (const id of this.set_) {

          this.maxId_ = Math.max(this.maxId_, id);

        }

      }

    }

  }

  private isIntMap<T>(item: unknown): item is IntMap<T> {

    if (typeof item === 'object') {

      for (const key of Object.keys(item)) {

        if (!this.isValidNumber(item[key].id) || item[key].name === undefined){

          return false;

        }
  
      }

      return true;

    }

    return false;

  }

  private isValidNumber(item: unknown): item is number {

    return typeof item === 'number' && item > 0;

  }

  private isSet(item: unknown): item is Set<number> {

    if (item instanceof Set) {

      for (const entry of item) {
        
        if (!this.isValidNumber(entry)) {

          return false;

        }

      }
      
      return true;

    }

    return false;

  }

  /**
   * set - sets an item assumed to be a truthy value by its presence
   *
   * @param {SingleIDOrCollection} item - May be a single id (positive integer)
   * or collection of ids in a set, GVL Int Map, or Array.
   *
   * @return {void}
   */
  public set(item: SingleIDOrCollection): void {

    /**
     * strategy here is to just recursively call set if it's a collection until
     * we get to the final integer ID
     */

    if (Array.isArray(item)) {

      item.forEach((item): void => this.set(item));

    } else if (this.isSet(item)) {

      this.set(Array.from(item));

    } else if (this.isIntMap(item)) {

      this.set(Object.keys(item).map((strId: string): number => +strId));

    } else if (this.isValidNumber(item)) {

      this.set_.add(item);
      this.maxId_ = Math.max(this.maxId, item);

      /**
       * if bitLength was set before, it must now be unset
       */
      this.bitLength = 0;

    } else {

      /**
       * Super not cool to try and set something that's not valid
       */
      throw new TCModelError('set()', item, 'must be positive integer array, positive integer, Set<number>, or IntMap');

    }

  }

  public empty(): void {

    this.set_.clear();

  }

  /**
   * forEach - to traverse from id=1 to id=maxId in a sequential non-sparse manner
   *
   *
   * @param {forEachCallback} callback - callback to execute
   * @return {void}
   *
   * @callback forEachCallback
   * @param {boolean} value - whether or not this id exists in the vector
   * @param {number} id - the id number of the current iteration
   */
  public forEach(callback: (value: boolean, id: number) => void): void {

    for (const kvp of this) {

      callback(kvp[1], kvp[0]);

    }

  }

  public get size(): number {

    return this.set_.size;

  }

  public setAll<T>(intMap: IntMap<T>): void {

    this.set(intMap);

  }

}

export {Vector};
