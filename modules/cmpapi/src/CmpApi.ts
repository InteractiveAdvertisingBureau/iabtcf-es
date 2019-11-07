import {TCModel} from '@iabtcf/core';
import {CmpCommandStream} from './CmpCommandStream';
import {CmpData} from './CmpData';
import {Commands, GetTcDataCommand, PingCommand} from './Commands';
import {CommandInvoker} from './Invoker/CommandInvoker';
import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {ArgSet, Callback, IATCDataCallback, PageCallHandler, Param, TCDataCallback} from './types';

/**
 * Consent Management Platform API
 */
export class CmpApi {

  private static NOT_SUPPORTED: string = 'not supported by this CMP';

  private commandStream: CmpCommandStream;

  private commandInvoker: CommandInvoker;

  private cmpData: CmpData;

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
    this.commandInvoker = new CommandInvoker(this.cmpData);
    this.commandInvoker.registerCommand(Commands.PING, pingCommand);
    this.commandInvoker.registerCommand(Commands.GET_TC_DATA, getTcDataCommand);

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

  // public ping(callback: PingCallback): void {
  //
  //   const ping = new Ping();
  //   this.setReturnFields(ping);
  //
  //   if (this.cmpData.tcModel) {
  //
  //     ping.gvlVersion = this.cmpData.tcModel.gvl.gvlSpecificationVersion;
  //
  //   }
  //
  //   ping.apiVersion = '3'; // todo: Where do I get this?
  //   ping.cmpStatus = this.cmpData.cmpStatus;
  //   ping.displayStatus = this.cmpData.displayStatus;
  //   ping.cmpLoaded = true;
  //
  //   callback(ping);
  //
  // }
  //
  // /**
  //  * getTCData - Public-facing CMP API commands
  //  *
  //  * @param {TCDataCallback} callback - callback to call when function
  //  * @param {number[]} vendorIds? - optional list of vendor ids
  //  * @return {void}
  //  */
  // public getTCData(callback: TCDataCallback, vendorIds?: number[]): void{
  //
  //   // Todo: Handle vendors list
  //
  //   if (vendorIds) {
  //
  //     if (!this.isVendorsListValid(vendorIds)) {
  //
  //       callback(null, false);
  //
  //     }
  //
  //   }
  //
  //   if (this.cmpData.tcModel) {
  //
  //     const tcData = new TCData(this.cmpData.tcModel, this.cmpData.eventStatus, vendorIds);
  //     this.setReturnFields(tcData);
  //     callback(tcData, true);
  //
  //   } else {
  //
  //     // queue it until we can build it
  //   }
  //
  // }
  //
  // /**
  //  * Validates a vendor id list
  //  * @param {number[]} vendorIds
  //  * @return {boolean}
  //  */
  // private isVendorsListValid(vendorIds: number[]): boolean {
  //
  //   return Array.isArray(vendorIds) && vendorIds.every((vendorId) => Number.isInteger(vendorId) && vendorId > 0);
  //
  // }

  public getInAppTCData(callback: IATCDataCallback): void {

    // const builder: InAppTCDataBuilder = new InAppTCDataBuilder();
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

      _this.handlePageCall(command, version, callback, param);

    };

  }

  /**
   * Handler for page calls
   */
  /* eslint-disable-next-line */
  private handlePageCall(command: string, version: number, callback: Callback, param?: Param): void {

    this.validateCommand(command, version, callback);

    switch (command) {

      case Commands.PING: {

        this.commandInvoker.execute(Commands.PING, callback, param);
        break;

      }

      case Commands.GET_TC_DATA: {

        this.commandInvoker.execute(Commands.GET_TC_DATA, callback, param);
        break;

      }

      case Commands.GET_IN_APP_TC_DATA: {

        this.commandInvoker.execute(Commands.GET_TC_DATA, callback, param);
        break;

      }

      case Commands.ADD_EVENT_LISTENER: {

        this.addEventListener(callback as TCDataCallback);
        break;

      }

      case Commands.REMOVE_EVENT_LISTENER: {

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
