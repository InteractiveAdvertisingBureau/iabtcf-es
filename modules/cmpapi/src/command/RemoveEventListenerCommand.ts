import {CmpData} from '../CmpData';
import {Callback} from "../types/callback/Callback";
import {Param} from "../types/Param";
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class RemoveEventListenerCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(callback: Callback, param?: Param): void {
  }

}
