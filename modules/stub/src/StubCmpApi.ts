import {TCFAPI_KEY, CmpStatus, TCFAPIArgs, TCFCommands, Callback} from '@iabtcf/cmpapi';

export class StubCmpApi {

  private static readonly POST_MESSAGE_EVENT = 'message';
  private static readonly TCF_POST_MSG_CALL = TCFAPI_KEY + 'Call';
  private static readonly TCF_POST_MSG_RETURN = TCFAPI_KEY + 'Return';
  private static readonly TCF_LOCATOR_NAME = TCFAPI_KEY + 'Locator';
  private static readonly TARGET_ORIGIN = '*';
  private static readonly GDPR_APPLIES_COMMAND = 'setGdprApplies';

  private queue: TCFAPIArgs[] = [];
  private gdprApplies: boolean;

  public constructor() {

    if (window[TCFAPI_KEY] === undefined) {

      window[TCFAPI_KEY] = this.apiCall.bind(this);
      this.addLocatorFrame();

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

    if (!window.frames[StubCmpApi.TCF_LOCATOR_NAME]) {

      if (document.body) {

        const iframe = document.createElement('iframe');

        iframe.style.cssText = 'display:none';
        iframe.name = StubCmpApi.TCF_LOCATOR_NAME;
        document.body.appendChild(iframe);

      } else {

        setTimeout(this.addLocatorFrame, 5);

      }

    }

  };

}
