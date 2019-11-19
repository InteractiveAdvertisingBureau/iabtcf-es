import {CmpDataReader} from '../../cmpdata';
import {Ping} from '../../model';
import {Callback, Param, PingCallback} from '../../types';
import {Validatable} from '../../validation/Validatable';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

/**
 * Executes a ping command request and executes its callback method with ping data
 */
export class PingCommand extends BaseCommand implements Command, Validatable {

  public constructor(cmpData: CmpDataReader, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  /**
   * Executes the ping command
   */
  public execute(): void {

    const ping = new Ping();
    this.setBaseReturnFields(ping);

    if (this.cmpData.tcModelIsSet) {

      ping.gvlVersion = this.cmpData.getTcModel().gvl.gvlSpecificationVersion;

    }

    ping.apiVersion = this.cmpData.getApiVersion().toString(10);
    ping.cmpStatus = this.cmpData.getCmpStatus();
    ping.displayStatus = this.cmpData.getDisplayStatus();
    ping.cmpLoaded = true;

    (this.callback as PingCallback)(ping);

  }

}
