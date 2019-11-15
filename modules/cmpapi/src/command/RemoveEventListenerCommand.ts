import {CmpData} from '../CmpData';
import {EventListenerQueue} from '../queue/EventListenerQueue';
import {Callback, Param, RemoveListenerCallback} from '../types';
import {CmpApiUtil, Constants, Validation} from '../utilities';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class RemoveEventListenerCommand extends BaseCommand implements Command {

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

  public execute(): void {

    if (this.eventListenerQueue.remove(this.callback)) {

      (this.callback as RemoveListenerCallback)(true);

    }

  }

  public validate(validationMessage: string, failCallbackIfNotValid?: boolean): boolean {

    if (!Validation.isFunction(this.callback)) {

      validationMessage = Constants.CALLBACK_REQUIRED;

      if (failCallbackIfNotValid) {

        CmpApiUtil.failCallback(this.callback, validationMessage);

      }

    }

    return super.validate(validationMessage, failCallbackIfNotValid);

  }

}
