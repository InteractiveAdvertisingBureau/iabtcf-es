import {Command} from './Command';
import {CmpApiModel} from '../CmpApiModel';

export class RemoveEventListenerCommand extends Command {

  protected async getResponse(): Promise<boolean> {

    return CmpApiModel.eventQueue.remove(this.param);

  }

}
