import {CommandCallback} from './CommandCallback.js';

export abstract class Command {

  protected listenerId: number;
  protected callback: CommandCallback;
  protected next: CommandCallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected param: any;
  protected success = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(callback: CommandCallback, param?: any, listenerId?: number, next?: CommandCallback) {

    Object.assign(this, {
      callback,
      listenerId,
      param,
      next,
    });

    try {

      this.respond();

    } catch (error) {

      this.invokeCallback(null);

    }

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected invokeCallback(response: any): void {

    const success = response !== null;

    if (typeof this.next === 'function') {

      this.callback(this.next, response, success);

    } else {

      this.callback(response, success);

    }

  }
  protected abstract respond(): void;

}
