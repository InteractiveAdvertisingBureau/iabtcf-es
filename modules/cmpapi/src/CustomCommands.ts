import {Callback} from './types';

export interface CustomCommands {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [commandName: string]: (callback: Callback, ...param: any) => void;

}
