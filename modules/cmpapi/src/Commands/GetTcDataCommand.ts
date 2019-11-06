import {TCData} from '../model';
import {CmpData} from '../model/CmpData';
import {TCDataCallback} from "../types/callback/TCDataCallback";
import {Param} from "../types/Param";
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
    this.setReturnFields(tcData);
    callback(tcData, true);

  }

  /*
  * Validates a vendor id list
  * @vendorIds {number[]} vendorIds
  * @return {boolean}
  */
  private isVendorsListValid(vendorIds: number[]): boolean {

    return Array.isArray(vendorIds) && vendorIds.every((vendorId) => Number.isInteger(vendorId) && vendorId > 0);

  }

}
