import {CallbackFunction, RemoveListenerCallback} from '../../types';
import {CmpLog} from '../../utilities';
import {ValidationUtil} from '../../validation';

/**
 * Callback class wraps a callback function to provide added functionality
 */
export class Callback {

  private readonly _function: CallbackFunction;

  public constructor(callbackFunc: CallbackFunction) {

    this._function = callbackFunc;

  }

  /**
   * Returns the callback function
   */
  public get function(): CallbackFunction {

    return this._function;

  }

  /**
   * Returns true if the callback function is a valid function
   */
  public get isValid(): boolean {

    return ValidationUtil.isFunction(this._function);

  }

  /**
   * Attempts to evoke the callback function with failing parameters and logs any messages with it if provided.
   * @param {string[] | string} messages
   * @return {void}
   */
  public fail(messages?: string[] | string): void {

    if (messages) {

      if (ValidationUtil.isArray(messages)) {

        CmpLog.error(`Errors: ${(messages as string[]).join(', ')}`);

      } else {

        CmpLog.error(messages as string);

      }

    }

    if (ValidationUtil.isFunction(this._function)) {

      try {

        /**
         * Todo: need to figure this out
         */
        this._function(null, false);

      } catch (e) {

        (this._function as RemoveListenerCallback)(false);

      }

    }

  }

}
