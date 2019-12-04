/**
 * Abstract Class Cloneable<T> can be extended to give the child class the ability to clone its self.
 * The child class must pass its class to super. You can then pass any needed arguments to help build
 * the cloned class to the protected _clone() method.
 *
 * Example:
 *
 * class Example extends Cloneable<Example> {
 *
 * }
 * Todo: There must be more non primitive build in types to check. But for our current purposes, this works great.
 */
export abstract class Cloneable<T> {

  /**
   * clone - returns a copy of the classes with new values and not references
   *
   * @return {T}
   */
  public clone(): T {

    const myClone = new (this.constructor as {new(): T})();
    const keys = Object.keys(this);
    keys.forEach((key: string): void => {

      const value: unknown = this.deepClone(this[key]);

      if (value !== undefined) {

        myClone[key] = value;

      }

    });
    return myClone;

  };

  /**
   * deepClone - recursive function that makes copies of reference values
   *
   * @param {unknown} item
   * @return {unknown}
   */
  private deepClone(item: unknown): unknown {

    const itsType = typeof item;

    if (itsType === 'number' || itsType === 'string' || itsType === 'boolean') {

      return item;

    } else if (item !== null && itsType === 'object') {

      if (typeof (item as Cloneable<unknown>).clone === 'function') {

        return (item as Cloneable<unknown>).clone();

      } else if (item instanceof Date) {

        return new Date(item.getTime());

      } else if ((item as Iterable<unknown>)[Symbol.iterator] !== undefined) {

        const ar: unknown[] = [];

        for (const subItem of item as Iterable<unknown>) {

          ar.push(this.deepClone(subItem));

        }

        if (item instanceof Array) {

          return ar;

        } else {

          return new ((item as Iterable<unknown>).constructor as {new(ar: unknown[])})(ar);

        }

      } else {

        const retr = {};

        for (const prop in item as object) {

          if ((item as object).hasOwnProperty(prop)) {

            retr[prop] = this.deepClone((item as object)[prop]);

          }

        }

        return retr;

      }

    }

    /**
     * ignore functions because those will be initialized with the cloning
     * process
     */

  }

}
