import {CmpData} from '../CmpData';
import {GlobalVendorList} from '../model';
import {VendorListCallback} from '../types';
import {CmpApiUtil, Constants} from '../utilities';
import {Validation} from '../utilities/Validation';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class GetVendorListCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(callback: VendorListCallback, param?: string | number): void {

    const vendorListVersion = param;

    if (vendorListVersion) {

      if (!this.isValidVendorListVersion(vendorListVersion)) {

        CmpApiUtil.failCallback(callback, Constants.VENDOR_LIST_VERSION_INVALID);

      }

    }

    const gvl = new GlobalVendorList(this.cmpData.tcModel, param);
    this.setBaseReturnFields(gvl);

    callback(gvl, true);

  }

  protected isValidVendorListVersion(vendorListVersion: string | number): boolean {

    return Validation.isIntegerGtrOne(+vendorListVersion) || vendorListVersion === 'LATEST';

  }

}
