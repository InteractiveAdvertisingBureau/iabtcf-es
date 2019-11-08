import {Callback, Param} from '../types';

/**
 * Holds the arguments needed to execute a command
 */
export interface CommandArgs {
  command: string;
  version: string;
  callback: Callback;
  param?: Param;
}
