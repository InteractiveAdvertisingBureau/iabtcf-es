import {Ping} from '../response';
import {Command} from './Command';

export class PingCommand extends Command {

  protected respond(): void {

    this.invokeCallback(new Ping());

  }

}
