import {CmpApiModel} from '../CmpApiModel.js';
import {Command} from './Command.js';

export class RemoveEventListenerCommand extends Command {

  protected respond(): void {

    this.invokeCallback(CmpApiModel.eventQueue.remove(this.param));

  }

}
