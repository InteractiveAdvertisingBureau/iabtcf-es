import {GetTCDataCommand} from './GetTCDataCommand';
import {TCDataCallback} from '../callback';
import {CmpApiModel} from '../CmpApiModel';

export class AddEventListenerCommand extends GetTCDataCommand {

  protected success(): void {

    CmpApiModel.eventQueue.add(this.callback as TCDataCallback);

    if (CmpApiModel.tcModel) {

      new GetTCDataCommand(this.callback);

    }

  }

}
