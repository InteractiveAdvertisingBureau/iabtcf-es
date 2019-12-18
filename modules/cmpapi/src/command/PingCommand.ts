import {PingCallback} from '../types';
import {Ping} from '../response';
import {Command} from './Command';

export class PingCommand extends Command {

  protected success(): void {

    const callback = this.callback as PingCallback;

    callback(new Ping());

  }

}
