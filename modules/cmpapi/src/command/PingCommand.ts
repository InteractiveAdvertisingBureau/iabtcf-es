import {CmpData} from '../CmpData';
import {Ping} from '../model';
import {Callback, Param, PingCallback} from '../types';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';
import {Validatable} from '../validatable/Validatable';

/**
 * Executes a ping command request and executes its callback method with ping data
 */
export class PingCommand extends BaseCommand implements Command, Validatable {

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  /**
   * Executes the ping command
   */
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
