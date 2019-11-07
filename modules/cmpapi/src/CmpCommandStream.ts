import {Ping} from './model';
import {CmpStatus} from './status';
import {ArgSet, PageCallHandler} from './types';

/**
 * Initializes CMP frame and hooks up the provided PageCallHandler function to stream commands through
 */
export class CmpCommandStream {

  private static readonly API_FUNCTION_NAME: string = '__tcfapi';
  private static readonly API_LOCATOR_NAME: string = '__tcfapiLocator';

  private static EXISTING_CMP: string = 'CMP Exists already – cannot create';

  private win: Window = window;

  private queuedArgSets: ArgSet[];

  /**
   * Constructor
   * @param {PageCallHandler} pageCallHandler
   */
  public constructor(pageCallHandler: PageCallHandler) {

    this.initFrameAndCallHandler(pageCallHandler);

  }

  /**
   * Check for locator frame, if there is a stub then this should have been
   * created if not, we'll need to create it to be able to handle other
   * frames calling
   * @param {PageCallHandler} pageCallHandler
   */
  private initFrameAndCallHandler(pageCallHandler: PageCallHandler): void {

    let frame = this.win;
    let locatorFrameExists = false;

    while (frame) {

      try {

        /**
         * throws a reference error if no frames exist
         */

        if (frame.frames[CmpCommandStream.API_LOCATOR_NAME]) {

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

        this.win[CmpCommandStream.API_FUNCTION_NAME]('ping', 2, (ping: Ping): void => {

          if (!ping.cmpLoaded && ping.cmpStatus === CmpStatus.STUB) {

            /**
             * this is our stub, we are all clear to load the full API
             */

            try {

              this.queuedArgSets = this.win[CmpCommandStream.API_FUNCTION_NAME]();

            } catch (ignore) {

              this.queuedArgSets = [];

            }

            /**
             * Hook up handlePageCall function
             */

            this.replaceStubWithPageCallFunction(pageCallHandler);

          } else {

            /**
             * Something exists on this page already, so we're not going to create an API
             */

            throw new Error(CmpCommandStream.EXISTING_CMP);

          }

        });

      } else {

        throw new Error(CmpCommandStream.EXISTING_CMP);

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

  /**
   * Hook up handlePageCall function
   */
  private replaceStubWithPageCallFunction(pageCallHandler: PageCallHandler) {

    this.win[CmpCommandStream.API_FUNCTION_NAME] = pageCallHandler;

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
      iframe.name = CmpCommandStream.API_LOCATOR_NAME;
      doc.body.appendChild(iframe);

    } else {

      /**
       * Wait for the body tag to exist.
       */

      setTimeout(this.addFrame, 5);

    }

  }

}
