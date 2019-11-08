import {Callback, Param} from '../types';
import {CmpApiUtil, Constants, Validation} from '../utilities';

/**
 * Holds the arguments needed to execute a command
 * Todo: Consider a class, could validate and extend for specific validation
 */
export class CommandArgs {

  protected _command: string;
  protected _version: number;
  protected _versionString: string;
  protected _callback: Callback;
  protected _param?: Param;

  public get command(): string {

    return this._command;

  }

  public get version(): string {

    return this._versionString;

  }

  public get callback(): Callback {

    return this._callback;

  }

  public get param(): Param | undefined {

    return this._param;

  }

  public constructor(command: string, version: number, callback: Callback, param?: Param) {

    this._command = command;
    this._version = version;
    this._callback = callback;
    this._param = param;

  }

  /**
   * Validates that the common parameters used to execute a command are valid.
   * Returns validation message through string ref.
   * If failCallbackIfNotValid is true, the method will call the callback with failed values if not valid.
   * @param {string} validationMessage
   * @param {boolean} failCallbackIfNotValid
   * @return {boolean}
   */
  public validate(validationMessage: string, failCallbackIfNotValid = false): boolean {

    let isValid = true;

    if (isValid && !Validation.isNonEmptyString(this._command)) {

      validationMessage = Constants.COMMAND_INVALID;
      isValid = false;

    }

    if (!(Validation.isIntegerGtrOne(this._version) || this._version === null || this._version === undefined)) {

      validationMessage = `Version ${this._version} ${Constants.NOT_SUPPORTED}`;
      isValid = false;

    }

    if (!Validation.isFunction(this._callback)) {

      validationMessage = Constants.CALLBACK_REQUIRED;
      isValid = false;

    }

    if (!isValid && failCallbackIfNotValid) {

      CmpApiUtil.failCallback(this._callback, validationMessage);

    }

    return isValid;

  }

}
