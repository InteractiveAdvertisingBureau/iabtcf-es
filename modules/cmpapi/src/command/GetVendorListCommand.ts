import {CmpApiModel} from '../CmpApiModel';
import {Command} from './Command';
import {GVL} from '@iabtcf/core';
import {VendorListCallback} from '../callback';

/**
 * Gets a version of the Global Vendors List
 */
export class GetVendorListCommand extends Command {

  protected success(): void {

    const callback = this.callback as VendorListCallback;

    if (!this.param) {

      this.param = CmpApiModel.tcModel.vendorListVersion;

    }

    const gvl = new GVL(this.param);

    gvl.readyPromise.then(() => {

      callback(gvl.getJson(), true);

    }, this.fail.bind(this))
      .catch(this.fail.bind(this));

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
