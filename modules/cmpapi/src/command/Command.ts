import {CommandCallback} from './CommandCallback';
import {Response} from '../response/Response';
import {VendorList} from '@iabtcf/core';
/**
 * Base command class holds basic command parameters and has functionality to
 * handle basic validation.
 */
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

    this.respond();

  }

  private async respond(): Promise<void> {

    let response = null;

    try {

      response = await this.getResponse();

    } catch (ignore) {}

    const success = (response !== null);

    if (typeof this.next === 'function') {

      this.callback(this.next, response, success);

    } else {

      this.callback(response, success);

    }

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract async getResponse(): Promise<Response | VendorList | boolean | null>

}
