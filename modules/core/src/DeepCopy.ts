import {Cloneable, isCloneable} from './Cloneable';
import {PurposeRestriction, PurposeRestrictionVector} from './model';

export abstract class DeepCopy<T> {

  public abstract clone(): T;

  protected deepCopyObject<T>(target: T, destination: T): T {

    if (target === null) {

      destination = target;
      return destination;

    }

    if (this === target as unknown) {

      /**
       * We are calling this on our selves, destination should be a new T, just copy the fields and return
       */

      return this.copyObjectFields(target, destination);

    }

    if (isCloneable(target as unknown as Cloneable<T>)) {

      destination = (target as unknown as Cloneable<T>).clone();

      return destination;

    }

    /**
     * Go through type checking to build up the copy
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cp = [] as any[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-function-return-type
      (target as any[]).forEach((v) => {

        cp.push(v);

      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      destination = cp.map((n: any) => this.deepCopyObject<any>(n, {})) as any;
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
      (target as Map<any, any>).forEach((v) => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cp[v](this.deepCopyObject<any>(v, {}));

      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      destination = cp as any;
      return destination;

    }

    /**
     * Class and their corresponding constructor arguments
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const classTypesAndArgs: [any, any[]][] = [
      [PurposeRestrictionVector, [undefined]],
      [PurposeRestriction, [undefined]],
    ];

    for (let t = 0; t < classTypesAndArgs.length; t++) {

      /**
       * Loop through class types and try to create one if possible
       */

      if (target instanceof classTypesAndArgs[t][0]) {

        /**
         * Create an instance of this type and assign to destination. But,
         * do not return as we fall through and let the object check assign fields
         */

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        destination = new classTypesAndArgs[t][0](...classTypesAndArgs[t][1]) as any;
        break;

      }

    }

    if (typeof target === 'object' && target !== {}) {

      return this.copyObjectFields(target, destination);

    }

    /**
     * The target is a primitive
     */

    destination = target;
    return destination;

  };

  private copyObjectFields(target, destination) {

    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion,@typescript-eslint/no-explicit-any
    const cp = {...(target as { [key: string]: any })} as { [key: string]: any };
    Object.keys(cp).forEach((k) => {

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      destination[k] = this.deepCopyObject<any>(cp[k], {});

    });
    return destination;

  }

}
