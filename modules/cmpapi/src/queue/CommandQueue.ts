import {Command} from '../command';

export class CommandQueue {

  private commands: Command[];

  public constructor(commands?: Command[]) {

    this.commands = commands ? commands : [];

  }

  public get hasCommands(): boolean {

    return this.commands.length > 0;

  }

  public queueCommand(command: Command): void {

    // Todo: filter dups

    this.commands.push(command);

  }

  public queueCommands(commands: Command[]): void {

    // Todo: filter dups

    this.commands.push(...commands);

  }

  public executeAndClearCommands(): void {

    if (this.hasCommands) {

      this.commands.forEach((command: Command): void => command.execute());
      this.commands = [];

    }

  }

}
