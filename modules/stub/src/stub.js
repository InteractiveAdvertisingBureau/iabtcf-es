(function () {
  const TCF_LOCATOR_NAME = '__tcfapiLocator';

  function makeStub() {
    const queue = [];
    const currentWindow = window;
    let frameLocator = window;
    let hasEventListener = false;
    let cmpFrame;

    function addFrame() {
      const doc = currentWindow.document;

      if (!currentWindow.frames[TCF_LOCATOR_NAME]) {
        if (doc.readyState === 'interactive' || doc.readyState === 'complete') {
          const iframe = doc.createElement('iframe');

          iframe.style.display = 'none';
          iframe.name = TCF_LOCATOR_NAME;
          doc.body.appendChild(iframe);

          if (hasEventListener) {
            doc.removeEventListener('readystatechange', addFrame);
            hasEventListener = false;
          }
        } else if (typeof doc.addEventListener === 'function') {
          doc.addEventListener('readystatechange', addFrame);
          hasEventListener = true;
        } else {
          setTimeout(addFrame, 5);
        }
      }

      return !otherCMP;
    }

    function tcfAPIHandler(...args) {
      let gdprApplies;

      if (!args.length) {
        /**
         * shortcut to get the queue when the full CMP
         * implementation loads; it can call tcfapiHandler()
         * with no arguments to get the queued arguments
         */
        return queue;
      }

      const callbackFn = args[2];

      switch (args[0]) {
        case 'setGdprApplies':
          /**
           * shortcut to set gdprApplies if the publisher
           * knows that they apply GDPR rules to all
           * traffic (see the section on "What does the
           * gdprApplies value mean") for more
           */
          if (args.length > 3 && parseInt(args[1], 10) === 2 && typeof args[3] === 'boolean') {
            gdprApplies = args[3];

            if (typeof callbackFn === 'function') {
              callbackFn('set', true);
            }
          }
          break
        case 'ping':
          /**
           * Only supported method; give PingReturn
           * object as response
           */
          if (typeof callbackFn === 'function') {
            callbackFn({
              gdprApplies: gdprApplies,
              cmpLoaded: false,
              cmpStatus: 'stub'
            });
          }
          break;
        default:
          /**
           * some other method, just queue it for the
           * full CMP implementation to deal with
           */
          queue.push(args);
          break;
      }
    }

    function postMessageEventHandler(event) {
      if (!event || !event.source || !event.source.postMessage) {
        /**
         * either invalid function call or "postMessage"
         * isn't available on calling side
         * either way return early
         */
        return
      }

      const msgIsString = typeof event.data === 'string';
      let json = event.data;

      if (msgIsString) {
        try {
          /**
           * Try to parse the data from the event. This is important
           * to have in a try/catch because often messages may come
           * through that are not JSON
           */
          json = JSON.parse(event.data);
        } catch (ignore) {
          /**
           * Since it's not possible to parse the given message
           * return early
           */
          return
        }
      }

      if (typeof json === 'object' && json.__tcfapiCall) {
        const payload = json.__tcfapiCall;

        window.__tcfapi(
          payload.command,
          payload.version,
          (retValue, success) => {
            const returnMsg = {
              __tcfapiReturn: {
                returnValue: retValue,
                success: success,
                callId: payload.callId
              }
            };

            event.source.postMessage(
              (msgIsString) ? JSON.stringify(returnMsg) : returnMsg,
              '*'
            );
          },
          payload.parameter,
        );
      }
    }

    /**
     * Iterate up to the top window checking for an already-created
     * "__tcfapilLocator" frame on every level. If one exists already then we are
     * not the master CMP and will not queue commands.
     */
    while (frameLocator) {
      try {
        if (frameLocator.frames[TCF_LOCATOR_NAME]) {
          cmpFrame = frameLocator;
          break;
        }
      } catch (ignore) { }

      // if we're at the top and no cmpFrame
      if (frameLocator === currentWindow.top) {
        break;
      }

      // Move up
      frameLocator = frameLocator.parent;
    }

    if (!cmpFrame) {
      // we have recur'd up the windows and have found no __tcfapiLocator frame
      addFrame();
      currentWindow.__tcfapi = tcfAPIHandler;
      currentWindow.addEventListener('message', postMessageEventHandler, false);
    }
  };

  if (typeof module !== 'undefined') {
    module.exports = makeStub;
  } else {
    makeStub();
  }
})();
