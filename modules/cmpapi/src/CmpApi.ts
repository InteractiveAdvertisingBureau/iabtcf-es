import {API} from './API';

export class CmpApi {

  public static readonly API_FUNCTION_NAME: string = '__tcfapi';

  private api: API = new API();

  public constructor() {

    /* eslint-disable-next-line */
    window[CmpApi.API_FUNCTION_NAME] = this.handlePageCall;

  }
  private handlePageCall(command: string, version: number, callback: Function, param?: any): void {

    if (typeof this.api[command] === 'function') {

    } else {

      this.error(`${command} command not supported by this CMP`);

    }

  }
  private error(msg: string): void {

    console.error(msg);

  }

}
