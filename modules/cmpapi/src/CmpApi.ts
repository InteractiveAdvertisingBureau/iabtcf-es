import {TCModel} from '@iabtcf/core';
import {CmpCommandStream} from './CmpCommandStream';
import {CmpData} from './CmpData';
import {Commands, GetInAppTcDataCommand, GetTcDataCommand, GetVendorListCommand, PingCommand} from './command';
import {CommandInvoker} from './Invoker/CommandInvoker';
import {CommandQueue} from "./queue/CommandQueue";
import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {ArgSet, Callback, PageCallHandler, Param, TCDataCallback} from './types';
import {CmpApiUtil, Validation} from './utilities';

/**
 * Consent Management Platform API
 */
export class CmpApi {

  private static readonly NOT_SUPPORTED: string = 'not supported by this CMP';

  private readonly commandStream: CmpCommandStream;

  private readonly commandInvoker: CommandInvoker;

  private readonly cmpData: CmpData;

  private readonly commandQueue: CommandQueue;

  private eventArgSets: ArgSet[];

  private customMethods = {};

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   */
  public constructor(cmpId: number, cmpVersion: number) {

    /**
     * Initialize cmp data, set up frame and replace stub with our command handler
     */

    this.commandStream = new CmpCommandStream(this.getPageCallHandler());
    this.cmpData = new CmpData(cmpId, cmpVersion);

    const pingCommand = new PingCommand(this.cmpData);
    const getTcDataCommand = new GetTcDataCommand(this.cmpData);
    const getInAppTcDataCommand = new GetInAppTcDataCommand(this.cmpData);
    const getVendorListCommand = new GetVendorListCommand(this.cmpData);

    this.commandInvoker = new CommandInvoker(this.cmpData);
    this.commandInvoker.registerCommand(Commands.PING, pingCommand);
    this.commandInvoker.registerCommand(Commands.GET_TC_DATA, getTcDataCommand);
    this.commandInvoker.registerCommand(Commands.GET_IN_APP_TC_DATA, getInAppTcDataCommand);
    this.commandInvoker.registerCommand(Commands.GET_VENDOR_LIST, getVendorListCommand);

  }

  public setTCModel(tcm: TCModel, eventStatus?: EventStatus): void {

    this.cmpData.tcModel = tcm;
    this.cmpData.eventStatus = eventStatus || this.cmpData.eventStatus;
    this.processQueues();

  }

  public setGdprApplies(applies: boolean): void {

    this.cmpData.gdprApplies = applies;

  }

  public setCmpStatus(cmpStatus: CmpStatus): void {

    this.cmpData.cmpStatus = cmpStatus;

  }

  public setDisplayStatus(displayStatus: DisplayStatus): void {

    this.cmpData.displayStatus = displayStatus;

  }

  public addEventListener(callback: TCDataCallback): void {

    // const builder: TCDataBuilder = new TCDataBuilder();
    //
    // if (builder.isBuildable()) {
    //
    //   callback(builder.build(), true);
    //
    // } else {
    //
    //   // queue it until we can build it
    // }

  }

  public removeEventListener(callback: TCDataCallback, registeredCallback: TCDataCallback): void {
  }

  private processQueues() {

  }

  // /**
  //  * Sets all the fields on a Return object using current cmp api data
  //  * @param {Return} returnObj a Return object
  //  */
  // private setReturnFields(returnObj: Return): void {
  //
  //   returnObj.cmpId = this.cmpData.cmpId;
  //   returnObj.cmpVersion = this.cmpData.cmpVersion;
  //   returnObj.gdprApplies = this.cmpData.gdprApplies;
  //   returnObj.tcfPolicyVersion = this.cmpData.tcfPolicyVersion;
  //
  // }

  /**
   * Returns the page call handler function with a reference to this api
   * @return {PageCallHandler}
   */
  private getPageCallHandler(): PageCallHandler {

    return (command: string, version: number, callback: Callback, param?: Param): void => {

      const _this = this;

      _this.pageCallHandler(command, version, callback, param);

    };

  }

  /**
   * Handler for all page call commands
   * @type {PageCallHandler}
   * @param {string} command
   * @param {number} version
   * @param {Callback} callback
   * @param {Param} param
   */
  private pageCallHandler(command: string, version: number, callback: Callback, param?: Param): void {

    if (!this.validateCommand(command, version, callback)) {

      /**
       * Command didn't pass basic validation. Further processing of this command will stop here.
       */
      return;

    }

    /**
     * Map command strings to their appropriate commands
     */

    switch (command) {

      case Commands.PING: {

        this.commandInvoker.execute(Commands.PING, callback, param);
        break;

      }

      case Commands.GET_TC_DATA: {

        // Todo: where are we going to queue up commands?

        this.commandInvoker.execute(Commands.GET_TC_DATA, callback, param);
        break;

      }

      case Commands.GET_IN_APP_TC_DATA: {

        // Todo: where are we going to queue up commands?

        this.commandInvoker.execute(Commands.GET_TC_DATA, callback, param);
        break;

      }

      case Commands.GET_VENDOR_LIST: {

        // Todo: where are we going to queue up commands?

        // TODO: Implement get vendor list

        this.commandInvoker.execute(Commands.GET_VENDOR_LIST, callback, param);
        break;

      }

      case Commands.ADD_EVENT_LISTENER: {

        // Todo: where are we going to queue up commands?

        this.addEventListener(callback as TCDataCallback);
        break;

      }

      case Commands.REMOVE_EVENT_LISTENER: {

        // Todo: where are we going to queue up commands?

        this.removeEventListener(callback as TCDataCallback, callback as TCDataCallback);
        break;

      }

      default: {

        if (Validation.isFunction(this.customMethods[command])) {

          /**
           * If custom methods were set, process them here.
           * Todo: Handle custom commands
           */

        } else {

          /**
           * Command is not supported and has no custom methods defined
           */

          CmpApiUtil.failCallback(callback, `${command} command ${CmpApi.NOT_SUPPORTED}`);
          break;

        }

        break;

      }

    }

  }

  /**
   * Validates that the common parameters used to execute a command are valid
   * // Todo: possibly move into validation class as static
   * @param {string} command
   * @param {string} version
   * @param {Callback} callback
   * @return {boolean}
   */
  private validateCommand(command: string, version: number, callback: Callback): boolean {

    if (!Validation.isNonEmptyString(command)) {

      CmpApiUtil.failCallback(callback, `Command bust be a non-null or non-empty string`);
      return false;

    }

    if (!(Validation.isIntegerGtrOne(version) || version === null || version === undefined)) {

      CmpApiUtil.failCallback(callback, `Version ${version} ${CmpApi.NOT_SUPPORTED}`);
      return false;

    }

    if (typeof callback !== 'function') {

      CmpApiUtil.error(`callback required`);
      return false;

    }

    return true;

  }

}
