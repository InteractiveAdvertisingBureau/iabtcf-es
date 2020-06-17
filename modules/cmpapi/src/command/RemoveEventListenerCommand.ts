import {Command} from './Command';
import {CmpApiModel} from '../CmpApiModel';

export class RemoveEventListenerCommand extends Command {

  protected async success(): Promise<void> {

    this.callback(true);

  }

  protected fail(): void {

    this.callback(false);

  }

  protected isValid(): boolean {

    return (typeof this.param === 'number' && CmpApiModel.eventQueue.remove(this.param));

  }

}
