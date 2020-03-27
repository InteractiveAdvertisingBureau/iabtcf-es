import {PingCallback} from '../callback';
import {Ping} from '../response';
import {Command} from './Command';

export class PingCommand extends Command {

  protected async success(): Promise<void> {

    const callback = this.callback as PingCallback;

    callback(new Ping());

  }

}
