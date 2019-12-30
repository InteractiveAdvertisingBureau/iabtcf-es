import {GetTCDataCommand} from './GetTCDataCommand';
import {TCDataCallback} from '../callback';
import {EventListenerQueue} from '../EventListenerQueue';

export class AddEventListenerCommand extends GetTCDataCommand {

  protected success(): void {

    EventListenerQueue.add(this.callback as TCDataCallback);

  }

}
