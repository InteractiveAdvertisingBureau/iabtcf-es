import {Callback, RemoveListenerCallback} from '../types';
import {ValidationUtil} from '../validation/ValidationUtil';

/**
 * Utility class to encapsulate common functions needed throughout CmpApi
 *
 * Currently on the fence about some of the methods located here.
 */

export abstract class CmpApiUtil {

  /**
   * Executes the callback function with null and false parameters
   * @param {Callback} callback
   * @param {string[] | string} messages to be logged to console as error
   */
  public static failCallback(callback: Callback, messages?: string[] | string): void {

    if (messages) {

      if (ValidationUtil.isArray(messages)) {

        this.logError(`Errors: ${(messages as string[]).join(', ')}`);

      } else {

        this.logError(messages as string);

      }

    }

    if (ValidationUtil.isFunction(callback)) {

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
