import {Callback, Param} from '../types';

/**
 * Holds the arguments needed to execute a command
 * Todo: Consider a class, could validate and extend for specific validation
 */
export interface CommandArgs {
  command: string;
  version: string;
  callback: Callback;
  param?: Param;
}
