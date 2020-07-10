import {Command} from './Command';
import {TCData} from '../response';

export class GetTCDataCommand extends Command {

  protected async getResponse(): Promise<TCData> {

    this.throwIfParamInvalid();
    return new TCData(this.param, this.listenerId);

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
