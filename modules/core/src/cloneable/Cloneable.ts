import {AnyArray} from './AnyArray';
import {AnyConstructor} from './AnyConstructor';

/**
 * Abstract Class Cloneable<T> can be extended to give the child class the ability to clone its self.
 * The child class must pass its class to super. You can then pass any needed arguments to help build
 * the cloned class to the protected _clone() method.
 *
 * Example:
 *
 * class Example extends Cloneable<Example> {
 *
 *  public constructor() {
 *    super(Example);
 *  }
 *
 *  public clone(): Example {
 *    // if you have arguments that must be passed to constructor, pass them here.
 *    return this._clone();
 *   }
 * }
 * Todo: There must be more non primitive build in types to check. But for our current purposes, this works great.
 */
export abstract class Cloneable<T> {

  /**
   * Child class must implement the clone() method
   */
  public abstract clone(): T;

  /**
   * Child class's constructor value
   */
  private readonly childConstructor: AnyConstructor<T>;

  /**
   * Constructor
   * @param {AnyConstructor<T>} childConstructor
   */
  protected constructor(childConstructor: AnyConstructor<T>) {

    this.childConstructor = childConstructor;

  }

  /**
   * Method to be called in the child concrete class's clone method
   * @param {AnyArray} constructorArgs - arguments to be passed to the cloned objects constructor if need be
   * @private
   * @return {T}
   */
  protected _clone(...constructorArgs: AnyArray): T {

    /**
     * Create an instance of child class and copy its fields
     */

    const concreteChildCopy: T = new this.childConstructor(...constructorArgs);

    return this.deepCopyObject<T>(this as unknown as T, concreteChildCopy);

  }

  /**
   * Method copies the target object's fields to the destination object.
   * It is called recursively over the target objects fields to copy its data.
   * @param {T} target
   * @param {T} destination
   * @return {T}
   */
  private deepCopyObject<T>(target: T, destination: T): T {

    if (this.isPrimitive(target)) {

      /**
       * If target is a primitive, just return it
       */

      return target;

    }

    if (this === target as unknown) {

      /**
       * We are calling this on our selves, destination should be a new T, just copy the fields and return.
       * This check is also IMPORTANT not to cause infinite recursion.
       */

      return this.copyObjectFields(target, destination);

    } else {

      if (target instanceof Cloneable) {

        /**
         * The target extends our Cloneable class. Nice. Just call clone() and return it.
         */

        destination = target.clone();
        return destination;

      }

      /**
       * Go through type checking to build up the copy
       * Todo: we may need more types
       */

      if (target instanceof Promise) {

        // Todo: ----------------------- Not sure if this is what we want.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        destination = target;
        return destination;

      }

      if (target instanceof Date) {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        destination = new Date(target.getTime()) as any;
        return destination;

      }

      if (target instanceof Array) {

        const cp = [] as AnyArray;
        (target as AnyArray).forEach((v): void => {

          cp.push(v);

        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        destination = cp.map((n: any): any => this.deepCopyObject<any>(n, {})) as any;
        return destination;

      }

      if (target instanceof Set) {

        const cp = new Set();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-function-return-type
        (target as Set<any>).forEach((v) => {

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cp.add(this.deepCopyObject<any>(v, {}));

        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        destination = cp as any;
        return destination;

      }

      if (target instanceof Map) {

        const cp = new Map();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-function-return-type
        (target as Map<any, any>).forEach((v, k) => {

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cp.set(k, this.deepCopyObject<any>(v, {}));

        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        destination = cp as any;
        return destination;

      }

      if (typeof target === 'object' && target !== {}) {

        return this.copyObjectFields(target, destination);

      }

    }

    destination = target;
    return destination;

  };

  /**
   * Copy's the target objects field to the destination object and returns it.
   * @param {A} target
   * @param {A} destination
   * @return {A}
   */
  private copyObjectFields<A>(target: A, destination: A): A {

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion,@typescript-eslint/no-explicit-any
    const cp = {...(target as { [key: string]: any })} as { [key: string]: any };
    Object.keys(cp).forEach((k): void => {

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      destination[k] = this.deepCopyObject<any>(cp[k], {});

    });
    return destination;

  }

  /**
   * Tests is a value is a primitive
   * @param {unknown} value
   * @return {boolean}
   */
  private isPrimitive(value: unknown): boolean {

    return (value !== Object(value));

  };

}
