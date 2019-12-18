import {GVL, TCModel} from '@iabtcf/core';
import {Command} from './Command';
import {VendorListCallback} from '../types';
import {CmpApiModel} from '../CmpApiModel';

/**
 * Gets a version of the Global Vendors List
 */
export class GetVendorListCommand extends Command {

  protected success(): void {

    let gvl: GVL;

    if (!this.param) {

      const tcModel = CmpApiModel.tcModel as TCModel;

      if (tcModel.gvl) {

        gvl = tcModel.gvl.clone();

      } else {

        gvl = new GVL(tcModel.vendorListVersion);

      }

    } else {

      gvl = new GVL(this.param);

    }

    gvl.readyPromise.then(() => {

      const callback = this.callback as VendorListCallback;
      callback(gvl.getJson(), true);

    }, this.fail).catch(this.fail);

  }
  protected isValid(): boolean {

    let retr = true;

    if (this.param !== undefined) {

      retr = (
        Number.isInteger(+this.param) &&
        this.param > 0 ||
        this.param === 'LATEST'
      );

    }

    return retr;

  }

}
