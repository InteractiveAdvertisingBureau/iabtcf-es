import {Ping} from '../response';
import {Command} from './Command';

export class PingCommand extends Command {

  protected async success(): Promise<void> {

    this.callback(new Ping());

  }

}
