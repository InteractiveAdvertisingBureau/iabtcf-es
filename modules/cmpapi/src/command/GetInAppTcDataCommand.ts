import {GetTcDataCommand} from './GetTcDataCommand';
import {IATCDataCallback} from '../types';
import {InAppTCData} from '../response';

export class GetInAppTcDataCommand extends GetTcDataCommand {

  protected success(): void {

    const callback = this.callback as IATCDataCallback;

    callback(new InAppTCData(this.param), true);

  }

}
