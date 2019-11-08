import {CmpData} from '../CmpData';
import {Callback, Param} from '../types';
import {Command} from './Command';
import {GetTcDataCommand} from './GetTcDataCommand';

export class GetInAppTcDataCommand extends GetTcDataCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(callback: Callback, param?: Param): void {
  }

}
