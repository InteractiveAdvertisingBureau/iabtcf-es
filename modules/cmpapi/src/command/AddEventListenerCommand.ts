import {CmpData} from '../CmpData';
import {Callback, Param} from '../types';
import {Command} from './Command';
import {GetTcDataCommand} from './GetTcDataCommand';

export class AddEventListenerCommand extends GetTcDataCommand implements Command {

  public getCallback(): Callback {

    return this.callback;

  }

  public constructor(cmpData: CmpData, command: string, version: number, callback: Callback, param?: Param) {

    /**
     * Note we are making the param undefined. This command doesn't use it.
     */

    super(cmpData, command, version, callback, undefined);

  }

  public execute(): void {

    super.execute();

  }

}
