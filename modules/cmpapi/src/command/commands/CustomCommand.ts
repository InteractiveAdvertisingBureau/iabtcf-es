import {Param} from '../../types';
import {Callback} from '../callback/Callback';
import {Command} from './Command';

export type CustomCommandFunction = (...args: any) => void;

/**
 * Custom command used by a CMP to execute a custom method.
 * No validation will be performed on the arguments passed in to this class.
 */
export class CustomCommand implements Command {

  protected customMethod: CustomCommandFunction;
  protected version: number;
  protected callback: Callback;
  protected param?: Param;

  public constructor(customMethod: CustomCommandFunction, version: number, callback: Callback, param?: Param) {

    this.customMethod = customMethod;
    this.version = version;
    this.callback = callback;
    this.param = param;

  }

  public execute(): void {

    this.customMethod(this.version, this.callback.function, this.param);

  }

}
