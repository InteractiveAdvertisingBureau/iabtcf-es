import {Disabled} from '../response';
import {Command} from './Command';

export class DisabledCommand extends Command {

  protected async success(): Promise<void> {

    this.callback(new Disabled(), false);

  }

}
