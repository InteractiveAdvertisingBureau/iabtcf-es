import {CmpData} from '../CmpData';
import {EventListenerQueue} from '../queue/EventListenerQueue';
import {Callback, Param} from '../types';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';
import {GetTcDataCommand} from './GetTcDataCommand';

export class AddEventListenerCommand extends BaseCommand implements Command {

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

  public validate(validationMessage: string, failCallbackIfNotValid?: boolean): boolean {

    return this.getTcDataCommand.validate(validationMessage, failCallbackIfNotValid);

  }

}
