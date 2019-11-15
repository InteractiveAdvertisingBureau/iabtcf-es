import {Command} from '../command';
import {Callback} from '../types';
import {CmpApiUtil, Constants} from '../utilities';

export class EventListenerQueue {

  private commands: Map<Callback, Command> = new Map<Callback, Command>();

  public add(callback: Callback, command: Command): void {

    this.commands.set(callback, command);

  }

  public remove(callback: Callback): boolean {

    if (!this.commands.delete(callback)) {

      CmpApiUtil.failCallback(callback, Constants.EVENT_LISTENER_NOT_FOUND);

      return false;

    }

    return true;

  }

  public executeCommands(): void {

    this.commands.forEach((command): void => command.execute());

  }

}
