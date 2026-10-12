(function () {
  const makeStub = () => {
    const TCF_LOCATOR_NAME = '__tcfapiLocator';
    const queue = [];
    const currentWindow = window;
    let frameLocator = currentWindow;
    let cmpFrame;
    let gdprApplies;

    function addFrame() {
      const doc = currentWindow.document;
      const otherCMP = !!(currentWindow.frames[TCF_LOCATOR_NAME]);

      if (!otherCMP) {
        if (doc.body) {
          const iframe = doc.createElement('iframe');

          iframe.style.cssText = 'display:none';
          iframe.name = TCF_LOCATOR_NAME;
          doc.body.appendChild(iframe);
        } else {
          setTimeout(addFrame, 5);
        }
      }

      return !otherCMP;
    }

    function tcfAPIHandler(...args) {
      if (!args.length) {
        /**
         * shortcut to get the queue when the full CMP
         * implementation loads; it can call tcfapiHandler()
         * with no arguments to get the queued arguments
         */

        return queue;
      } else if (args[0] === 'setGdprApplies') {
        /**
         * shortcut to set gdprApplies if the publisher
         * knows that they apply GDPR rules to all
         * traffic (see the section on "What does the
         * gdprApplies value mean" for more
         */
        if (args.length > 3 && parseInt(args[1], 10) === 2 && typeof args[3] === 'boolean') {
          gdprApplies = args[3];

          if (typeof args[2] === 'function') {
            args[2]('set', true);
          }
        }
      } else if (args[0] === 'ping') {
        /**
         * Only supported method; give PingReturn
         * object as response
         */
        if (typeof args[2] === 'function') {
          args[2]({
            gdprApplies: gdprApplies,
            cmpLoaded: false,
            cmpStatus: 'stub',
          });
        }
      } else {
        /**
         * some other method, just queue it for the
         * full CMP implementation to deal with
         */
        queue.push(args);
      }
    }

    function makePostMessageCallback(source, command, callId, msgIsString) {
      // Queued calls and listeners can outlive their sending iframe. Avoid
      // retaining the iframe when WeakRef is available, without requiring it
      // in older browsers. Capture only the reply data, not the MessageEvent.
      let sourceRef = source && typeof WeakRef === 'function' ? new WeakRef(source) : null;
      let fallbackSource = sourceRef ? null : source;

      return function (retValue, success) {
        const target = sourceRef ? sourceRef.deref() : fallbackSource;
        const returnMsg = {
          __tcfapiReturn: {
            returnValue: retValue,
            success: success,
            callId: callId,
          },
        };

        try {
          if (target && target.postMessage) {
            target.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
          }
        } finally {
          // A successful subscription needs its target for later events.
          // Other commands have only one reply, even if the queue is retained.
          if (command !== 'addEventListener' || success === false) {
            sourceRef = null;
            fallbackSource = null;
          }
        }
      };
    }

    function postMessageEventHandler(event) {
      const msgIsString = typeof event.data === 'string';
      let json = {};

      if (msgIsString) {
        try {
          /**
           * Try to parse the data from the event.  This is important
           * to have in a try/catch because often messages may come
           * through that are not JSON
           */
          json = JSON.parse(event.data);
        } catch (ignore) {
        }
      } else {
        json = event.data;
      }

      const payload = (typeof json === 'object' && json !== null) ? json.__tcfapiCall : null;

      if (payload) {
        window.__tcfapi(
          payload.command,
          payload.version,
          makePostMessageCallback(event.source, payload.command, payload.callId, msgIsString),
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
      } catch (ignore) {
      }

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
}());
