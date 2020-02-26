import {CmpApiModel} from '../CmpApiModel';
import {Command} from './Command';
import {GVL} from '@iabtcf/core';
import {PolyFill} from '@iabtcf/util';
import {TCDataCallback, Callback} from '../callback';
import {TCData} from '../response';

export class GetTCDataCommand extends Command {

  private listenerId: number;
  private isSuccess: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(callback: Callback, param?: any, listenerId?: number) {

    super(callback, param);

    this.listenerId = listenerId;

    new PolyFill();

  }

  /**
   * because the success is an override method and we want to perform some
   * async action, this method is created to proxy that one.
   */
  private async sendData(): Promise<void> {

    const tcModel = CmpApiModel.tcModel;

    /**
     * If the tcModel exists as a TCModel and doesn't have a gvl or a tcString,
     * then we'll need a gvl to create a tcString to return in the TCData
     * object. Otherwise gdpr does not apply and they'll get a sparse object or
     * gdpr does apply but a tcString is set and there is no need to have GVL
     * because the existing tcString can be used.
     */

    if (CmpApiModel.tcModel !== null && !tcModel.gvl && !CmpApiModel.tcString) {

      tcModel.gvl = new GVL(tcModel.vendorListVersion);
      await tcModel.gvl.readyPromise;

    }

    const callback = this.callback as TCDataCallback;
    callback(new TCData(this.param, this.listenerId), true);

  }

  protected success(): void {

    this.sendData();

  }

  protected isValid(): boolean {

    let retr = true;

    /**
     * if they have passed something in as a parameter we'll need to see if
     * it's usable.  If not then we'll need to respond with a fail.
     */
    if (this.param !== undefined) {

      /**
       * Check to see if the array is not undefined and is an array of
       * integers, otherwise it's unusable
       */

      retr = Array.isArray(this.param);
      retr = (retr && this.param.every((item: number): boolean => Number.isInteger(item)));

    }

    return retr;

  }

}
