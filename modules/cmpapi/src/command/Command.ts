import {Callback, Param} from '../types';

export interface Command {

  execute(callback: Callback, param?: Param): void;

}
