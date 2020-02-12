(function() {

  const makeStub = () => {

    const TCF_LOCATOR_NAME = '__tcfapiLocator';
    const win = window;
    const queue = [];
    let cmpFrame;

    function addFrame() {

      const doc = win.document;
      const otherCMP = !!(win.frames[TCF_LOCATOR_NAME]);

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

      let gdprApplies;

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

        const retr = {
          gdprApplies: gdprApplies,
          cmpLoaded: false,
          cmpStatus: 'stubCMP',
          apiVersion: '2',
        };

        if (typeof args[2] === 'function') {

          args[2](retr, true);

        }

      } else {

        /**
       * some other method, just queue it for the
       * full CMP implementation to deal with
       */

        queue.push(args);

      }

    }

    function postMessageEventHandler(event) {

      const msgIsString = typeof event.data === 'string';
      let json = {};

      try {

        /**
       * Try to parse the data from the event.  This is important
       * to have in a try/catch because often messages may come
       * through that are not JSON
       */

        if (msgIsString) {

          json = JSON.parse(event.data);

        } else {

          json = event.data;

        }

      } catch (ignore) {}

      const payload = json.__tcfapiCall;

      if (payload) {

        window.__tcfapi(
          payload.command,
          payload.version,
          function(retValue, success) {

            let returnMsg = {
              __tcfapiReturn: {
                returnValue: retValue,
                success: success,
                callId: payload.callId,
              },
            };

            if (msgIsString) {

              returnMsg = JSON.stringify(returnMsg);

            }

            event.source.postMessage(returnMsg, '*');

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
    while (win) {

      try {

        if (win.frames[TCF_LOCATOR_NAME]) {

          cmpFrame = win;
          break;

        }

      } catch (ignore) {}

      // if we're at the top and no cmpFrame
      if (win === window.top) {

        break;

      }

      // Move up
      win = win.parent;

    }

    if (!cmpFrame) {

      // we have recur'd up the windows and have found no __tcfapiLocator frame

      addFrame();
      win.__tcfapi = tcfAPIHandler;
      win.addEventListener('message', postMessageEventHandler, false);

    }

  };

  if (typeof module !== 'undefined') {

    module.exports = makeStub;

  } else {

    makeStub();

  }

}());
