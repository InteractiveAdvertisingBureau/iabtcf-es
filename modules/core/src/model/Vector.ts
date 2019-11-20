import {Cloneable} from '../cloneable/Cloneable';
import {TCModelError} from '../errors';

type idOrIds = number | number[];

/**
 * Vector class is like a Set except it keeps track of a max id
 */
class Vector extends Cloneable<Vector> {

  /**
   * if this originatd from an encoded string we'll need a place to store the
   * bit length; it can be set and got from here
   */
  public bitLength: number = 0;
  private maxId_: number = 0;
  /**
   * keep a set for faster lookup
   */
  private set_: Set<number> = new Set<number>();

  /**
   * constructor
   *
   * @param {number[]} ids? - initialized set of `true` values
   * @return {undefined}
   */
  public constructor(ids?: idOrIds) {

    super(Vector);

    if (ids !== undefined) {

      this.set(ids);

    }

  }

  /**
   * Creates a clone of this Vector
   * @return {Vector}
   */
  public clone(): Vector {

    return this._clone();

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
   * @param {idOrIds} id - id or ids to unset
   * @return {void}
   */
  public unset(id: idOrIds): void {

    if (Array.isArray(id)) {

      id.forEach((id): void => this.unset(id));

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
        this.set_.forEach((id: number): void => {

          this.maxId_ = Math.max(this.maxId, id);

        });

      }

    }

  }

  /**
   * set - sets an id assumed to be a truthy value by its presence
   *
   * @param {idOrIds} id - id to set a value for or array of ids to
   * include
   *
   * @return {void}
   */
  public set(id: idOrIds): void {

    if (Array.isArray(id)) {

      id.forEach((id): void => this.set(id));

    } else {

      if (!(Number.isInteger(id) && id > 0)) {

        /**
         * Super not cool to try and set something that's not a positive integer
         */
        throw new TCModelError('set()', id, 'must be positive integer');

      }

      this.set_.add(id);
      this.maxId_ = Math.max(this.maxId, id);
      /**
       * if bitLength was set before, it must now be unset
       */
      this.bitLength = 0;

    }

  }
  public empty(): void {

    this.set_ = new Set<number>();

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

    for (let i = 1; i <= this.maxId; i++) {

      callback(this.has(i), i);

    }

  }

  public get size(): number {

    return this.set_.size;

  }

}
export {Vector};
