import {Ping} from '../response/index.js';
import {Command} from './Command.js';

export class PingCommand extends Command {

  protected respond(): void {

    this.invokeCallback(new Ping());

  }

}
