import {TCModel, TCString} from '@iabtcf/core';
import {Commands} from './Commands';

import {Ping, TCData} from './model';

import {InAppTCDataBuilder, TCDataBuilder} from './model/builder';
import {Return} from './model/Return';

import {CmpStatus, DisplayStatus, EventStatus} from './model/status';

import {ArgSet, Callback, IATCDataCallback, PageCallHandler, Param, PingCallback, TCDataCallback} from './Types';

export type Numberish = number | string;

/**
 * Consent Management Platform API
 */
export class CmpApi {

  private static readonly API_FUNCTION_NAME: string = '__tcfapi';
  private static readonly API_LOCATOR_NAME: string = '__tcfapiLocator';

  private static NOT_SUPPORTED: string = 'not supported by this CMP';
  private static EXISTING_CMP: string = 'CMP Exists already – cannot create';
  private static TC_MODEL_INVALID: string = 'CMP Model is not in a valid state';

  private tcModel: TCModel;
  private tcString: TCString = new TCString();

  private gdprApplies: boolean;
  private eventStatus: EventStatus;
  private cmpStatus: CmpStatus = CmpStatus.LOADING;
  private displayStatus: DisplayStatus = DisplayStatus.HIDDEN;

  private cmpId: number;
  private cmpVersion: number;
  private tcfPolicyVersion: number = 2;

  private queuedArgSets: ArgSet[];
  private eventArgSets: ArgSet[];

  private win: Window = window;
  private customMethods = {};

  // Todo: should we type this?

  public constructor(cmpId: number, cmpVersion: number) {

    this.cmpId = cmpId;
    this.cmpVersion = cmpVersion;

    /**
     * Check for locator frame, if there is a stub then this should have been
     * created if not, we'll need to create it to be able to handle other
     * frames calling
     */

    let frame = this.win;
    let locatorFrameExists = false;

    while (frame) {

      try {

        /**
         * throws a reference error if no frames exist
         */

        if (frame.frames[CmpApi.API_LOCATOR_NAME]) {

          locatorFrameExists = true;
          break;

        }

      } catch (ignore) {}

      if (frame === this.win.top) {

        break;

      }

      frame = frame.parent;

    }

    if (locatorFrameExists) {

      /**
       * If the locator frame exists, then that could mean one of two things:
       * either 1. it's the stub, or 2. it's another CMP.  If it's the stub
       * we'll want to capture the queue, otherwise we'll just die because we
       * can't have two CMPs on a page
       */

      if (frame === this.win) {

        /**
         * This is the same window as ours, now we can create the API lets see
         * if this is the stub
         */

        this.win[CmpApi.API_FUNCTION_NAME]('ping', 2, (ping: Ping): void => {

          if (!ping.cmpLoaded && ping.cmpStatus === CmpStatus.STUB) {

            /**
             * this is our stub, we are all clear to load the full API
             */

            try {

              this.queuedArgSets = this.win[CmpApi.API_FUNCTION_NAME]();

            } catch (ignore) {

              this.queuedArgSets = [];

            }

            /**
             * Hook up handlePageCall function
             */
            /* eslint-disable-next-line */
            this.win[CmpApi.API_FUNCTION_NAME] = this.getPageCallHandler();

          } else {

            /**
             * Something exists on this page already, so we're not going to create an API
             */

            throw new Error(CmpApi.EXISTING_CMP);

          }

        });

      } else {

        throw new Error(CmpApi.EXISTING_CMP);

      }

    } else {

      /**
       * A stub didn't exist, so we have free reign to do whatever we want now.
       */
      this.addFrame();

      /**
       * Hook up handlePageCall function
       */
      /* eslint-disable-next-line */
      this.win[CmpApi.API_FUNCTION_NAME] = this.getPageCallHandler();

    }

  }

  private addFrame(): void {

    const doc = this.win.document;

    if (doc.body) {

      /**
       * check for body tag – otherwise we'll be
       * be having a hard time appending a child
       * to it if it doesn't exist
       */

      const iframe = doc.createElement('iframe');

      iframe.style.cssText = 'display:none';
      iframe.name = CmpApi.API_LOCATOR_NAME;
      doc.body.appendChild(iframe);

    } else {

      /**
       * Wait for the body tag to exist.
       */

      setTimeout(this.addFrame, 5);

    }

  }

  public setTCModel(tcm: TCModel, eventStatus?: EventStatus): void {

    if (tcm.isValid()) {

      this.tcModel = tcm;
      this.eventStatus = eventStatus || this.eventStatus;
      this.processQueues();

    } else {

      throw new Error(CmpApi.TC_MODEL_INVALID);

    }

  }

  public setGdprApplies(applies: boolean): void {

    this.gdprApplies = applies;

  }

  public setCmpStatus(cmpStatus: CmpStatus): void {

    this.cmpStatus = cmpStatus;

  }

  public setDisplayStatus(displayStatus: DisplayStatus): void {

    this.displayStatus = displayStatus;

  }

  /**
   * Public-facing CMP API commands
   */

  public getTCData(callback: TCDataCallback, vendors?: number[]): void{

    if (this.tcModel) {

      const tcData = new TCData(this.tcModel, this.tcString.encode(this.tcModel), this.eventStatus);
      this.setReturnFields(tcData);
      callback(tcData, true);

    } else {

      // queue it until we can build it
    }

  }

  public ping(callback: PingCallback): void {

    const ping = new Ping();
    this.setReturnFields(ping);

    if (this.tcModel) {

      ping.gvlVersion = this.tcModel.gvl.gvlSpecificationVersion;

    }

    ping.apiVersion = '3'; // todo: Where do I get this?
    ping.cmpStatus = this.cmpStatus;
    ping.displayStatus = this.displayStatus;
    ping.cmpLoaded = true;

    callback(ping);

  }

  /**
   * Sets all the fields on a Return object using current cmp api data
   * @param {Return} returnObj a Return object
   */
  private setReturnFields(returnObj: Return): void {

    returnObj.cmpId = this.cmpId;
    returnObj.cmpVersion = this.cmpVersion;
    returnObj.gdprApplies = this.gdprApplies;
    returnObj.tcfPolicyVersion = this.tcfPolicyVersion;

  }

  public getInAppTCData(callback: IATCDataCallback): void {

    const builder: InAppTCDataBuilder = new InAppTCDataBuilder();

    if (builder.isBuildable()) {

      callback(builder.build(), true);

    } else {

      // queue it until we can build it
    }

  }

  public addEventListener(callback: TCDataCallback): void {

    const builder: TCDataBuilder = new TCDataBuilder();

    if (builder.isBuildable()) {

      callback(builder.build(), true);

    } else {

      // queue it until we can build it
    }

  }

  public removeEventListener(callback: TCDataCallback, registeredCallback: TCDataCallback): void {
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Returns the page call handler function with a reference to this api
   * @return PageCallHandler
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

        this.ping(callback as PingCallback);
        break;

      }

      case Commands.GET_TC_DATA: {

        this.getTCData(callback as TCDataCallback, param as number[]);
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
   * @param command
   * @param version
   * @param callback
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
