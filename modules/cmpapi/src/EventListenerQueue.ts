import {TCDataCallback} from './callback';
import {GetTCDataCommand} from './command/GetTCDataCommand';

export class EventListenerQueue {

  private static callbacks: Set<TCDataCallback> = new Set<TCDataCallback>();

  public static add(callback: TCDataCallback): void {

    this.callbacks.add(callback);

  }

  public static remove(callback: TCDataCallback): boolean {

    return this.callbacks.delete(callback);

  }

  public static executeCommands(): void {

    if (this.callbacks && this.callbacks.size > 0) {

      for (const callback of this.callbacks) {

        new GetTCDataCommand(callback);

      }

    }

  }

  public static get size(): number {

    return this.callbacks.size;

  }

  public static clear(): void {

    this.callbacks.clear();

  }

}
