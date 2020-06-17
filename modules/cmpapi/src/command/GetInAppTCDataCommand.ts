import {GetTCDataCommand} from './GetTCDataCommand';
import {InAppTCData} from '../response';

export class GetInAppTCDataCommand extends GetTCDataCommand {

  protected async success(): Promise<void> {

    this.callback(new InAppTCData(this.param), true);

  }

}
