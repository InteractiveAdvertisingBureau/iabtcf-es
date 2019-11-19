import {CmpDataReader} from '../../../cmpdata';
import {Param} from '../../../types';
import {Validatable, ValidationResult} from '../../../validation';
import {Callback} from '../../callback/Callback';
import {EventListenerQueue} from '../../queues';
import {BaseCommand} from '../BaseCommand';
import {Command} from '../Command';
import {GetTcDataCommand} from '../GetTcDataCommand';

/**
 * Adds an event listener to an EventListenerQueue
 */
export class AddEventListenerCommand extends BaseCommand implements Command, Validatable {

  private readonly getTcDataCommand: GetTcDataCommand;
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

    this.getTcDataCommand = new GetTcDataCommand(cmpData, command, version, callback, param);

  }

  public execute(): void {

    this.eventListenerQueue.add(this.callback.function, this.getTcDataCommand);

  }

  public validate(failCallbackIfNotValid?: boolean): ValidationResult {

    return this.getTcDataCommand.validate(failCallbackIfNotValid);

  }

}
