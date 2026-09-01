import type {GetTCDataCommand} from './command/GetTCDataCommand.js';
import type {CommandCallback} from './command/CommandCallback.js';

interface EventItem {
  callback: CommandCallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  param?: any;
  next?: CommandCallback;
}

/**
 * Holds the GetTCDataCommand constructor, registered by the GetTCDataCommand
 * module itself when it loads (see the bottom of GetTCDataCommand.ts). This
 * indirection lets EventListenerQueue avoid a value import of GetTCDataCommand,
 * which would otherwise create a circular dependency that is evaluated when
 * CmpApiModel is first loaded:
 * CmpApiModel -> EventListenerQueue -> GetTCDataCommand -> TCData -> Response -> CmpApiModel
 */
let GetTCDataCommandCtor: typeof GetTCDataCommand;

export const registerGetTCDataCommand = (ctor: typeof GetTCDataCommand): void => {

  GetTCDataCommandCtor = ctor;

};

export class EventListenerQueue {

  private eventQueue = new Map<number, EventItem>();
  private queueNumber = 0;

  public add(eventItems: EventItem): number {

    this.eventQueue.set(this.queueNumber, eventItems);
    return this.queueNumber++;

  }

  public remove(listenerId: number): boolean {

    return this.eventQueue.delete(listenerId);

  }

  public exec(): void {

    this.eventQueue.forEach((eventItem: EventItem, listenerId: number): void => {

      new GetTCDataCommandCtor(eventItem.callback, eventItem.param, listenerId, eventItem.next);

    });

  }

  public clear(): void {

    this.queueNumber = 0;
    this.eventQueue.clear();

  }

  public get size(): number {

    return this.eventQueue.size;

  }

}
