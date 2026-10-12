const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const stub = fs.readFileSync(path.join(__dirname, '../src/stub.js'), 'utf8');

function setup(weakRef) {
  let receive;
  const window = {
    frames: {},
    document: {
      body: {appendChild() {}},
      createElement: () => ({style: {}}),
    },
    addEventListener: (name, handler) => { receive = handler; },
  };
  window.top = window;
  const context = {window, module: {exports: {}}, WeakRef: weakRef};
  vm.runInNewContext(stub, context);
  context.module.exports();
  return {window, receive};
}

for (const weakRef of [undefined, WeakRef]) {
  describe(`iframe replies ${weakRef ? 'with' : 'without'} WeakRef`, () => {
    for (const encoded of [false, true]) {
      describe(encoded ? 'JSON messages' : 'object messages', () => {
        let window;
        let receive;
        let replies;
        let source;

        beforeEach(() => {
          ({window, receive} = setup(weakRef));
          replies = [];
          source = {postMessage: (data, origin) => {
            assert.strictEqual(origin, '*');
            assert.strictEqual(typeof data, encoded ? 'string' : 'object');
            replies.push(encoded ? JSON.parse(data) : data);
          }};
        });

        function send(command, parameter) {
          const data = {__tcfapiCall: {command, version: 2, callId: 'iframe-call', parameter}};
          receive({data: encoded ? JSON.stringify(data) : data, source});
        }

        function assertReply(index, returnValue, success) {
          assert.deepStrictEqual(JSON.parse(JSON.stringify(replies[index])), {
            __tcfapiReturn: {returnValue, success, callId: 'iframe-call'},
          });
        }

        it('replies to a queued one-shot call after the event handler returns', () => {
          send('getTCData', 42);
          const [command, version, callback, parameter] = window.__tcfapi()[0];
          assert.strictEqual(command, 'getTCData');
          assert.strictEqual(version, 2);
          assert.strictEqual(parameter, 42);
          callback({tcString: 'consent'}, true);
          assert.strictEqual(replies.length, 1);
          assertReply(0, {tcString: 'consent'}, true);
        });

        it('replies to both initial and later listener notifications', () => {
          send('addEventListener');
          const callback = window.__tcfapi()[0][2];
          callback({eventStatus: 'tcloaded', listenerId: 7}, true);
          callback({eventStatus: 'useractioncomplete', listenerId: 7}, true);
          assert.strictEqual(replies.length, 2);
          assertReply(0, {eventStatus: 'tcloaded', listenerId: 7}, true);
          assertReply(1, {eventStatus: 'useractioncomplete', listenerId: 7}, true);
        });

        it('replies to a deferred failed command', () => {
          send('unknown');
          window.__tcfapi()[0][2](null, false);
          assertReply(0, null, false);
        });

        it('preserves synchronous ping replies', () => {
          send('ping');
          assert.strictEqual(replies.length, 1);
          assert.strictEqual(replies[0].__tcfapiReturn.callId, 'iframe-call');
          assert.strictEqual(replies[0].__tcfapiReturn.returnValue.cmpStatus, 'stub');
          assert.strictEqual(replies[0].__tcfapiReturn.returnValue.cmpLoaded, false);
          assert.strictEqual(window.__tcfapi().length, 0);
        });

        it('does not capture subsequent mutations to the call envelope', () => {
          const call = {command: 'addEventListener', version: 2, callId: 'original'};
          receive({data: encoded ? JSON.stringify({__tcfapiCall: call}) : {__tcfapiCall: call}, source});
          call.callId = 'changed';
          window.__tcfapi()[0][2]({}, true);
          assert.strictEqual(replies[0].__tcfapiReturn.callId, 'original');
        });
      });
    }

    it('ignores unrelated and malformed messages', () => {
      const {window, receive} = setup(weakRef);
      for (const data of ['not JSON', 'null', null, undefined, {}, {other: 'message'}]) {
        receive({data, source: {}});
      }
      assert.strictEqual(window.__tcfapi().length, 0);
    });

    it('handles a missing reply source', () => {
      const {window, receive} = setup(weakRef);
      receive({data: {__tcfapiCall: {command: 'getTCData', version: 2}}});
      assert.doesNotThrow(() => window.__tcfapi()[0][2]({}, true));
    });
  });
}
