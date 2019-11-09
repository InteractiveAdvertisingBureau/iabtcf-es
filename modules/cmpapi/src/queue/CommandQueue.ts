import {CommandArgs} from '../model';

export class CommandQueue {

  private commandArgs: CommandArgs[];

  private processCommand: (commandArgs: CommandArgs) => void;

  public constructor(commandArgs?: CommandArgs[]) {

    this.commandArgs = commandArgs ? commandArgs : [];

  }

  public get queueLength(): number {

    return this.commandArgs.length;

  }

  public get isEmpty(): boolean {

    return this.commandArgs.length < 1;

  }

  public get hasCommands(): boolean {

    return this.commandArgs.length > 0;

  }

  public queueCommand(commandArgs: CommandArgs) {

    // Todo: filter dups

    this.commandArgs.push(commandArgs);

  }

  public queueCommands(commandArgsSet: CommandArgs[]) {

    // Todo: filter dups

    this.commandArgs.push(...commandArgsSet);

  }

  public processAndClearCommands(): void {

    this.commandArgs.forEach((commandArgs: CommandArgs) => this.processCommand(commandArgs));
    this.commandArgs = [];

  }

  public setCommandProcessor(commandProcessor: (commandArgs: CommandArgs) => void) {

    this.processCommand = commandProcessor;

  }

}
