import {GetTCDataCommand} from './GetTCDataCommand';
import {CmpApiModel} from '../CmpApiModel';

export class AddEventListenerCommand extends GetTCDataCommand {

  protected async success(): Promise<void> {

    const listenerId = CmpApiModel.eventQueue.add(this.callback);

    if (CmpApiModel.tcModel !== undefined) {

      new GetTCDataCommand(this.callback, undefined, listenerId);

    }

  }

}
