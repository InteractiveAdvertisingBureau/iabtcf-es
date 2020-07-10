import {CommandCallback} from './command/CommandCallback';
export interface CustomCommands {

  [commandName: string]: (callback: CommandCallback, ...param) => void;

}
