import {CmpData} from '../CmpData';
import {GetTcDataCommandArgs, TCData} from '../model';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class GetTcDataCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(commandArgs: GetTcDataCommandArgs): void {

    const tcData = new TCData(this.cmpData.tcModel, this.cmpData.eventStatus, commandArgs.param as number[]);
    this.setBaseReturnFields(tcData);
    commandArgs.callback(tcData, true);

  }

}
