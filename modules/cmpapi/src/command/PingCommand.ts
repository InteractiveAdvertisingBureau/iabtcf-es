import {CmpData} from '../CmpData';
import {Ping} from '../model';
import {Callback, Param, PingCallback} from '../types';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class PingCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  public execute(): void {

    const ping = new Ping();
    this.setBaseReturnFields(ping);

    if (this.cmpData.tcModel) {

      ping.gvlVersion = this.cmpData.tcModel.gvl.gvlSpecificationVersion;

    }

    ping.apiVersion = this.cmpData.apiVersion.toString(10);
    ping.cmpStatus = this.cmpData.cmpStatus;
    ping.displayStatus = this.cmpData.displayStatus;
    ping.cmpLoaded = true;

    (this.callback as PingCallback)(ping);

  }

}
