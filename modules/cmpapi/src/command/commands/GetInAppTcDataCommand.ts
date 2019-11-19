import {CmpDataReader} from '../../cmpdata';
import {InAppTCData} from '../../model';
import {IATCDataCallback} from '../../types';
import {Validatable} from '../../validation';
import {Callback} from '../callback/Callback';
import {Command} from './Command';
import {GetTcDataCommand} from './GetTcDataCommand';

/**
 * Get in app tc data command
 */
export class GetInAppTcDataCommand extends GetTcDataCommand implements Command, Validatable {

  public constructor(cmpData: CmpDataReader, command: string, version: number, callback: Callback) {

    /**
     * Note we are making the param undefined. This command doesn't use it.
     */

    super(cmpData, command, version, callback, undefined);

  }

  /**
   * Executes the get in app tc data command
   */
  public execute(): void {

    const iATCData = new InAppTCData(this.cmpData.getTcModel(), this.cmpData.getEventStatus(), this.param as number[]);
    this.setBaseReturnFields(iATCData);
    (this.callback.function as IATCDataCallback)(iATCData, true);

  }

}
