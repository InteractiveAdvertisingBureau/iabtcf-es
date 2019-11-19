import {Ping} from '../model';
import {CmpStatus} from '../status';
import {TcfApiArgSet, CommandArgsHandler, PageCallHandler} from '../types';
import {ValidationMessages, ValidationUtil} from '../validation';
import {Commands} from './commands';

/**
 * Initializes CMP frame and hooks up the provided PageCallHandler function to stream commands through
 */
export class CommandStream {

  private readonly API_FUNCTION_NAME: string = `__tcfapi`;

  private readonly API_LOCATOR_NAME: string = `__tcfapiLocator`;

  private win: Window = window;

  private queuedArgSets: TcfApiArgSet[];

  /**
   * Constructor
   * @param {PageCallHandler} pageCallHandler
   * @param {CommandArgsHandler} commandArgsHandler
   */
  public constructor(pageCallHandler: PageCallHandler, commandArgsHandler: CommandArgsHandler) {

    this.initFrameAndCallHandler(pageCallHandler, commandArgsHandler);

  }

  /**
   * Check for locator frame, if there is a stub then this should have been
   * created if not, we'll need to create it to be able to handle other
   * frames calling
   * @param {PageCallHandler} pageCallHandler
   * @param {CommandArgsHandler} commandArgsHandler
   */
  private initFrameAndCallHandler(pageCallHandler: PageCallHandler, commandArgsHandler: CommandArgsHandler): void {

    let frame = this.win;
    let locatorFrameExists = false;

    while (frame) {

      try {

        /**
         * throws a reference error if no frames exist
         */

        if (frame.frames[this.API_LOCATOR_NAME]) {

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
         * if this is the stub.
         */

        if (ValidationUtil.isFunction(this.__tcfapi)) {

          this.__tcfapi(Commands.PING, 2, (ping: Ping): void => {

            if (!ping.cmpLoaded && ping.cmpStatus === CmpStatus.STUB) {

              /**
               * this is our stub, we are all clear to load the full API and get queued commands
               */

              try {

                this.queuedArgSets = (this.__tcfapi)();

              } catch (ignore) {

                this.queuedArgSets = [];

              }

              commandArgsHandler(this.queuedArgSets);

              /**
               * Hook up handlePageCall function
               */

              this.replaceStubWithPageCallFunction(pageCallHandler);

            } else {

              /**
               * Something exists on this page already, so we're not going to create an API
               */

              throw new Error(ValidationMessages.EXISTING_CMP);

            }

          });

        }

      } else {

        throw new Error(ValidationMessages.EXISTING_CMP);

      }

    } else {

      /**
       * A stub didn't exist, so we have free reign to do whatever we want now.
       */

      this.addFrame();

      /**
       * Hook up handlePageCall function
       */

      this.replaceStubWithPageCallFunction(pageCallHandler);

    }

  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Gets the tcf api function from the window
   * @return {(...args) => unknown}
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private get __tcfapi(): (...args) => any {

    return this.win[this.API_FUNCTION_NAME];

  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Sets the tcf api function in the window
   * @param {(...args) => void} value
   * @private
   */
  private set __tcfapi(value) {

    this.win[this.API_FUNCTION_NAME] = value;

  }

  /**
   * Hook up handlePageCall function
   * @param {PageCallHandler} pageCallHandler
   */
  private replaceStubWithPageCallFunction(pageCallHandler: PageCallHandler): void {

    this.__tcfapi = pageCallHandler;

  }

  /**
   * Add new iFrame to current window body
   */
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
      iframe.name = this.API_LOCATOR_NAME;
      doc.body.appendChild(iframe);

    } else {

      /**
       * Wait for the body tag to exist.
       */

      setTimeout(this.addFrame, 5);

    }

  }

}
