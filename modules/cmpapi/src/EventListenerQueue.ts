import {GetTCDataCommand} from './command/GetTCDataCommand';
import {TCDataCallback} from './callback';

export class EventListenerQueue {

  private eventQueue = new Map<number, TCDataCallback>();
  private queueNumber = 0;

  public add(tcDataCallback: TCDataCallback): number {

    this.eventQueue.set(this.queueNumber, tcDataCallback);
    return this.queueNumber++;

  }

  public remove(listenerId: number): boolean {

    return this.eventQueue.delete(listenerId);

  }

  public exec(): void {

    this.eventQueue.forEach((callback: TCDataCallback, listenerId: number): void => {

      new GetTCDataCommand(callback, undefined, listenerId);

    });

  }

  public clear(): void {

    this.eventQueue.clear();

  }

  public get size(): number {

    return this.eventQueue.size;

  }

}
