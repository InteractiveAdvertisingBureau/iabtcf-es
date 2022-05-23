import {GetTCDataCommand} from './GetTCDataCommand.js';
import {InAppTCData} from '../response/index.js';

export class GetInAppTCDataCommand extends GetTCDataCommand {

  protected respond(): void {

    this.throwIfParamInvalid();
    this.invokeCallback(new InAppTCData(this.param));

  }

}
