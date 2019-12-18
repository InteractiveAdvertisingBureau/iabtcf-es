import {GetTcDataCommand} from './GetTcDataCommand';
import {TCDataCallback} from '../types';
import {EventListenerQueue} from '../EventListenerQueue';

export class AddEventListenerCommand extends GetTcDataCommand {

  protected success(): void {

    EventListenerQueue.add(this.callback as TCDataCallback);

  }

}
