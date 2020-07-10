import {Ping} from '../response';
import {Command} from './Command';

export class PingCommand extends Command {

  protected async getResponse(): Promise<Ping> {

    return new Ping();

  }

}
