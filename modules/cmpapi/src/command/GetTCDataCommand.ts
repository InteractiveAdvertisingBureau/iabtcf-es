import {Command} from './Command';
import {TCDataCallback} from '../callback';
import {TCData} from '../response';

export class GetTCDataCommand extends Command {

  protected async success(): Promise<void> {

    const callback = this.callback as TCDataCallback;
    callback(new TCData(this.param, this.listenerId), true);

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
