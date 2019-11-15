import {CmpData} from '../CmpData';
import {InAppTCData} from '../model';
import {Callback, IATCDataCallback} from '../types';
import {Command} from './Command';
import {GetTcDataCommand} from './GetTcDataCommand';

export class GetInAppTcDataCommand extends GetTcDataCommand implements Command {

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback) {

    /**
     * Note we are making the param undefined. This command doesn't use it.
     */

    super(cmpData, command, version, callback, undefined);

  }

  public execute(): void {

    const inAppTCData = new InAppTCData(this.cmpData.tcModel, this.cmpData.eventStatus, this.param as number[]);
    this.setBaseReturnFields(inAppTCData);
    (this.callback as IATCDataCallback)(inAppTCData, true);

  }

}
