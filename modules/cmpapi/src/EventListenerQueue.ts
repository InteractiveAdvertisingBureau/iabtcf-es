import {GetTCDataCommand} from './command/GetTCDataCommand';
import {Callback} from './types';

export class EventListenerQueue {

  private eventQueue = new Map<number, Callback>();
  private queueNumber = 0;

  public add(tcDataCallback: Callback): number {

    this.eventQueue.set(this.queueNumber, tcDataCallback);
    return this.queueNumber++;

  }

  public remove(listenerId: number): boolean {

    return this.eventQueue.delete(listenerId);

  }

  public exec(): void {

    this.eventQueue.forEach((callback: Callback, listenerId: number): void => {

      new GetTCDataCommand(callback, undefined, listenerId);

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
