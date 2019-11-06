import {CmpData} from '../model/CmpData';
import {Callback} from "../types/callback/Callback";
import {Param} from "../types/Param";
import {Command} from './Command';
import {GetTcDataCommand} from './GetTcDataCommand';

export class GetInAppTcDataCommand extends GetTcDataCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(callback: Callback, param?: Param): void {
  }

}
