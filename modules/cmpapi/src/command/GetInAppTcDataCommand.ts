import {CmpData} from '../CmpData';
import {CommandArgs} from '../model';
import {Command} from './Command';
import {GetTcDataCommand} from './GetTcDataCommand';

export class GetInAppTcDataCommand extends GetTcDataCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(commandArgs: CommandArgs): void {
  }

}
