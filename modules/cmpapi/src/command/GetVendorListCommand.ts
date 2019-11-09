import {CmpData} from '../CmpData';
import {GetVendorListCommandArgs, GlobalVendorList} from '../model';
import {VendorListCallback} from '../types';
import {CmpApiUtil, Constants} from '../utilities';
import {Validation} from '../utilities/Validation';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class GetVendorListCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(commandArgs: GetVendorListCommandArgs): void {

    const gvl = new GlobalVendorList(this.cmpData.tcModel, commandArgs.param as string | number);
    this.setBaseReturnFields(gvl);

    commandArgs.callback(gvl, true);

  }

}
