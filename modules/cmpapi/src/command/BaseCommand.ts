import {CmpData} from '../CmpData';
import {Return} from '../model/returned/Return';
import {Callback, Param} from '../types';
import {CmpApiUtil, Constants, Validation} from '../utilities';

export abstract class BaseCommand {

  protected cmpData: CmpData;

  protected command: string;
  protected version: number;
  protected versionString: string;
  protected callback: Callback;
  protected param?: Param;

  public getCommandString(): string {

    return this.command;

  }

  protected constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    this.cmpData = cmpData;
    this.command = command;
    this.version = version;
    this.callback = callback;
    this.param = param;

  }

  /**
     * Sets all the fields on a Return object using current cmp api data
     * @param {Return} returnObj a Return object
     */
  protected setBaseReturnFields(returnObj: Return): void {

    returnObj.cmpId = this.cmpData.cmpId;
    returnObj.cmpVersion = this.cmpData.cmpVersion;
    returnObj.gdprApplies = this.cmpData.gdprApplies;
    returnObj.tcfPolicyVersion = this.cmpData.tcfPolicyVersion;

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

    if (isValid && !Validation.isNonEmptyString(this.command)) {

      validationMessage = Constants.COMMAND_INVALID;
      isValid = false;

    }

    if (!(Validation.isIntegerGtrOne(this.version) || this.version === null || this.version === undefined)) {

      validationMessage = `Version ${this.version} ${Constants.NOT_SUPPORTED}`;
      isValid = false;

    }

    if (!Validation.isFunction(this.callback)) {

      validationMessage = Constants.CALLBACK_REQUIRED;
      isValid = false;

    }

    if (!isValid && failCallbackIfNotValid) {

      CmpApiUtil.failCallback(this.callback, validationMessage);

    }

    return isValid;

  }

  /*
  * Validates the current vendor id list
  * @vendorIds {number[]} vendorIds
  * @return {boolean}
  */
  protected isVendorsListValid(): boolean {

    const vendorIds = this.param as number[];

    if (vendorIds) {

      if (!Validation.isGtrZeroIntegerArray(vendorIds)) {

        return false;

      }

    }

    return true;

  }

  /**
   * Validates the current vendor list id version
   * @return {boolean}
   */
  protected isValidVendorListVersion(): boolean {

    if (this.param) {

      return Validation.isIntegerGtrOne(+this.param) || this.param === 'LATEST';

    }

    return true;

  }

}
