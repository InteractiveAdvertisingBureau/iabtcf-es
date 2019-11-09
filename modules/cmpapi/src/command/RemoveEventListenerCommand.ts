import {CmpData} from '../CmpData';
import {CommandArgs} from '../model';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class RemoveEventListenerCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(commandArgs: CommandArgs): void {
  }

}
