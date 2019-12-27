import {Command} from './Command';
import {RemoveListenerCallback} from '../types/RemoveListenerCallback';
import {EventListenerQueue} from '../EventListenerQueue';

export class RemoveEventListenerCommand extends Command {

  protected success(): void {

    const callback = this.callback as RemoveListenerCallback;

    callback(true);

  }

  protected fail(): void {

    const callback = this.callback as RemoveListenerCallback;

    callback(false);

  }

  protected isValid(): boolean {

    return (typeof this.param === 'function' && EventListenerQueue.remove(this.param));

  }

}
