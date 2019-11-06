import {Ping} from "../model";
import {CmpData} from '../model/CmpData';
import {Callback} from "../types/callback/Callback";
import {PingCallback} from "../types/callback/PingCallback";
import {Param} from "../types/Param";
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class PingCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(callback: PingCallback, param?: Param): void {

    const ping = new Ping();
    this.setReturnFields(ping);

    if (this.cmpData.tcModel) {

      ping.gvlVersion = this.cmpData.tcModel.gvl.gvlSpecificationVersion;

    }

    ping.apiVersion = '3'; // todo: Where do I get this?
    ping.cmpStatus = this.cmpData.cmpStatus;
    ping.displayStatus = this.cmpData.displayStatus;
    ping.cmpLoaded = true;

    callback(ping);
  }

}
