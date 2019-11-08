import {CommandArgs} from '../model';
import {ArgSet} from "../types";

export class CommandQueue {

  private commandArgs: CommandArgs[];

  public constructor(commandArgs: CommandArgs[]) {

    this.commandArgs = commandArgs;

  }

  public get hasCommands(): boolean {

    return this.commandArgs.length > 0;

  }

  public queueCommand(commandArgs: CommandArgs) {

    this.commandArgs.push(commandArgs);

  }

  public processCommands() {

  }

  add(queuedArgSets: ArgSet[]) {

  }
}
