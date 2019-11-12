import {CmpData} from '../CmpData';
import {TCData} from '../model';
import {Callback, Param, TCDataCallback} from '../types';
import {CmpApiUtil, Constants} from '../utilities';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class GetTcDataCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  public execute(): void {

    const tcData = new TCData(this.cmpData.tcModel, this.cmpData.eventStatus, this.param as number[]);
    this.setBaseReturnFields(tcData);
    (this.callback as TCDataCallback)(tcData, true);

  }

  public validate(validationMessage: string, failCallbackIfNotValid: boolean = false): boolean {

    if (!this.isVendorsListValid()) {

      validationMessage = Constants.VENDOR_LIST_INVALID;

      if (failCallbackIfNotValid) {

        CmpApiUtil.failCallback(this.callback, validationMessage);

      }

      return false;

    }

    return super.validate(validationMessage, failCallbackIfNotValid);

  }

}
