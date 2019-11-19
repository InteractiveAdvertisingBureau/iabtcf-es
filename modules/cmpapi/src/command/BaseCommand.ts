import {CmpData} from '../CmpData';
import {Return} from '../model/returned/Return';
import {Callback, Param} from '../types';
import {CmpApiUtil, Constants, Validation} from '../utilities';
import {ValidationResult} from "../validatable/ValidationResult";

/**
 * Base command class holds basic command parameters and has functionality to
 * handle basic validation.
 */
export abstract class BaseCommand {

  protected cmpData: CmpData;

  protected command: string;
  protected version: number;
  protected versionString: string;
  protected callback: Callback;
  protected param?: Param;

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
  public validate(failCallbackIfNotValid = false): ValidationResult {

    const validationResult: ValidationResult = {
      isValid: true,
      validationMessages: [],
    };

    if (validationResult.isValid && !Validation.isNonEmptyString(this.command)) {

      validationResult.validationMessages.push(Constants.COMMAND_INVALID);
      validationResult.isValid = false;

    }

    if (!(Validation.isIntegerGtrOne(this.version) || this.version === null || this.version === undefined)) {

      validationResult.validationMessages.push(`Version ${this.version} ${Constants.NOT_SUPPORTED}`);
      validationResult.isValid = false;

    }

    if (!Validation.isFunction(this.callback)) {

      validationResult.validationMessages.push(Constants.CALLBACK_REQUIRED);
      validationResult.isValid = false;

    }

    if (!validationResult.isValid && failCallbackIfNotValid) {

      CmpApiUtil.failCallback(this.callback, validationResult.validationMessages);

    }

    return validationResult;

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
