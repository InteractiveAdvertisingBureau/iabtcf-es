import {CmpData} from '../CmpData';
import {CommandArgs} from "../model";
import {Callback} from "../types/callback/Callback";
import {Param} from "../types/Param";
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class AddEventListenerCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData) {

    super(cmpData);

  }

  public execute(commandArgs: CommandArgs): void {
  }

}
