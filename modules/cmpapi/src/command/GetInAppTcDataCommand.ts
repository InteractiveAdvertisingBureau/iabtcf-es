import {CmpData} from '../CmpData';
import {Callback, Param} from "../types";
import {Command} from './Command';
import {GetTcDataCommand} from './GetTcDataCommand';

export class GetInAppTcDataCommand extends GetTcDataCommand implements Command {

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  public execute(): void {
  }

}
