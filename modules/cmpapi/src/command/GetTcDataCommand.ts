import {TCDataCallback} from '../types';
import {CmpApiModel} from '../CmpApiModel';
import {TCData} from '../response';
import {Command} from './Command';

export class GetTCDataCommand extends Command {

  protected success(): void {

    const callback = this.callback as TCDataCallback;

    callback(new TCData(this.param), true);

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
