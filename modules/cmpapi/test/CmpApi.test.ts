import {GVL, TCModel} from '@iabtcf/core';
import {assert} from 'chai';
import {CmpApi, EventStatus, Ping, PingCallback, TCData, TCDataCallback} from '../src';

describe('CmpApi', (): void => {

  const win: Window = window;
  const API_FUNCTION_NAME = '__tcfapi';

  // eslint-disable-next-line
  const vendorlistJson = require('../../../dev/vendor-list.json');
  const gvl: GVL = new GVL(vendorlistJson);

  // eslint-disable-next-line no-unused-vars
  let cmpApi: CmpApi;

  describe('Creation', (): void => {

    describe('Before creation of a new instance of CmpApi:', (): void => {

      it('Page handler is NOT created', (): void => {

        assert.isNotFunction(win[API_FUNCTION_NAME], 'Page handler was created or is a function');

      });

    });

    describe('After creation of a new instance of CmpApi:', (): void => {

      it('Page handler is created and is a function', (): void => {

        cmpApi = new CmpApi(1, 3);

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

      it('Setting invalid TcModel throws error', (): void => {

        const tcModel = new TCModel();

        assert.throws(() => cmpApi.setTCModel(tcModel), 'CMP Model is not in a valid state');

      });

      it('getTCData works after setting valid TcModel', (done): void => {

        const tcModel = new TCModel(gvl);
        tcModel.cmpId = 23;
        tcModel.cmpVersion = 1;

        // full consent!
        tcModel.setAll();

        console.log('tcModel', tcModel);
        cmpApi.setTCModel(tcModel, EventStatus.TC_LOADED);

        const callback: TCDataCallback = (tcData: TCData | null, success: boolean) => {

          console.log('tcData', tcData);
          assert.isTrue(success, 'getTCData was not successful');
          assert.isNotNull(tcData, 'getTCData returned null tcData');
          // @ts-ignore
          assert.equal(tcData.eventStatus, EventStatus.TC_LOADED, 'Event status did not match set value');
          done();

        };

        win[API_FUNCTION_NAME]('getTCData', 2, callback, [1.3, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

      });

    });

  });

});
