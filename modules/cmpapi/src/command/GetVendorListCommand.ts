import {CmpData} from '../CmpData';
import {GlobalVendorList} from '../model';
import {Callback, Param, VendorListCallback} from '../types';
import {CmpApiUtil, Constants} from '../utilities';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class GetVendorListCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  public execute(): void {

    const gvl = new GlobalVendorList(this.cmpData.tcModel, this.param as string | number);
    this.setBaseReturnFields(gvl);

    (this.callback as VendorListCallback)(gvl, true);

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

}
