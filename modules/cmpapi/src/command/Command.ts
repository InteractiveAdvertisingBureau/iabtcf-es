import {CommandArgs} from '../model';

export interface Command {

  execute(commandArgs: CommandArgs): void;

}
