import {TCModel} from '@iabtcf/core';
import {
  TCData,
  InAppTCData,
  Ping,
} from './model';

export type tcDataCallback = (tcData: TCData, sucess: boolean) => void;
export class API {

  public tcModel: TCModel;

  public getTCData: (callback: tcDataCallback, vendors: number[]) => {
  }
  public getInAppTCData: (callback: (inAppTCData: InAppTCData, sucess: boolean) => void) => {
  }
  public ping: (callback: (pingReturn: Ping) => void) => {
  }
  public addEventListener: (callback: tcDataCallback) => {
  }
  public removeventListener: (callback: tcDataCallback, registeredCallback: tcDataCallback) => {
  }

}
