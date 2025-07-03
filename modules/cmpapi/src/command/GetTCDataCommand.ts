import {Command} from './Command.js';
import {TCData} from '../response/index.js';

export class GetTCDataCommand extends Command {

  protected respond(): void {

    this.throwIfParamInvalid();
    this.invokeCallback(new TCData(this.param, this.listenerId));

  }

  protected throwIfParamInvalid(): void {

    /**
     * if they have passed something in as a parameter we'll need to see if
     * it's usable.  If not then we'll need to throw an error.  Check to see if
     * the array is not undefined and is an array of integers, otherwise it's
     * unusable
     */
    if (this.param !== undefined &&
      (!Array.isArray(this.param) ||
       !this.param.every(Number.isInteger))) {

      throw new Error('Invalid Parameter');

    }

  }

}
