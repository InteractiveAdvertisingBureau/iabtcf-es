/* eslint-disable @typescript-eslint/no-explicit-any */

export type TCFAPIArgs = [string, number, Callback, ...any[]];
export type Callback = (result?: any, success?: boolean) => void;

export type PageCallHandler = (
  command?: string,
  version?: number,
  callback?: Callback,
  ...param: any
) => void | TCFAPIArgs[];

export const TCFAPI_KEY = '__tcfapi';

export interface Window {
  [TCFAPI_KEY]: PageCallHandler;
}
