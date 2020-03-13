import {CmpApiModel} from '../CmpApiModel';
import {Command} from './Command';
import {GVL, TCModel} from '@iabtcf/core';
import {VendorListCallback} from '../callback';

/**
 * Gets a version of the Global Vendors List
 */
export class GetVendorListCommand extends Command {

  protected success(): void {

    let gvl: GVL;
    const callback = this.callback as VendorListCallback;

    if (!this.param) {

      const tcModel = CmpApiModel.tcModel as TCModel;

      if (tcModel.gvl) {

        callback(tcModel.gvl.getJson(), true);

      } else {

        tcModel.gvl = new GVL(tcModel.vendorListVersion);
        tcModel.gvl.readyPromise.then(() => {

          callback(tcModel.gvl.getJson(), true);

        }, this.fail).catch(this.fail);

      }

    } else {

      gvl = new GVL(this.param);

      const woops = (): void => {

        this.fail();

      };

      gvl.readyPromise.then(() => {

        callback(gvl.getJson(), true);

      }, woops).catch(woops);

    }

  }
  protected isValid(): boolean {

    let retr = true;

    if (this.param !== undefined) {

      if (typeof this.param === 'string' || typeof this.param === 'number') {

        retr = (
          Number.isInteger(+this.param) &&
            +this.param > 0 ||
            this.param === 'LATEST'
        );

      } else {

        retr = false;

      }

    }

    return retr;

  }

}
