import {CmpData} from '../CmpData';
import {EventListenerQueue} from '../queue/EventListenerQueue';
import {Callback, Param, RemoveListenerCallback, TCDataCallback} from '../types';
import {CmpApiUtil, Constants} from '../utilities';
import {Validatable} from '../validatable/Validatable';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

/**
 * Removes an event listener from an EventListenerQueue
 */
export class RemoveEventListenerCommand extends BaseCommand implements Command, Validatable {

  private eventListenerQueue: EventListenerQueue;

  public constructor(
    eventListenerQueue: EventListenerQueue,
    cmpData: CmpData,
    command: string,
    version: number,
    callback: Callback,
    param?: Param) {

    super(cmpData, command, version, callback, param);

    this.eventListenerQueue = eventListenerQueue;

  }

  /**
   * Executes the ping remove event listener command
   */
  public execute(): void {

    if (this.eventListenerQueue.remove(this.param as TCDataCallback)) {

      (this.callback as RemoveListenerCallback)(true);

    } else {

      CmpApiUtil.failCallback(this.callback, Constants.CUSTOM_COMMAND_FUNCTION_INVALID);

    }

  }

}
