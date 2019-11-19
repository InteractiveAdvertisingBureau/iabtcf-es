import {CustomCommandFunction} from './commands';

export interface CustomCommandRegistration {
  command: string;
  customFunction: CustomCommandFunction;
}
