import {CmpApiModel} from '../CmpApiModel.js';
import {Command} from './Command.js';
import {GVL} from '@iabtcf/core';

/**
 * Gets a version of the Global Vendors List
 */
export class GetVendorListCommand extends Command {

  protected respond(): void {

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

    gvl.readyPromise.then((): void => {

      this.invokeCallback(gvl.getJson());

    });

  }

}
