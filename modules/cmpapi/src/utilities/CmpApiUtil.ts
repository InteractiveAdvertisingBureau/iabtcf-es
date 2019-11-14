import {GVL, PurposeRestriction, PurposeRestrictionVector, Vector, VendorList} from '@iabtcf/core';
import {Type} from 'typedoc/dist/lib/models';
import {Callback, RemoveListenerCallback} from '../types';
import {Validation} from './Validation';

/**
 * Utility class to encapsulate common functions needed throughout CmpApi
 *
 * Currently on the fence about some of the methods located here.
 */

export abstract class CmpApiUtil {

  /**
   * Executes the callback function with null and false parameters
   * @param {Callback} callback
   * @param {string} message to be logged to console as error
   */
  public static failCallback(callback: Callback, message?: string): void {

    if (message) {

      this.logError(message);

    }

    if (Validation.isFunction(callback)) {

      try {

        /**
         * Todo: need to figure this out
         */
        callback(null, false);

      } catch (e) {

        (callback as RemoveListenerCallback)(false);

      }

    }

  }

  /**
   * Logs an error in the console
   *
   * todo: log to window level array
   *
   * @param {string} msg
   */
  public static logError(msg: string): void {

    console.error(msg);

  }

  /**
   * Copies the target object's data/fields into the destination object
   * @param {T} target
   * @param {T} destination
   * @return {T}
   */
  public static deepCopyObject<T>(target: T, destination: T): T {

    /**
     * Go through type checking to build up the copy
     */

    if (target === null) {

      destination = target;
      return destination;

    }

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
      destination = cp.map((n: any) => CmpApiUtil.deepCopyObject<any>(n, {})) as any;
      return destination;

    }

    if (target instanceof Set) {

      const cp = new Set();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-function-return-type
      (target as Set<any>).forEach((v) => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cp.add(CmpApiUtil.deepCopyObject<any>(v, {}));

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
        cp[v](CmpApiUtil.deepCopyObject<any>(v, {}));

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
      [Vector, [undefined]], [GVL, target instanceof GVL ? [target] : [undefined]],
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

      // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion,@typescript-eslint/no-explicit-any
      const cp = {...(target as { [key: string]: any })} as { [key: string]: any };
      Object.keys(cp).forEach((k) => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        destination[k] = CmpApiUtil.deepCopyObject<any>(cp[k], {});

      });
      return destination;

    }

    /**
     * The target is a primitive
     */

    destination = target;
    return destination;

  };

}
