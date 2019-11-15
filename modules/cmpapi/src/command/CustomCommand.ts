import {CmpData} from '../CmpData';
import {Callback, Param} from '../types';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

/**
 * Todo: possibly pass the custom function into constructor
 */
export class CustomCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  public execute(): void {

  }

}
