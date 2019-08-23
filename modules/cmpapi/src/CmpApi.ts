import {
  TCModel,
  TCString,
} from '@iabtcf/core';

import {
  TCData,
  InAppTCData,
  Ping,
} from './model';

export type TCDataCallback = (tcData: TCData, success: boolean) => void;
export type IATCDataCallback = (IATCData: InAppTCData, success: boolean) => void;
export type PingCallback = (pingReturn: Ping) => void;
export type Callback = TCDataCallback | IATCDataCallback | PingCallback;

export class CmpApi {

  public static readonly API_FUNCTION_NAME: string = '__tcfapi';
  private static NOT_SUPPORTED: string = 'not supported by this CMP';

  private tcModel: TCModel;
  private tcString: TCString = new TCString();

  public constructor() {

    /* eslint-disable-next-line */
    window[CmpApi.API_FUNCTION_NAME] = this.handlePageCall;

  }

  public setTCModel(tcm: TCModel): void {

    this.tcModel = tcm;

  }

  public getTCData(callback: TCDataCallback, vendors: number[]): void{
  }

  public getInAppTCData(callback: IATCDataCallback): void {
  }

  public ping(callback: PingCallback): void {
  }

  public addEventListener(callback: TCDataCallback): void {
  }

  public removeventListener(callback: TCDataCallback, registeredCallback: TCDataCallback): void {
  }

  /* eslint-disable-next-line */
  private handlePageCall(command: string, version: number, callback: Callback, param?: any): void {

    if (typeof this[command] === 'function') {

      if (version === 2) {

        if (typeof callback === 'function') {

          this[command](callback, param);

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
