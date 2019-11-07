import {Callback} from '../types';

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

      this.error(message);

    }

    callback(null, false);

  }

  /**
   * Logs an error in the console
   * @param {string} msg
   */
  public static error(msg: string): void {

    console.error(msg);

  }

}
