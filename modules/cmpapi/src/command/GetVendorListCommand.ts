import {CmpApiModel} from '../CmpApiModel';
import {Command} from './Command';
import {GVL, VendorList} from '@iabtcf/core';

/**
 * Gets a version of the Global Vendors List
 */
export class GetVendorListCommand extends Command {

  protected async getResponse(): Promise<VendorList | null> {

    const tcModel = CmpApiModel.tcModel;
    const tcModelVersion = tcModel.vendorListVersion;
    let gvl: GVL;

    if (this.param === undefined) {

      this.param = tcModelVersion;

    }

    if (this.param === tcModelVersion && tcModel.gvl) {

      gvl = tcModel.gvl;

    } else {

      gvl = new GVL(this.param);

    }

    await gvl.readyPromise;

    return gvl.getJson();

  }

}
