/**
 * Sample CMP “stub” API script
 */

(function() {

  if (typeof (window.__tcfapi) !== 'function') {

    const queue = [];
    const win = window;
    const doc = win.document;
    let gdprApplies;

    function addFrame() {

      /**
         * check for other CMPs
         */
      const otherCMP = !!(win.frames['__tcfapiLocator']);

      if (!otherCMP) {

        /**
           * There can be only one
           */

        if (doc.body) {

          /**
             * check for body tag – otherwise we'll be
             * be having a hard time appending a child
             * to it if it doesn't exist
             */

          const iframe = doc.createElement('iframe');

          iframe.style.cssText = 'display:none';
          iframe.name = '__tcfapiLocator';
          doc.body.appendChild(iframe);

        } else {

          /**
             * Wait for the body tag to exist.
             *
             * Since this API "stub" is located in the <head>,
             * setTimeout allows us to inject the iframe more
             * quickly than relying on DOMContentLoaded or
             * other events.
             */

          setTimeout(addFrame, 5);

        }

      }

      /**
         * if there was not another CMP then we have
         * succeeded
         */

      return !otherCMP;

    }

    function __tcfapi(...args) {

      if (!args.length) {

        /**
           * shortcut to get the queue when the full CMP
           * implementation loads; it can call __tcfapi()
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
          apiVersion: '2.0',
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

        json = msgIsString ? JSON.parse(event.data) : event.data;

      } catch (ignore) {}

      const payload = json.__tcfapiCall;

      if (payload) {

        /**
           * the message we care about will have a payload
           */

        win.__tcfapi(payload.command, payload.parameter, payload.version, function(retValue, success) {

          let returnMsg = {
            __tcfapiReturn: {
              returnValue: retValue,
              success: success,
              callId: payload.callId,
            },
          };

          if (msgIsString) {

            /**
               * If we were given a string, we'll respond in kind
               */

            returnMsg = JSON.stringify(returnMsg);

          }

          event.source.postMessage(returnMsg, '*');

        });

      }

    }

    if (!win.__tcfapi && addFrame()) {

      win.__tcfapi = __tcfapi;
      win.addEventListener('message', postMessageEventHandler, false);

    }

  }

}
);
