import {Callback, Param, TCDataCallback} from '../../types';
import {CmpApiUtil, Constants, Validation} from '../../utilities';
import {CommandArgs} from './CommandArgs';

export class GetTcDataCommandArgs extends CommandArgs {

  public constructor(command: string, version: number, callback: Callback, param?: Param) {

    super(command, version, callback, param);

  }

  public get callback(): TCDataCallback {

    return this._callback as TCDataCallback;

  }

  public validate(validationMessage: string, failCallbackIfNotValid: boolean = false): boolean {

    if (!this.isVendorsListValid()) {

      validationMessage = Constants.VENDOR_LIST_INVALID;

      if (failCallbackIfNotValid) {

        CmpApiUtil.failCallback(this.callback, validationMessage);

      }

      return false;

    }

    return super.validate(validationMessage, failCallbackIfNotValid);

  }

  /*
  * Validates a vendor id list
  * @vendorIds {number[]} vendorIds
  * @return {boolean}
  */
  private isVendorsListValid(): boolean {

    const vendorIds = this.param as number[];

    if (vendorIds) {

      if (!Validation.isGtrZeroIntegerArray(vendorIds)) {

        return false;

      }

    }

    return true;

  }

}
