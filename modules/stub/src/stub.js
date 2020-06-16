((win, doc) => {

  const TCF_API_NAME = '__tcfapi';
  const POST_MESSAGE_EVENT = 'message';
  const TCF_POST_MSG_CALL = TCF_API_NAME + 'Call';
  const TCF_POST_MSG_RETURN = TCF_API_NAME + 'Return';
  const TCF_LOCATOR_NAME = TCF_API_NAME + 'Locator';
  const CMP_STATUS = 'stub';
  const TARGET_ORIGIN = '*';
  const PING_COMMAND = 'ping';
  const GDPR_APPLIES_COMMAND = 'setGdprApplies';

  const makeStub = () => {

    const isLeader = (win === win.top && win[TCF_API_NAME] === undefined);

    const getPoxyingMethod = () => {

      const callMap = new Map();
      let callId = 0;

      return (command, version, callback, parameter) => {

        const call ={
          callback,
          command,
          version,
          parameter,
        };

        callMap.set(callId, call);

        win.top.postMessage({
          [TCF_POST_MSG_CALL]: {
            command,
            parameter,
            version,
            callId,
          },
        }, TARGET_ORIGIN);

        callId++;

      };

    };

    const getQueingMethod = () => {

      const queue = [];
      let gdprApplies;

      return (command, version, callback, parameter) => {

        const hasCallback = (typeof callback === 'function');

        if (!command) {

          /**
           * shortcut to get the queue when the full CMP
           * implementation loads; it can call __tcfapi
           * with no arguments to get the queued arguments
           */

          return queue;

        } else if (command === GDPR_APPLIES_COMMAND) {

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

          gdprApplies = parameter;

          if (hasCallback) {

            callback(null, true);

          }

        } else if (command === PING_COMMAND && hasCallback) {

          /**
             * This is the only method required from a stub.
             */

          callback({
            gdprApplies,
            cmpLoaded: false,
            cmpStatus: CMP_STATUS,
          }, true);

        } else {

          /**
             * some other method, just queue it for the
             * full CMP implementation to deal with
             */

          queue.push([command, version, callback, parameter]);

        }

      };

    };

    /**
     * if this instance is running in window.top, then that is where a CMP
     * should be created and therefore where the queue should exist.  If not,
     * this stub exists likely as part of Ad Code inside of an iframe and
     * should then act as a proxy for calls from the Ad Code to the CMP.
     */

    if (isLeader) {

      win[TCF_API_NAME] = getQueingMethod();

    } else {

      win[TCF_API_NAME] = getPoxyingMethod();

    }

    /**
     * Create the locator frame if one doesn't exist here (it shouldn't).  With
     * this, we have to wait for the body to exist; for the rest of this script
     * we do not want to do that because we will miss any calls that are
     * placed in the head of the document.
     */

    const addLocatorFrame = () => {

      if (!win.frames[TCF_LOCATOR_NAME]) {

        if (doc.body) {

          const iframe = doc.createElement('iframe');

          iframe.style.cssText = 'display:none';
          iframe.name = TCF_LOCATOR_NAME;
          doc.body.appendChild(iframe);

        } else {

          setTimeout(addLocatorFrame, 5);

        }

      }

    };

    addLocatorFrame();

    /**
     * Listen for postMessage calls
     */

    const callMap = new Map();
    const addEventListenerMap = new Map();

    win.addEventListener(POST_MESSAGE_EVENT, (event) => {

      /**
       * Make sure an event with a source and date and way to respond are
       * available before doing anything with it.
       */

      if (event && event.data) {

        if (typeof event.data === 'string') {

          try {

            /**
             * Try to parse the data from the event; there is no guarantee
             * that this string is a stringified object – in fact it's
             * probably more likely that it's not.
             */

            event.data = JSON.parse(event.data);

          } catch (ignore) {/* oh well... */}

        }

        if (typeof event.data === 'object') {

          if (isLeader && event.data[TCF_POST_MSG_CALL]) {

            /**
             * Since this instance is at the top, then the CMP exists here
             * and we'll wrap all postMessage callbacks. Otherwise, this
             * message should be ignored because this instance isn't tasked
             * with handling it.
             */

            const {command, version, callId, parameter} = event.data[TCF_POST_MSG_CALL];

            const wrapperCallback = (returnValue, success) => {

              if (event.source && event.source.postMessage) {

                event.source.postMessage({
                  [TCF_POST_MSG_RETURN]: {
                    returnValue,
                    success,
                    callId,
                  },
                }, TARGET_ORIGIN);

              }

            };

            win[TCF_API_NAME](
              command,
              version,
              wrapperCallback,
              parameter,
            );

          } else if (!isLeader && event.data[TCF_POST_MSG_RETURN]) {

            const {callId, returnValue, success} = event.data[TCF_POST_MSG_RETURN];

            if (callMap.has(callId)) {

              const call = callMap.get(callId);

              /**
               * Because an addEventListener command may have the callback
               * invoked more than once, we can not remove the mapping in the
               * callmap on that command.  Instead, when this is called
               * we'll store a map between the listenerId returned from the
               * CMP and the callId.  Later when the removeEventListener
               * command is called, the mapping will be used to delete entry
               * in the map.  If it's neither of those commands just delete
               * the mapping.
               */
              if (call.command == 'addEventListener') {

                addEventListenerMap.set(returnValue.listenerId, callId);

              } else {

                if (call.command == 'removeEventListener') {

                  const aelCallId = addEventListenerMap.get(call.parameter);

                  callMap.delete(aelCallId);
                  addEventListenerMap.delete(call.parameter);

                }

                callMap.delete(payload.callId);

              }

            }

            call.callback(returnValue, success);

          }

        }

      }

    });

  };

  if (module !== undefined) {

    module.exports = makeStub;

  } else {

    makeStub();

  }

})(window, document);
