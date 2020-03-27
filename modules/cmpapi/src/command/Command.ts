import {Callback, FailCallback} from '../callback';
/**
 * Base command class holds basic command parameters and has functionality to
 * handle basic validation.
 */
export abstract class Command {

  protected versionString: string;
  protected callback: Callback;
  protected listenerId: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected param?: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(callback: Callback, param?: any, listenerId?: number) {

    this.callback = callback;
    this.param = param;
    this.listenerId = listenerId;

    if (this.isValid()) {

      this.success();

    } else {

      this.fail();

    }

  }

  // if not overwritten it's always true
  protected isValid(): boolean {

    return true;

  }
  protected abstract async success(): Promise<void>
  protected fail(): void {

    const callback = this.callback as FailCallback;

    callback(null, false);

  }

}
