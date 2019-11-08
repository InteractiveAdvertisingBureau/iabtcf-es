import {CommandArgs} from '../model';
import {ArgSet} from '../types';

export class CommandQueue {

  private commandArgs: CommandArgs[];

  public constructor(commandArgs?: CommandArgs[]) {

    this.commandArgs = commandArgs ? commandArgs : [];

  }

  public get hasCommands(): boolean {

    return this.commandArgs.length > 0;

  }

  public queueCommand(commandArgs: CommandArgs) {

    this.commandArgs.push(commandArgs);

  }

  public queueCommands(commandArgsSet: CommandArgs[]) {

    this.commandArgs.push(...commandArgsSet);

  }

  public processCommands() {

  }



}
