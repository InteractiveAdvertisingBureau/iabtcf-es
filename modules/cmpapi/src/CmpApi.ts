/* eslint-disable @typescript-eslint/no-explicit-any */
import {Callback, ErrorCallback} from './callback';
import {CmpApiModel} from './CmpApiModel';
import {CommandMap} from './command/CommandMap';
import {TCFCommands} from './command/TCFCommands';
import {DisabledCommand} from './command/DisabledCommand';
import {CustomCommands} from './CustomCommands';
import {TCModel} from '@iabtcf/core';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PageCallHandler = (
  command: string,
  version: number,
  callback: (response?: any, success?: any) => void,
  ...param: any
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
  private queuedCalls: TcfApiArgs[];

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
      this.queuedCalls = (window[this.API_FUNCTION_NAME] as GetQueueFunction)();

    } catch (err) {

      // nothing to do here - we tried... no harm no foul

    } finally {

      window[this.API_FUNCTION_NAME] = this.pageCallHandler.bind(this);

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

  private purgeQueuedCalls(): void {

    if (this.queuedCalls) {

      const apiCall = this.pageCallHandler.bind(this);
      this.queuedCalls.forEach((args: TcfApiArgs): void =>{

        const [command, version, callback, params] = args;

        if (params !== undefined) {

          apiCall(command, version, callback, ...params);

        } else {

          apiCall(command, version, callback);

        }

      });

      delete this.queuedCalls;

    }

  }

  /**
   * On may choose to either set the TCModel directly (tcModel)  or set an
   * encoded tc string (tcString) that will become. On the first set, CmpApi
   * will set Event status to 'tcloaded' and gdprApplies to true.  On the
   * second set of CmpApi the eventStatus will be set to 'useractionscomplete'.
   * If tcString is set explicitly to null that indicates gdprApplies == false.
   * @param {string | null} encodedString
   */
  public set tcString(encodedString: string | null) {

    this.throwIfCmpApiIsDisabled();
    CmpApiModel.tcString = encodedString;

    this.purgeQueuedCalls();

  }

  /**
   * On may choose to either set the TCModel directly (tcModel)  or set an
   * encoded tc string (tcString) that will become. On the first set, CmpApi
   * will set Event status to 'tcloaded' and gdprApplies to true.  On the
   * second set of CmpApi the eventStatus will be set to 'useractionscomplete'.
   * If tcModel is set explicitly to null that indicates gdprApplies == false.
   * @param {TCModel | null} tcModel
   */
  public set tcModel(tcModel: TCModel | null) {

    this.throwIfCmpApiIsDisabled();
    CmpApiModel.tcModel = tcModel;

    this.purgeQueuedCalls();

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
   * Checks to see if the command exists in either the set of TCF Commands or
   * if custom commands
   *
   * @param {string} command - command to check
   * @return {boolean} - whether or not this command is known
   */
  private isKnownCommand(command: string): boolean {

    return ((this.customCommands !== undefined && this.customCommands[command] !== undefined) ||
      (CommandMap[command] !== undefined));

  }

  /**
   * Handler for all page call commands
   * @param {string} command
   * @param {number} version
   * @param {CallbackFunction} callback
   * @param {any} [param]
   */
  private pageCallHandler(command: string, version: number, callback: Callback, ...params: any): void | never {

    if (typeof command !== 'string') {

      (callback as ErrorCallback)(`invalid command: ${command}`, false);

    } else if (version != 2) {

      /**
       * Loosely checking version here on purpose.  If a string is passed
       * that's probably ok, we don't need strict adherence here.
       */

      (callback as ErrorCallback)(`unsupported version: ${version}`, false);

    } else if (typeof callback !== 'function') {

      throw new Error('invalid callback function');

    } else if (CmpApiModel.disabled) {

      new DisabledCommand(callback);

    } else if (!this.isKnownCommand(command)) {

      /**
       * This check is here just because the call shouldn't be queued if it's
       * something we know isn't going to work.  It's kind of like breaking off a bad
       * relationshipthe instant you know things are not going to work out
       * instead of letting it linger.
       */

      (callback as ErrorCallback)(`CmpApi does not support the "${command}" command`, false);

    } else if (command === TCFCommands.PING) {

      /**
       * if it's a ping we always respond right away regardless of our tcModel
       * status or other things.
       */
      new CommandMap[command](callback, params[0]);

    } else if (CmpApiModel.tcModel === undefined) {

      /**
       * If we are still waiting for the TC data to be set we can push this
       * onto the queue that we have and once the model is set it'll be called
       */
      this.queuedCalls.push([command, version, callback, params]);

    } else {

      /**
       * we've passed the checks and we're firing on all cylinders; now lets
       * get the appropriate command
       */

      if (this.customCommands && this.customCommands[command]) {

        this.customCommands[command](callback, ...params);

      } else if (CommandMap[command]) {

        new CommandMap[command](callback, params[0]);

      } else {

        // hopefully this isn't possible
        throw new Error('unknown error');

      }

    }

  }

}
