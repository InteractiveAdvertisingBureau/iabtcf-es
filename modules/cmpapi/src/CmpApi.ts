import {TCModel} from '@iabtcf/core';
import {CmpApiModel} from './CmpApiModel';
import {CustomCommands, Callback, ErrorCallback} from './types';
import {EventListenerQueue} from './EventListenerQueue';
import {CommandMap} from './command';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TcfApiArgs = [string, number, Callback, any];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TcfApiFunction = (command: string, version: number, callback: Callback, param?: any) => void | TcfApiArgs[];
type GetQueueFunction = () => TcfApiArgs[];

/**
 * Consent Management Platform API
 *
 * This is the only class that the CMP should create and interface with to set data for commands to utilize.
 */
export class CmpApi {

  private readonly customCommands: CustomCommands;
  private readonly API_FUNCTION_NAME: string = `__tcfapi`;
  private win: Window = window;

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   * @param {CustomCommandRegistration[]} customCommands
   */
  public constructor(cmpId: number, cmpVersion: number, customCommands?: CustomCommands) {

    CmpApiModel.cmpId = cmpId;
    CmpApiModel.cmpVersion = cmpVersion;

    if (customCommands) {

      this.customCommands = customCommands;

    }

    CmpApiModel.changeEventCallback = EventListenerQueue.executeCommands;
    this.reassignPageHandler();

  }

  private get tcfapi(): TcfApiFunction {

    return window[this.API_FUNCTION_NAME];

  }
  private set tcfapi(func: TcfApiFunction) {

    window[this.API_FUNCTION_NAME] = func;

  }

  private reassignPageHandler(): void {

    /**
     * Attempt to grab the queue – we could call ping and see if it is the stub,
     * but instead we'll just a feature-detection method of just trying to get
     * a queue by calling the function with no parameters and see if we get a
     * queue back. If there is no stub or the stub doesn't return the queue by
     * calling with no arguments, then we'll just move on and create our
     * function.
     */
    try {

      // get queued commands
      (this.tcfapi as GetQueueFunction)().forEach((queued: TcfApiArgs): void => {

        this.pageCallHandler(...queued);

      });

    } catch (err) {

      // nothing to do here

    } finally {

      this.tcfapi = this.pageCallHandler;

    }

  }

  /**
   * Sets the TCModel the commands will use to facilitate page requests
   * @param {TCModel | null} tcModel
   */
  public set tcModel(tcModel: TCModel | null) {

    this.throwIfCmpApiIsDisabled();
    CmpApiModel.tcModel = tcModel;

  }

  /**
   * Sets whether or not the CMP is going to show the CMP UI to the user.
   * @param {boolean} isVisible
   */
  public set uiVisible(isVisible: boolean) {

    this.throwIfCmpApiIsDisabled();
    CmpApiModel.uiVisible = isVisible;

  }

  /**
   * Disables the CmpApi from serving anything but ping and custom commands
   * Cannot be undone
   */
  public disable(): void {

    CmpApiModel.disabled = true;

  }

  /**
   * Throws an error if the Cmp has disabled the CmpApi
   */
  private throwIfCmpApiIsDisabled(): void {

    if (CmpApiModel.disabled) {

      throw new Error('CmpApi Disabled');

    }

  }

  /**
   * Handler for all page call commands
   * @param {string} command
   * @param {number} version
   * @param {CallbackFunction} callback
   * @param {any} [param]
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pageCallHandler(command: string, version: number, callback: Callback, param?: any): void | never {

    if (typeof command !== 'string') {

      throw new Error('invalid command');

    }

    if (version !== 2) {

      throw new Error('invalid version');

    }

    if (typeof callback !== 'function') {

      throw new Error('invalid callback function');

    }

    if (this.customCommands && this.customCommands[command]) {

      this.customCommands[command](callback, param);

    } else if (CommandMap[command]) {

      new CommandMap[command](callback, param);

    } else {

      (callback as ErrorCallback)(`CmpApi does not support the "${command}" command`, false);

    }

  }

}
