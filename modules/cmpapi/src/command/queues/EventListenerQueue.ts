import {CallbackFunction} from '../../types';
import {Command} from '../commands';

export class EventListenerQueue {

  private commands: Map<CallbackFunction, Command> = new Map<CallbackFunction, Command>();

  public add(callback: CallbackFunction, command: Command): void {

    this.commands.set(callback, command);

  }

  public remove(callback: CallbackFunction): boolean {

    return this.commands.delete(callback);

  }

  public executeCommands(): void {

    this.commands.forEach((command): void => command.execute());

  }

}
