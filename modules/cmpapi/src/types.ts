/* eslint-disable @typescript-eslint/no-explicit-any */

export type TCFAPIArgs = [string, number, Callback, ...any[]];
export type Callback = (result?: any, success?: boolean) => void;

export type TCFAPIFunction = (
  command?: string,
  version?: number,
  callback?: Callback,
  ...param: any
) => void | TCFAPIArgs[];

export const TCFAPI_KEY = '__tcfapi';
export const TCFAPI_POSTMSG_CALL = TCFAPI_KEY + 'Call';
export const TCFAPI_POSTMSG_RETURN = TCFAPI_KEY + 'Return';
export const TCFAPI_LOCATOR = TCFAPI_KEY + 'Locator';

export interface TCFAPIPostMessageReturn {
  returnValue?: any;
  success?: boolean;
  callId: number;
}
export interface TCFAPIPostMessageCall {
  command: string;
  parameter?: any;
  version: number;
}

export interface Window {
  __tcfapi: TCFAPIFunction;
}
