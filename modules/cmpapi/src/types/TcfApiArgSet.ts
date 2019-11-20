import {CallbackFunction} from './callbacks/CallbackFunction';
import {Param} from './Param';

/**
 * Arguments passed to page level api function
 */
export type TcfApiArgSet = [string, number, CallbackFunction, Param];
