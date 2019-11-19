import {CmpData} from '../CmpData';
import {EventListenerQueue} from '../queue/EventListenerQueue';
import {Callback, Param} from '../types';
import {ValidationResult} from "../validatable/ValidationResult";
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';
import {GetTcDataCommand} from './GetTcDataCommand';
import {Validatable} from '../validatable/Validatable';

/**
 * Adds an event listener to an EventListenerQueue
 */
export class AddEventListenerCommand extends BaseCommand implements Command, Validatable {

  private readonly getTcDataCommand: GetTcDataCommand;
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

    this.getTcDataCommand = new GetTcDataCommand(cmpData, command, version, callback, param);

  }

  public execute(): void {

    this.eventListenerQueue.add(this.callback, this.getTcDataCommand);

  }

  public validate(failCallbackIfNotValid?: boolean): ValidationResult {

    return this.getTcDataCommand.validate(failCallbackIfNotValid);

  }

}
