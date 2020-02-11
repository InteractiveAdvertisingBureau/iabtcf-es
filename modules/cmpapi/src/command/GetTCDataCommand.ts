import {CmpApiModel} from '../CmpApiModel';
import {Command} from './Command';
import {GVL, TCModel} from '@iabtcf/core';
import {PolyFill} from '@iabtcf/util';
import {TCDataCallback, Callback} from '../callback';
import {TCData} from '../response';

export class GetTCDataCommand extends Command {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(callback: Callback, param?: any) {

    super(callback, param);

    new PolyFill();

  }

  protected success(): void {

    const callback = this.callback as TCDataCallback;
    const tcModel = CmpApiModel.tcModel as TCModel;

    if (!tcModel.gvl && !CmpApiModel.tcString) {

      tcModel.gvl = new GVL(tcModel.vendorListVersion);
      tcModel.gvl.readyPromise
        .then(
          (): void => callback(new TCData(this.param), true),
          this.fail,
        )
        .catch(this.fail);

    } else {

      callback(new TCData(this.param), true);

    }

  }

  protected isValid(): boolean {

    // start with this... if it doesn't apply then they get nothing
    let retr = CmpApiModel.gdprApplies;

    // if the array is undefined, then we're good
    if ( retr && this.param !== undefined) {

      // if the array is not undefined and is an array of integers
      retr = Array.isArray(this.param);
      retr = (retr && this.param.every((item: number): boolean => Number.isInteger(item)));

    }

    return retr;

  }

}
