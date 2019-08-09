import {TCModel} from '@iabtcf/core';
import {
  TCData,
  InAppTCData,
  Ping,
} from './model';

export type tcDataCallback = (tcData: TCData, success: boolean) => void;
export type iatcDataCallback = (iatcData: InAppTCData, success: boolean) => void;
export type pingCallback = (pingReturn: Ping) => void;
export type Callback = tcDataCallback | iatcDataCallback | pingCallback;

export class API {

  public tcModel: TCModel;

  public getTCData: (callback: tcDataCallback, vendors: number[]) => {
  }
  public getInAppTCData: (callback: iatcDataCallback) => {
  }
  public ping: (callback: pingCallback) => {
  }
  public addEventListener: (callback: tcDataCallback) => {
  }
  public removeventListener: (callback: tcDataCallback, registeredCallback: tcDataCallback) => {
  }

}
