import {
  TCModel,
  TCString,
} from '@iabtcf/core';

import {
  Ping,
} from './model';

import {
  CmpStatus,
  DisplayStatus,
  EventStatus,
} from './model/status';

import {

  InAppTCDataBuilder,
  TCDataBuilder,
  PingBuilder,

} from './model/builder';

import {
  Param,
  ArgSet,
  TCDataCallback,
  IATCDataCallback,
  PingCallback,
  Callback,
} from './Types';

export type Numberish = number | string;

export class CmpApi {

  private static readonly API_FUNCTION_NAME: string = '__tcfapi';
  private static readonly API_LOCATOR_NAME: string = '__tcfapiLocator';

  private static NOT_SUPPORTED: string = 'not supported by this CMP';
  private static EXISTING_CMP: string = 'CMP Exists already – cannot create';

  private tcModel: TCModel;
  private tcString: TCString = new TCString();
  private gdprApplies: boolean;
  private cmpStatus: CmpStatus;
  private displayStatus: DisplayStatus;
  private eventStatus: EventStatus;

  /* eslint-disable-next-line */
  private queuedArgSets: ArgSet[];
  private win: Window = window;

  public constructor() {

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
            this.win[CmpApi.API_FUNCTION_NAME] = this.handlePageCall;

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
       * A stub didn't exist, so we have free reign to do whateve we want now.
       */
      this.addFrame();

      /**
       * Hook up handlePageCall function
       */
      /* eslint-disable-next-line */
      this.win[CmpApi.API_FUNCTION_NAME] = this.handlePageCall;

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

  public setTCModel(tcm: TCModel, eventStatus: EventStatus): void {

    this.tcModel = tcm;
    this.eventStatus = eventStatus;

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

  public getTCData(callback: TCDataCallback, vendors: number[]): void{

    const builder: TCDataBuilder = new TCDataBuilder();

    if (builder.isBuildable()) {

      callback(builder.build(), true);

    } else {

      // queue it until we can build it
    }

  }

  public getInAppTCData(callback: IATCDataCallback): void {

    const builder: InAppTCDataBuilder = new InAppTCDataBuilder();

    if (builder.isBuildable()) {

      callback(builder.build(), true);

    } else {

      // queue it until we can build it
    }

  }

  public ping(callback: PingCallback): void {

    const builder: PingBuilder = new PingBuilder();

    if (builder.isBuildable()) {

      callback(builder.build());

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

  public removeventListener(callback: TCDataCallback, registeredCallback: TCDataCallback): void {
  }

  /**
   * Handler for page calls
   */
  /* eslint-disable-next-line */
  private handlePageCall(command: string, version: number, callback: Callback, param?: Param): void {

    if (typeof this[command] === 'function') {

      if (version === 2) {

        if (typeof callback === 'function') {

          this[command](callback, param);

        } else {

          this.error(`callback required`);

        }

      } else {

        this.error(`Version ${version} ${CmpApi.NOT_SUPPORTED}`);

      }

    } else {

      this.error(`${command} command ${CmpApi.NOT_SUPPORTED}`);

    }

  }
  private error(msg: string): void {

    console.error(msg);

  }

}
