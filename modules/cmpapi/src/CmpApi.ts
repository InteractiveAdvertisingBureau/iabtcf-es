import {
  API,
  Callback,
} from './API';

export class CmpApi {

  public static readonly API_FUNCTION_NAME: string = '__tcfapi';
  private static NOT_SUPPORTED: string = 'not supported by this CMP';

  private api: API = new API();

  public constructor() {

    /* eslint-disable-next-line */
    window[CmpApi.API_FUNCTION_NAME] = this.handlePageCall;

  }
  private handlePageCall(command: string, version: number, callback: Callback, param?: any): void {

    if (typeof this.api[command] === 'function') {

      if (version === 2) {

        if (typeof callback === 'function') {

          this.api[command](callback, param);

        } else {

          this.error(`callback required`);

        }

      } else {

        this.error(`Version ${version} ${CmpApi.NOT_SUPPORTED}`);

      }

    } else {

      this.error(`${command} command ${CmpApi.NOT_SUPPORTED}`);

    }

  }
  private error(msg: string): void {

    console.error(msg);

  }

}
