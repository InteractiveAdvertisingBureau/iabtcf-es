import {GetTCDataCommand} from './GetTCDataCommand';
import {InAppTCData} from '../response';

export class GetInAppTCDataCommand extends GetTCDataCommand {

  protected respond(): void {

    this.throwIfParamInvalid();
    this.invokeCallback(new InAppTCData(this.param));

  }

}
