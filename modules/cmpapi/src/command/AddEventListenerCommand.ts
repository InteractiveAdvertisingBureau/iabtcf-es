import {CmpApiModel} from '../CmpApiModel';
import {GetTCDataCommand} from './GetTCDataCommand';
import {TCData} from '../response/TCData';

export class AddEventListenerCommand extends GetTCDataCommand {

  protected async getResponse(): Promise<TCData | null> {

    let response: TCData | null = null;

    this.listenerId = CmpApiModel.eventQueue.add({
      callback: this.callback,
      param: this.param,
      next: this.next,
    });

    response = await super.getResponse();

    return response;

  }

}
