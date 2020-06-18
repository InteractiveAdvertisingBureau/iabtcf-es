/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Callback,
  CmpStatus,
  TCFAPIFunction,
  TCFAPIArgs,
  TCFAPI_KEY,
  TCFAPI_LOCATOR,
  TCFAPIPostMessageCall,
  TCFAPIPostMessageReturn,
  TCFAPI_POSTMSG_CALL,
  TCFAPI_POSTMSG_RETURN,
  TCFCommands,
} from '@iabtcf/cmpapi';

export class StubCmpApi {

  private static POST_MESSAGE_EVENT = 'message';
  private static readonly TARGET_ORIGIN = '*';
  private static readonly GDPR_APPLIES_COMMAND = 'setGdprApplies';

  private queue: TCFAPIArgs[] = [];
  private callId = 0;
  private gdprApplies: boolean;

  public constructor() {

    if (window[TCFAPI_KEY] === undefined) {

      window[TCFAPI_KEY] = this.apiCall.bind(this);
      this.addLocatorFrame();
      window.addEventListener(StubCmpApi.POST_MESSAGE_EVENT, this.postMessageApiCall);

    }

  }

  private apiCall(command?: string, version?: number | null, callback?: Callback, ...params): void | TCFAPIArgs[] {

    const hasCallback = (typeof callback === 'function');

    if (!command) {

      /**
       * shortcut to get the queue when the full CMP
       * implementation loads; it can call __tcfapi
       * with no arguments to get the queued arguments
       */

      return this.queue;

    } else if (command === StubCmpApi.GDPR_APPLIES_COMMAND) {

      /**
       * Most CMPs upon load will have some form of determining whether
       * or not GDPR Applies to this particular user and so this value
       * generally can't be known before the CMP loads.  However, there
       * are cases where a site knows that they need to apply GDPR to
       * all traffic; like if the site is based in the EU.  This command
       * enables that value to be set upon the stub response.
       *
       * This command is not specified in the TCF and so no callback is
       * necessary and therefor is optional.
       */

      this.gdprApplies = params[0];

      if (hasCallback) {

        callback(null, true);

      }

    } else if (command === TCFCommands.PING && hasCallback) {

      /**
       * This is the only method required from a stub.
       */

      callback({
        gdprApplies: this.gdprApplies,
        cmpLoaded: false,
        cmpStatus: CmpStatus.STUB,
      });

    } else {

      /**
       * some other method, just queue it for the
       * full CMP implementation to deal with
       */

      this.queue.push([command, version, callback, ...params]);

    }

  }

  private addLocatorFrame(): void {

    if (!window.frames[TCFAPI_LOCATOR]) {

      if (document.body) {

        const iframe = document.createElement('iframe');

        iframe.style.cssText = 'display:none';
        iframe.name = TCFAPI_LOCATOR;
        document.body.appendChild(iframe);

      } else {

        setTimeout(this.addLocatorFrame, 5);

      }

    }

  }

  private postMessageApiCall(event: MessageEvent): void {

    if (event && event.data) {

      let call: TCFAPIPostMessageCall;

      if (typeof event.data === 'string') {

        try {

          /**
           * Try to parse the data from the event; there is no guarantee
           * that this string is a stringified object – in fact it's
           * probably more likely that it's not.
           */

          call = JSON.parse(event.data)[TCFAPI_POSTMSG_CALL];

        } catch (ignore) {/* oh well... */}

      } else if (typeof event.data === 'object') {

        call = event.data[TCFAPI_POSTMSG_CALL];

      }

      if (call) {

        const {command, version, parameter} = call;

        const wrapperCallback: Callback = (returnValue?: any, success?: boolean): void => {

          if (event.source !== null) {

            const response = {
              [TCFAPI_POSTMSG_RETURN]: {
                returnValue,
                success,
                callId: this.callId,
              },
            };

            (event.source as WindowProxy).postMessage(response, StubCmpApi.TARGET_ORIGIN);

          }

        };

        (window[TCFAPI_KEY] as TCFAPIFunction)(command, version, wrapperCallback, parameter);

        this.callId++;

      }

    }

  }

}
