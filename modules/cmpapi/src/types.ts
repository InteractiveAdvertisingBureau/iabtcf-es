/* eslint-disable @typescript-eslint/no-explicit-any */

export type TCFTCFAPI_ARGS = [string, number, Callback, ...any[]];
export type Callback = (result?: any, success?: boolean) => void;

export type TCFAPIFunction = (
  command?: string,
  version?: number,
  callback?: Callback,
  ...param: any
) => void | TCFTCFAPI_ARGS[];

export const TCFTCFAPI_KEY = '__tcfapi';
export const TCFAPI_POSTMSG_CALL = TCFTCFAPI_KEY + 'Call';
export const TCFAPI_POSTMSG_RETURN = TCFTCFAPI_KEY + 'Return';
export const TCFAPI_LOCATOR = TCFTCFAPI_KEY + 'Locator';

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
