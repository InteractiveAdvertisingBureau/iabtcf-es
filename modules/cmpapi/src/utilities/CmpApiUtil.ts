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

    // Todo: do something with the message
    // console.error(msg);

  }
}
