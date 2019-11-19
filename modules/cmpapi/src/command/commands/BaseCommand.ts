import {CmpDataReader} from '../../cmpdata';
import {Return} from '../../model/returned/Return';
import {Param} from '../../types';
import {ValidationMessages, ValidationResult, ValidationUtil} from '../../validation';
import {Callback} from '../callback/Callback';

/**
 * Base command class holds basic command parameters and has functionality to
 * handle basic validation.
 */
export abstract class BaseCommand {

  protected cmpData: CmpDataReader;

  protected command: string;
  protected version: number;
  protected versionString: string;
  protected callback: Callback;
  protected param?: Param;

  protected constructor(cmpData: CmpDataReader, command: string, version: number, callback: Callback, param?: Param) {

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

    returnObj.cmpId = this.cmpData.getCmpId();
    returnObj.cmpVersion = this.cmpData.getCmpVersion();
    returnObj.gdprApplies = this.cmpData.getGdprApplies();
    returnObj.tcfPolicyVersion = this.cmpData.getTcfPolicyVersion();

  }

  /**
   * Validates that the common parameters used to execute a command are valid.
   * If failCallbackIfNotValid is true, the method will call the callback with failed values if not valid.
   * @param {boolean} failCallbackIfNotValid
   * @return {boolean}
   */
  public validate(failCallbackIfNotValid = false): ValidationResult {

    const validationResult: ValidationResult = {
      isValid: true,
      validationMessages: [],
    };

    if (validationResult.isValid && !ValidationUtil.isNonEmptyString(this.command)) {

      validationResult.validationMessages.push(ValidationMessages.COMMAND_INVALID);
      validationResult.isValid = false;

    }

    if (!(ValidationUtil.isIntegerGtrOne(this.version) || this.version === null || this.version === undefined)) {

      validationResult.validationMessages.push(`Version ${this.version} ${ValidationMessages.NOT_SUPPORTED}`);
      validationResult.isValid = false;

    }

    if (!this.callback.isValid) {

      validationResult.validationMessages.push(ValidationMessages.CALLBACK_REQUIRED);
      validationResult.isValid = false;

    }

    if (!validationResult.isValid && failCallbackIfNotValid) {

      this.callback.fail(validationResult.validationMessages);

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

      if (!ValidationUtil.isGtrZeroIntegerArray(vendorIds)) {

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

      return ValidationUtil.isIntegerGtrOne(+this.param) || this.param === 'LATEST';

    }

    return true;

  }

}
