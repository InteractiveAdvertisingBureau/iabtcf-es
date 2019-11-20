import {Command} from '../commands';

/**
 * Class to hold and execute commands that are not yet ready to be processed
 */
export class CommandQueue {

  private commands: Command[];

  /**
   * Constructor
   * @param {Command[]} commands
   */
  public constructor(commands?: Command[]) {

    this.commands = commands ? commands : [];

  }

  /**
   * Returns true if we currently have commands waiting to be executed
   * @return {boolean}
   */
  public get hasCommands(): boolean {

    return this.commands.length > 0;

  }

  /**
   * Adds a {Command} to the queue
   * @param {Command} command
   */
  public queueCommand(command: Command): void {

    // Todo: filter dups

    this.commands.push(command);

  }

  /**
   * Adds a list of {Command} to the queue
   * @param {Command[]} commands
   */
  public queueCommands(commands: Command[]): void {

    // Todo: filter dups

    this.commands.push(...commands);

  }

  /**
   * Executes all commands in the queue and clears the queue
   */
  public executeAndClearCommands(): void {

    if (this.hasCommands) {

      this.commands.forEach((command: Command): void => command.execute());
      this.commands = [];

    }

  }

}
