import {TCModel} from '@iabtcf/core';
import {CmpCommandStream} from './CmpCommandStream';
import {CmpData} from './CmpData';
import {Commands, GetInAppTcDataCommand, GetTcDataCommand, GetVendorListCommand, PingCommand} from './Commands';
import {CommandInvoker} from './Invoker/CommandInvoker';
import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {ArgSet, Callback, PageCallHandler, Param, TCDataCallback} from './types';

/**
 * Consent Management Platform API
 */
export class CmpApi {

  private static NOT_SUPPORTED: string = 'not supported by this CMP';

  private readonly commandStream: CmpCommandStream;

  private readonly commandInvoker: CommandInvoker;

  private readonly cmpData: CmpData;

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
   * Handler for page call commands
   * @type {PageCallHandler}
   * @param {string} command
   * @param {number} version
   * @param {Callback} callback
   * @param {Param} param
   */
  private pageCallHandler(command: string, version: number, callback: Callback, param?: Param): void {

    this.validateCommand(command, version, callback);

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

        // check if trying to execute a custom command
        if (typeof this.customMethods[command] === 'function') {

          // execute custom methods

        }

        this.error(`${command} command ${CmpApi.NOT_SUPPORTED}`);
        break;

      }

    }

  }

  /**
   * Validates that the parameters used to execute a command are valid
   * @param {string} command
   * @param {string} version
   * @param {Callback} callback
   */
  private validateCommand(command: string, version: number, callback: Callback): void {

    // todo: what about params?

    if (!command) {

      this.error(`Command string must not be null or empty.`);

    }

    if (version !== 2) {

      this.error(`Version ${version} ${CmpApi.NOT_SUPPORTED}`);

    }

    if (typeof callback !== 'function') {

      this.error(`callback required`);

    }

  }

  private error(msg: string): void {

    console.error(msg);

  }

  private processQueues() {

  }

}
