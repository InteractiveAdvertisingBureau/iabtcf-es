/* eslint-disable @typescript-eslint/no-explicit-any */
export * from './command';
export * from './response';
export * from './status';
export * from './CmpApi';
export * from './CustomCommands';
export {TCFAPI_KEY, TCFAPI_ARGS, TCFAPIFunction} from './CallResponder';

export const TCFAPI_POSTMSG_CALL: '__tcfapiCall' = '__tcfapiCall';
export const TCFAPI_POSTMSG_RETURN: '__tcfapiReturn' = '__tcfapiReturn';
export const TCFAPI_LOCATOR: '__tcfapiLocator' = '__tcfapiLocator';

export interface TCFAPIPostMessageReturn {
  [TCFAPI_POSTMSG_RETURN]: {
    returnValue?: any;
    success?: boolean;
    callId: number;
  };
}

export interface TCFAPIPostMessageCall {
  [TCFAPI_POSTMSG_CALL]: {
    command: string;
    parameter?: any;
    version: number;
  };
}
