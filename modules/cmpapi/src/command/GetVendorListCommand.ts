import {GVL} from '@iabtcf/core';
import {CmpData} from '../CmpData';
import {GlobalVendorList} from '../model';
import {Callback, Param, VendorListCallback} from '../types';
import {CmpApiUtil, Constants} from '../utilities';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

/**
 * Gets a version of the Global Vendors List
 */
export class GetVendorListCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  public execute(): void {

    /**
     * Return a clone of the current GVL if no param/version was used. Otherwise, create a new GVL with the
     * specific version.
     */

    const _gvl: GVL = this.param ? new GVL(this.param as string | number) : this.cmpData.tcModel.gvl.clone();

    _gvl.readyPromise.then(() => {

      const gvl = new GlobalVendorList(_gvl);
      this.setBaseReturnFields(gvl);

      (this.callback as VendorListCallback)(gvl, true);

    }, ((reason) => CmpApiUtil.failCallback(this.callback, reason)));

  }

  /**
   * Validates the vendor list was valid and returns the result.
   * Base class validation is also handled.
   * @param validationMessage
   * @param failCallbackIfNotValid
   * @return {boolean}
   */
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
