import {TCDataCallback} from './types';
import {GetTcDataCommand} from './command/GetTcDataCommand';

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

        new GetTcDataCommand(callback);

      }

    }

  }

}
