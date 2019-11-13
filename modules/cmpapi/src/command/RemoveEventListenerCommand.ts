import {CmpData} from '../CmpData';
import {Callback, Param, RemoveListenerCallback} from '../types';
import {BaseCommand} from './BaseCommand';
import {Command} from './Command';

export class RemoveEventListenerCommand extends BaseCommand implements Command {

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    super(cmpData, command, version, callback, param);

  }

  public execute(): void {

    (this.callback as RemoveListenerCallback)(true);

  }

}
