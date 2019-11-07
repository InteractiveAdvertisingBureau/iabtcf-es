import {CmpData} from '../CmpData';
import {TCData} from '../model';
import {Param, TCDataCallback} from '../types';
import {Validation} from "../validation/Validation";
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class GetTcDataCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(callback: TCDataCallback, param?: Param): void {

    const vendorIds = param as number[];

    if (vendorIds) {

      if (!this.isVendorsListValid(vendorIds)) {

        callback(null, false);

      }

    }

    const tcData = new TCData(this.cmpData.tcModel, this.cmpData.eventStatus, vendorIds);
    this.setBaseReturnFields(tcData);
    callback(tcData, true);

  }

  /*
  * Validates a vendor id list
  * @vendorIds {number[]} vendorIds
  * @return {boolean}
  */
  private isVendorsListValid(vendorIds: number[]): boolean {

    return Validation.isGtrZeroIntegerArray(vendorIds);

  }

}
