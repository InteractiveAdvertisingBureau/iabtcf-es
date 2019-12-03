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
export class Cloneable<T> {

  /**
   * @return {T}
   */
  public clone(): T {

    const myClone = new (this.constructor as {new(): T})();
    const keys = Object.keys(this);
    keys.forEach((key: string): void => {

      const value: unknown = this.cloneRecur(this[key]);

      if (value !== undefined) {

        myClone[key] = value;

      }

    });
    return myClone;

  };

  private cloneRecur(item: unknown): unknown {

    switch (typeof item) {

      case 'function':
        // ignore dat
        break;
      case 'object':
        return this.cloneObject(item as object);
      default:
        return item;

    }

  }

  private cloneObject(item: object): object {

    let retr = {};

    if (item instanceof Date) {

      retr = new Date(item.getTime());

    } else if (item[Symbol.iterator] !== undefined) {

      const ar: unknown[] = [];

      for (const subItem of item as Iterable<unknown>) {

        ar.push(this.cloneRecur(subItem));

      }

      if (item instanceof Array) {

        retr = ar;

      } else {

        retr = new (item.constructor as {new(ar: unknown[])})(ar);

      }

    } else {

      for (const prop in item) {

        if (item.hasOwnProperty(prop)) {

          retr[prop] = this.cloneRecur(item[prop]);

        }

      }

    }

    return retr;

  }

}
