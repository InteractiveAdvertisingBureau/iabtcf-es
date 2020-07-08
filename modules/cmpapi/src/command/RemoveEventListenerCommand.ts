import {Command} from './Command';
import {RemoveListenerCallback} from '../callback';
import {CmpApiModel} from '../CmpApiModel';

export class RemoveEventListenerCommand extends Command {

  protected async success(): Promise<void> {

    const callback = this.callback as RemoveListenerCallback;

    callback(true, this.next);

  }

  protected fail(): void {

    const callback = this.callback as RemoveListenerCallback;

    callback(false, this.next);

  }

  protected isValid(): boolean {

    return (typeof this.param === 'number' && CmpApiModel.eventQueue.remove(this.param));

  }

}
