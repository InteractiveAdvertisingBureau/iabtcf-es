import {GetTCDataCommand} from './command/GetTCDataCommand';
import {CommandCallback} from './command/CommandCallback';

interface EventItem {
  callback: CommandCallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  param?: any;
  next?: CommandCallback;
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

      new GetTCDataCommand(eventItem.callback, eventItem.param, listenerId, eventItem.next);

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
