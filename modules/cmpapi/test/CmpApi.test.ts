import {GVL, TCModel} from '@iabtcf/core';
import {assert} from 'chai';
import {createStub} from '../dev/stub';
import {
  CmpApi,
  EventStatus,
  GlobalVendorList,
  IATCDataCallback,
  InAppTCData,
  Ping,
  PingCallback,
  TCData,
  TCDataCallback,
  VendorListCallback,
} from '../src';

describe('CmpApi', (): void => {

  const win: Window = window;
  const API_FUNCTION_NAME = '__tcfapi';

  // eslint-disable-next-line
  const vendorlistJson = require('../../../dev/vendor-list.json');
  const gvl: GVL = new GVL(vendorlistJson);

  // eslint-disable-next-line no-unused-vars
  let cmpApi: CmpApi;

  createStub();

  describe('Creation', (): void => {

    describe('Before creation of a new instance of CmpApi:', (): void => {

      it('Stub exists', (done): void => {

        assert.isFunction(win[API_FUNCTION_NAME], 'Stub is not a function.');

        const callback: PingCallback = (pingReturn: Ping | null) => {

          assert.isNotNull(pingReturn, 'Stub Ping return is null');

          if (pingReturn) {

            assert.equal(pingReturn.cmpStatus, 'stubCMP', 'Stub is not in a valid state');

          }

          done();

        };

        win[API_FUNCTION_NAME]('ping', 2, callback);

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

      describe('Command Validation:', (): void => {

        it('Command fails if command is not supported', (done): void => {

          const callback: PingCallback = (pingReturn: Ping | null) => {

            assert.isNull(pingReturn, 'Ping returned null');
            done();

          };

          win[API_FUNCTION_NAME]('asdfasdf', 2, callback);

        });

        it('Command fails if command is not a string', (done): void => {

          const callback: PingCallback = (pingReturn: Ping | null) => {

            assert.isNull(pingReturn, 'Ping returned null');
            done();

          };

          win[API_FUNCTION_NAME](2, 2, callback);

        });

        it('Command fails if version is an integer less than 2', (done): void => {

          const callback: PingCallback = (pingReturn: Ping | null) => {

            assert.isNull(pingReturn, 'Ping not null');
            done();

          };

          win[API_FUNCTION_NAME]('ping', 1, callback);

        });

        it('Command fails when using an object as version', (done): void => {

          const callback: PingCallback = (pingReturn: Ping | null) => {

            assert.isNull(pingReturn, 'Ping is not null');
            done();

          };

          win[API_FUNCTION_NAME]('ping', {}, callback);

        });

        // Todo: how to test this
        // it('Command fails when callback is not a function', (done): void => {
        //
        //   const callback: PingCallback = (pingReturn: Ping | null) => {
        //
        //     assert.isNull(pingReturn, 'Ping is not null');
        //     done();
        //
        //   };
        //
        //   win[API_FUNCTION_NAME]('ping', 2, callback);
        //
        // });

      });

      it('ping works', (done): void => {

        const callback: PingCallback = (pingReturn: Ping | null) => {

          assert.isNotNull(pingReturn, 'Ping returned null');
          done();

        };

        win[API_FUNCTION_NAME]('ping', 2, callback);

      });

      it('Setting invalid TcModel throws error', (): void => {

        const tcModel = new TCModel();

        assert.throws(() => cmpApi.setTCModel(tcModel), 'CMP Model is not in a valid state');

      });

      it('setTCModel works', (): void => {

        const tcModel = new TCModel(gvl);
        tcModel.cmpId = 23;
        tcModel.cmpVersion = 1;

        // full consent!
        tcModel.setAll();

        assert.doesNotThrow(() => cmpApi.setTCModel(tcModel, EventStatus.TC_LOADED), 'setTCModel threw an error');

      });

      describe('getTCData', (): void => {

        it('getTCData works', (done): void => {

          const tcModel = new TCModel(gvl);
          tcModel.cmpId = 23;
          tcModel.cmpVersion = 1;

          // full consent!
          tcModel.setAll();

          tcModel.purposeConsents.unset(2);
          tcModel.vendorConsents.unset(37);

          cmpApi.setTCModel(tcModel, EventStatus.TC_LOADED);

          const callback: TCDataCallback = (tcData: TCData | null, success: boolean) => {

            assert.isTrue(success, 'getTCData was not successful');
            assert.isNotNull(tcData, 'getTCData returned null tcData');

            if (tcData) {

              assert.equal(tcData.purpose.consents['3'], true, 'Purpose Consent did not match set value');
              assert.equal(tcData.purpose.consents['2'], false, 'Purpose Consent did not match set value');
              // @ts-ignore
              assert.equal(tcData.eventStatus, EventStatus.TC_LOADED, 'Event status did not match set value');

            }

            // Todo: Check the object more thoroughly

            done();

          };

          win[API_FUNCTION_NAME]('getTCData', 2, callback);

        });

        it('getTCData works with vendor ids', (done): void => {

          const tcModel = new TCModel(gvl);
          tcModel.cmpId = 23;
          tcModel.cmpVersion = 1;

          // full consent!
          tcModel.setAll();

          cmpApi.setTCModel(tcModel, EventStatus.TC_LOADED);

          const callback: TCDataCallback = (tcData: TCData | null, success: boolean) => {

            assert.isTrue(success, 'getTCData was not successful');
            assert.isNotNull(tcData, 'getTCData returned null tcData');
            // @ts-ignore
            assert.equal(tcData.eventStatus, EventStatus.TC_LOADED, 'Event status did not match set value');

            // Todo: Check the object more thoroughly

            done();

          };

          win[API_FUNCTION_NAME]('getTCData', 2, callback, [1, 2, 3, 12, 37, 48]);

        });

        it('getTCData fails when using invalid vendor ids', (done): void => {

          const callback: TCDataCallback = (tcData: TCData | null, success: boolean) => {

            assert.isFalse(success, 'success was true');
            assert.isNull(tcData, 'tcData was not null');
            done();

          };

          win[API_FUNCTION_NAME]('getTCData', 2, callback, [1.5, 2]);

        });

      });

      describe('getInAppTCData', (): void => {

        it('getInAppTCData works', (done): void => {

          const tcModel = new TCModel(gvl);
          tcModel.cmpId = 23;
          tcModel.cmpVersion = 1;

          // full consent!
          tcModel.setAll();

          tcModel.purposeConsents.unset(2);
          tcModel.vendorConsents.unset(37);

          cmpApi.setTCModel(tcModel, EventStatus.TC_LOADED);

          const callback: IATCDataCallback = (inAppTcData: InAppTCData | null, success: boolean) => {

            assert.isTrue(success, 'getInAppTCData was not successful');
            assert.isNotNull(inAppTcData, 'getInAppTCData returned null tcData');

            if (inAppTcData) {

              assert.equal((inAppTcData.purpose.consents as string).charAt(0), '1', 'Purpose Consent did not match set value');
              assert.equal((inAppTcData.purpose.consents as string).charAt(1), '0', 'Purpose Consent did not match set value');
              // @ts-ignore
              assert.equal(inAppTcData.eventStatus, EventStatus.TC_LOADED, 'Event status did not match set value');

            }

            // Todo: Check the object more thoroughly

            done();

          };

          win[API_FUNCTION_NAME]('getInAppTCData', 2, callback);

        });

      });

      describe('getVendorList', (): void => {

        it('getVendorList works', (done): void => {

          const callback: VendorListCallback = (gvl: GlobalVendorList | null, success: boolean) => {

            assert.isTrue(success, 'success was false');
            assert.isNotNull(gvl, 'gvl was null');
            done();

          };

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, 2);

        });

        it('getVendorList works when using "LATEST as version"', (done): void => {

          const callback: VendorListCallback = (gvl: GlobalVendorList | null, success: boolean) => {

            assert.isTrue(success, 'success was false');
            assert.isNotNull(gvl, 'gvl was null');
            done();

          };

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, 'LATEST');

        });

        it('getVendorList fails when using 1 as version', (done): void => {

          const callback: VendorListCallback = (gvl: GlobalVendorList | null, success: boolean) => {

            assert.isFalse(success, 'success was true');
            assert.isNull(gvl, 'gvl was not null');
            done();

          };

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, 1);

        });

        it('getVendorList fails when using "SOMETHING" as version', (done): void => {

          const callback: VendorListCallback = (gvl: GlobalVendorList | null, success: boolean) => {

            assert.isFalse(success, 'success was true');
            assert.isNull(gvl, 'gvl was not null');
            done();

          };

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, 'SOMETHING');

        });

      });

    });

  });

});
