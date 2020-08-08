import {CommandCallback} from './CommandCallback';

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

    if (response !== null) {

      if (typeof this.next === 'function') {

        this.callback(this.next, response, true);

      } else {

        this.callback(response, true);

      }

    } else {

      this.callback(response, false);

    }

  }
  protected abstract respond(): void;

}
