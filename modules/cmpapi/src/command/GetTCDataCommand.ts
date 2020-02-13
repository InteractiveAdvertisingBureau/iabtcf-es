import {CmpApiModel} from '../CmpApiModel';
import {Command} from './Command';
import {GVL, TCModel} from '@iabtcf/core';
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

    if (this.isSuccess) {

      this.sendData();

    }

  }

  private sendData(): void {

    const callback = this.callback as TCDataCallback;
    const tcModel = CmpApiModel.tcModel as TCModel;

    if (!tcModel.gvl && !CmpApiModel.tcString) {

      tcModel.gvl = new GVL(tcModel.vendorListVersion);
      tcModel.gvl.readyPromise
        .then(
          (): void => callback(new TCData(this.param, this.listenerId), true),
          this.fail,
        )
        .catch(this.fail);

    } else {

      callback(new TCData(this.param, this.listenerId), true);

    }

  }

  protected success(): void {

    this.isSuccess = true;

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
