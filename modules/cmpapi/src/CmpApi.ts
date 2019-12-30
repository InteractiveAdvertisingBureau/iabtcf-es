/* eslint-disable @typescript-eslint/no-explicit-any */
import {TCModel} from '@iabtcf/core';
import {CmpApiModel} from './CmpApiModel';
import {CustomCommands} from './CustomCommands';
import {Callback, ErrorCallback} from './callback';
import {EventListenerQueue} from './EventListenerQueue';
import {CommandMap} from './command/CommandMap';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PageCallHandler = (
  command: string,
  version: number,
  callback: (response?: any, success?: any) => void,
  param?: any
) => void;
type TcfApiArgs = [string, number, Callback, any];
type GetQueueFunction = () => TcfApiArgs[];

/**
 * Consent Management Platform API
 *
 * This is the only class that the CMP should create and interface with to set data for commands to utilize.
 */
export class CmpApi {

  private readonly customCommands: CustomCommands;
  private readonly API_FUNCTION_NAME: string = '__tcfapi';
  private win: Window = window;
  private stubQueue: TcfApiArgs[];

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   * @param {CustomCommands} customCommands
   */
  public constructor(cmpId: number, cmpVersion: number, customCommands?: CustomCommands) {

    this.throwIfInvalidInt(cmpId, 'cmpId', 2);
    this.throwIfInvalidInt(cmpVersion, 'cmpVersion', 0);

    CmpApiModel.cmpId = cmpId;
    CmpApiModel.cmpVersion = cmpVersion;

    if (customCommands) {

      this.customCommands = customCommands;

    }

    CmpApiModel.changeEventCallback = EventListenerQueue.executeCommands;

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
      this.stubQueue = (this.tcfapi as GetQueueFunction)();

    } catch (err) {

      // nothing to do here

    } finally {

      this.tcfapi = this.wrapPageCallHandler();

    }

  }

  private throwIfInvalidInt(value: number, name: string, minValue: number): void | never {

    if (!(typeof value === 'number' && Number.isInteger(value) && value >= minValue)) {

      throw new Error(`Invalid ${name}: ${value}`);

    }

  }

  /**
   * Throws an error if the Cmp has disabled the CmpApi
   */
  private throwIfCmpApiIsDisabled(): void {

    if (CmpApiModel.disabled) {

      throw new Error('CmpApi Disabled');

    }

  }

  private get tcfapi(): PageCallHandler {

    return window[this.API_FUNCTION_NAME];

  }
  private set tcfapi(func: PageCallHandler) {

    window[this.API_FUNCTION_NAME] = func;

  }

  /**
   * Sets the TCModel the commands will use to facilitate page requests
   * @param {TCModel | null} tcModel
   */
  public set tcModel(tcModel: TCModel | null) {

    this.throwIfCmpApiIsDisabled();
    CmpApiModel.tcModel = tcModel;

    if (this.stubQueue) {

      this.stubQueue.forEach((args: TcfApiArgs): void =>{

        this.wrapPageCallHandler()(...args);

      });

      delete this.stubQueue;

    }

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

  private wrapPageCallHandler(): PageCallHandler {

    return (command: string, version: number, callback: Callback, param?: any): void => {

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this;

      _this.pageCallHandler(command, version, callback, param);

    };

  }

  /**
   * Handler for all page call commands
   * @param {string} command
   * @param {number} version
   * @param {CallbackFunction} callback
   * @param {any} [param]
   */
  private pageCallHandler(command: string, version: number, callback: Callback, param?: any): void | never {

    if (typeof command !== 'string') {

      (callback as ErrorCallback)(`invalid command: ${command}`, false);
      return;

    }

    if (version !== 2) {

      (callback as ErrorCallback)(`unsupported version: ${version}`, false);
      return;

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
