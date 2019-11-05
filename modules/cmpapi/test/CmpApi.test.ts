import {assert} from 'chai';
import {CmpApi, Ping, PingCallback, TCData, TCDataCallback} from '../src';

describe('CmpApi', (): void => {

  const win: Window = window;
  const API_FUNCTION_NAME = '__tcfapi';

  describe('Creation', (): void => {

    describe('Before creation of a new instance of CmpApi:', (): void => {

      it('Page handler is NOT created', (): void => {

        assert.isNotFunction(win[API_FUNCTION_NAME], 'Page handler was created or is a function');

      });

    });

    describe('After creation of a new instance of CmpApi:', (): void => {

      it('Page handler is created and is a function', (): void => {

        new CmpApi(1, 3);

        assert.isFunction(win[API_FUNCTION_NAME], 'Page handler was not created or not a function');

      });

      it('Creation of a new CmpApi instance throws an error', (): void => {

        assert.throws(() => new CmpApi(1, 3), 'CMP Exists already – cannot create');

      });

      it('ping works', (done): void => {

        const callback: PingCallback = (pingReturn: Ping) => {

          console.log('pingReturn', pingReturn);
          assert.isNotNull(pingReturn, 'Ping returned null');
          done();

        };

        win[API_FUNCTION_NAME]('ping', 2, callback);

      });

      it('getTCData works', (done): void => {

        const callback: TCDataCallback = (tcData: TCData, success: boolean) => {

          console.log('tcData', tcData);
          assert.isTrue(success, 'getTCData was not successful');
          assert.isNotNull(tcData, 'getTCData returned null tcData');
          done();

        };

        win[API_FUNCTION_NAME]('getTCData', 2, callback, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

      });

    });

  });

});
