import {CustomCommandFunction} from "./command";

export interface CustomCommandRegistration {
  command: string;
  customFunction: CustomCommandFunction;
}
