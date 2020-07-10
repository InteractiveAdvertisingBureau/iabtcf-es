import {GetTCDataCommand} from './GetTCDataCommand';
import {InAppTCData} from '../response';

export class GetInAppTCDataCommand extends GetTCDataCommand {

  protected async getResponse(): Promise<InAppTCData> {

    this.throwIfParamInvalid();
    return new InAppTCData(this.param);

  }

}
