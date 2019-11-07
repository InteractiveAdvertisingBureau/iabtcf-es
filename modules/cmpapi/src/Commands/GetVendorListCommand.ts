import {CmpData} from '../CmpData';
import {GlobalVendorList} from '../model';
import {VendorListCallback} from '../types';
import {Validation} from '../validation/Validation';
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

        callback(null, false);

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
