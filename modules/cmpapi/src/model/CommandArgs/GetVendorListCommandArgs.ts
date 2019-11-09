import {Callback, Param, VendorListCallback} from '../../types';
import {CmpApiUtil, Constants, Validation} from '../../utilities';
import {CommandArgs} from './CommandArgs';

export class GetVendorListCommandArgs extends CommandArgs {

  public constructor(command: string, version: number, callback: Callback, param?: Param) {

    super(command, version, callback, param);

  }

  public get callback(): VendorListCallback {

    return this._callback as VendorListCallback;

  }

  public validate(validationMessage: string, failCallbackIfNotValid: boolean = false): boolean {

    if (!this.isValidVendorListVersion()) {

      validationMessage = Constants.VENDOR_LIST_VERSION_INVALID;

      if (failCallbackIfNotValid) {

        CmpApiUtil.failCallback(this.callback, validationMessage);

      }

      return false;

    }

    return super.validate(validationMessage, failCallbackIfNotValid);

  }

  protected isValidVendorListVersion(): boolean {

    if (this.param) {

      return Validation.isIntegerGtrOne(+this.param) || this.param === 'LATEST';

    }

    return true;

  }

}
