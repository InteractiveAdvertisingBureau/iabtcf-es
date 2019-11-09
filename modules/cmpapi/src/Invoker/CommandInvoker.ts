import {CmpData} from '../CmpData';
import {Command} from '../command/';
import {CommandArgs} from "../model";
import {Callback, Param} from '../types';

/**
 * Invoker class for command design pattern
 */
export class CommandInvoker {

  private cmpData: CmpData;

  private commandMap: Map<string, Command> = new Map<string, Command>();

  public constructor(cmpData: CmpData) {

    this.cmpData = cmpData;

  }

  public registerCommand(commandName: string, command: Command) {

    this.commandMap.set(commandName, command);

  }

  public execute(commandName: string, commandArgs: CommandArgs): void {

    const command = this.commandMap.get(commandName);

    if (command) {

      command.execute(commandArgs);

    } else {

      this.error('Command not found');

    }

  }

  protected error(msg: string): void {

    console.error(msg);

  }

}
