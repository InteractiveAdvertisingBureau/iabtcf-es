import {CmpApiModel} from '../CmpApiModel';
import {Command} from './Command';

export class RemoveEventListenerCommand extends Command {

  protected respond(): void {

    this.invokeCallback(CmpApiModel.eventQueue.remove(this.param));

  }

}
