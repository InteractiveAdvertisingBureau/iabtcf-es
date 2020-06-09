(() => {

  const makeStub = () => {

    if (!(window.frames[TCF_LOCATOR_NAME])) {

      if (document.body) {

        const TCF_API_NAME = '__tcfapi';
        const EVENT_NAME = 'message';
        const TCF_POST_MSG_CALL = TCF_API_NAME + 'Call';
        const TCF_POST_MSG_RETURN = TCF_API_NAME + 'Return';
        const TCF_LOCATOR_NAME = TCF_API_NAME + 'Locator';
        const CMP_STATUS = 'stub';
        const TARGET_ORIGIN = '*';
        const PING_COMMAND = 'ping';
        const GDPR_APPLIES_COMMAND = 'setGdprApplies';
        const iframe = document.createElement('iframe');

        /**
         * Create the locator frame in this frame since we've established that
         * none exists in this frame.  This is to prevent instances of this
         * script from overriding each other.  If this one queues calls and
         * gets overridden then the queue is lost and calls are dropped.
         */
        iframe.style.cssText = 'display:none';
        iframe.name = TCF_LOCATOR_NAME;
        document.body.appendChild(iframe);

        if (window === window.top || !(window.parent.frames[TCF_LOCATOR_NAME])) {

          /**
           * There are no parent stubs or CMPs, so it falls on this instance to
           * collect calls in a queue
           */

          const queue = [];

          window[TCF_API_NAME] = (command, version, callback, parameter) => {

            let gdprApplies;

            if (!command) {

              /**
               * shortcut to get the queue when the full CMP
               * implementation loads; it can call __tcfapi
               * with no arguments to get the queued arguments
               */

              return queue;

            } else if (command === GDPR_APPLIES_COMMAND) {

              /**
               * shortcut to set gdprApplies if the publisher
               * knows that they apply GDPR rules to all
               * traffic (see the section on "What does the
               * gdprApplies value mean" for more
               */

              gdprApplies = parameter;

              if (callback) {

                callback(null, true);

              }

            } else if (command === PING_COMMAND) {

              /**
               * Only supported method; give PingReturn
               * object as response
               */

              if (callback) {

                callback({
                  gdprApplies,
                  cmpLoaded: false,
                  cmpStatus: CMP_STATUS,
                }, true);

              }

            } else {

              /**
               * some other method, just queue it for the
               * full CMP implementation to deal with
               */

              queue.push([command, version, callback, parameter]);

            }

          };

          const postMessageEventHandler = (event) => {

            if (event && event.source && event.source.postMessage) {

              const msgIsString = typeof event.data === 'string';
              let json = {};

              if (msgIsString) {

                try {

                  /**
                   * Try to parse the data from the event.  It is important to
                   * have in a try/catch because often string messages may come
                   * through that are not json
                   */

                  json = JSON.parse(event.data);

                } catch (ignore) {/* oh well... */}

              } else {

                json = event.data;

              }

              const payload = json[TCF_POST_MSG_CALL];

              if (payload) {

                const {command, version, callId, parameter} = payload;

                const wrapperCallback = (returnValue, success) => {

                  let returnMsg = {
                    [TCF_POST_MSG_RETURN]: {
                      returnValue,
                      success,
                      callId,
                    },
                  };

                  if (msgIsString) {

                    /**
                     * If it came in as a string it will be return in the same
                     * manner
                     */

                    returnMsg = JSON.stringify(returnMsg);

                  }

                  event.source.postMessage(returnMsg, TARGET_ORIGIN);

                };

                window[TCF_API_NAME](
                  command,
                  version,
                  wrapperCallback,
                  parameter,
                );

              }

            }

          };

          window.addEventListener(EVENT_NAME, postMessageEventHandler);

        } else {

          let callId = 0;
          const callMap = new Map();

          window[TCF_API_NAME] = (command, version, callback, parameter) => {

            callMap.set(callId, callback);

            const msg = {
              [TCF_POST_MSG_CALL]: {
                command,
                parameter,
                version,
                callId,
              },
            };

            window.parent.postMessage(msg, TARGET_ORIGIN);
            callId++;

          };

          const responseHandler = () => {

            let json;

            if (typeof event.data === 'string') {

              try {

                json = JSON.parse(event.data);

              } catch (ignore) {}

            } else if ( typeof event.data === 'object') {

              json = event.data;

            }

            const payload = json[TCF_POST_MSG_RETURN];

            if (payload && callMap.has(payload.callId)) {

              const callback = callMap.get(payload.callId);

              callback(payload.returnValue, payload.success);
              callMap.delete(payload.callId);

            }

          };

          window.addEventListener(EVENT_NAME, responseHandler, false);

        }

      } else {

        setTimeout(makeStub, 5);

      }

    }

  };

  if (module !== undefined) {

    module.exports = makeStub;

  } else {

    makeStub();

  }

})();
