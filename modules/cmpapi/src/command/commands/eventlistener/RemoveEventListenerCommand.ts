import {CmpDataReader} from '../../../cmpdata';
import {Param, RemoveListenerCallback, TCDataCallback} from '../../../types';
import {Validatable, ValidationMessages} from '../../../validation';
import {Callback} from '../../callback/Callback';
import {EventListenerQueue} from '../../queues';
import {BaseCommand} from '../BaseCommand';
import {Command} from '../Command';

/**
 * Removes an event listener from an EventListenerQueue
 */
export class RemoveEventListenerCommand extends BaseCommand implements Command, Validatable {

  private eventListenerQueue: EventListenerQueue;

  public constructor(
    eventListenerQueue: EventListenerQueue,
    cmpData: CmpDataReader,
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

      (this.callback.function as RemoveListenerCallback)(true);

    } else {

      this.callback.fail(ValidationMessages.CUSTOM_COMMAND_FUNCTION_INVALID);

    }

  }

}
