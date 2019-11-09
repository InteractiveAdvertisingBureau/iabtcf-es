import {CmpData} from '../CmpData';
import {CommandArgs, Ping} from '../model';
import {Param, PingCallback} from '../types';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class PingCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(commandArgs: CommandArgs): void {

    const ping = new Ping();
    this.setBaseReturnFields(ping);

    if (this.cmpData.tcModel) {

      ping.gvlVersion = this.cmpData.tcModel.gvl.gvlSpecificationVersion;

    }

    ping.apiVersion = this.cmpData.apiVersion.toString(10);
    ping.cmpStatus = this.cmpData.cmpStatus;
    ping.displayStatus = this.cmpData.displayStatus;
    ping.cmpLoaded = true;

    (commandArgs.callback as PingCallback)(ping);

  }

}
