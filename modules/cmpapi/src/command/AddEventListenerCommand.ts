import {CmpApiModel} from '../CmpApiModel';
import {GetTCDataCommand} from './GetTCDataCommand';

export class AddEventListenerCommand extends GetTCDataCommand {

  protected respond(): void {

    this.listenerId = CmpApiModel.eventQueue.add({
      callback: this.callback,
      param: this.param,
      next: this.next,
    });

    super.respond();

  }

}
