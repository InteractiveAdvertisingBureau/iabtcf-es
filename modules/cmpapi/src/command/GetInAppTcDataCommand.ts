import {GetTCDataCommand} from './GetTCDataCommand';
import {InAppTCDataCallback} from '../types';
import {InAppTCData} from '../response';

export class GetInAppTCDataCommand extends GetTCDataCommand {

  protected success(): void {

    const callback = this.callback as InAppTCDataCallback;

    callback(new InAppTCData(this.param), true);

  }

}
