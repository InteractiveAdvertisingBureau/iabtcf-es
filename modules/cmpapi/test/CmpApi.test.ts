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
  RemoveListenerCallback,
  TCData,
  TCDataCallback,
  VendorListCallback,
} from '../src';
import {CustomCommandRegistration} from '../src/command';

interface TestData {
  testString: string;
  testNum: number;
}

describe('CmpApi', (): void => {

  const win: Window = window;
  const API_FUNCTION_NAME = '__tcfapi';

  // eslint-disable-next-line
  const vendorlistJson = require('../../../dev/vendor-list.json');
  const gvl: GVL = new GVL(vendorlistJson);

  const testData: TestData = {testString: 'There was a farmer who had a dog, and DOG_NAME was his name-o', testNum: 42};

  const customCommands: CustomCommandRegistration[] = [
    {command: 'testCustomCommand', customFunction: (version: string, callback: (obj: object) => void): void => {

      const _testData = testData;
      callback({..._testData, testString: _testData.testString.replace('DOG_NAME', 'BINGO')});

    }},
  ];

  // eslint-disable-next-line no-unused-vars
  let cmpApi: CmpApi;

  createStub();

  const createValidTCModel = (): TCModel => {

    const tcModel = new TCModel(gvl);
    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();

    tcModel.purposeConsents.unset(2);
    tcModel.vendorConsents.unset(37);
    return tcModel;

  };

  const createGetTCDataCallback = (done, eventStatus?: EventStatus): TCDataCallback => {

    return (tcData: TCData | null, success: boolean): void => {

      assert.isTrue(success, 'getTCData was not successful');
      assert.isNotNull(tcData, 'getTCData returned null tcData');
      // @ts-ignore
      assert.equal(tcData.eventStatus, eventStatus ? eventStatus : EventStatus.USER_ACTION_COMPLETE, 'Event status did not match set value');

      // Todo: Check the object more thoroughly

      done();

    };

  };

  describe('Creation', (): void => {

    describe('Before creation of a new instance of CmpApi:', (): void => {

      it('Stub exists', (done): void => {

        assert.isFunction(win[API_FUNCTION_NAME], 'Stub is not a function.');

        const callback: PingCallback = (pingReturn: Ping | null): void => {

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

        cmpApi = new CmpApi(1, 3, customCommands);

        assert.isFunction(win[API_FUNCTION_NAME], 'Page handler was not created or not a function');

      });

      it('Creation of a new CmpApi instance throws an error', (): void => {

        assert.throws((): CmpApi | never => new CmpApi(1, 3), 'CMP Exists already – cannot create');

      });

      describe('Command Validation:', (): void => {

        it('Command fails if command is not supported', (done): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

            assert.isNull(pingReturn, 'Ping returned null');
            done();

          };

          win[API_FUNCTION_NAME]('asdfasdf', 2, callback);

        });

        it('Command fails if command is not a string', (done): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

            assert.isNull(pingReturn, 'Ping returned null');
            done();

          };

          win[API_FUNCTION_NAME](2, 2, callback);

        });

        it('Command fails if version is an integer less than 2', (done): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

            assert.isNull(pingReturn, 'Ping not null');
            done();

          };

          win[API_FUNCTION_NAME]('ping', 1, callback);

        });

        it('Command fails when using an object as version', (done): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

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

        const callback: PingCallback = (pingReturn: Ping | null): void => {

          assert.isNotNull(pingReturn, 'Ping returned null');
          done();

        };

        win[API_FUNCTION_NAME]('ping', 2, callback);

      });

      it('Setting invalid TcModel throws error', (): void => {

        const tcModel = new TCModel();

        assert.throws((): never | TCModel => cmpApi.tcModel = tcModel, 'CMP Model is not in a valid state');

      });

      it('setTCModel works', (): void => {

        assert.doesNotThrow((): TCModel => cmpApi.tcModel = createValidTCModel(), 'setTCModel threw an error');

      });

      it('custom command works', (done): void => {

        const param = 'BINGO';
        const expectedTestString = testData.testString.replace('DOG_NAME', param);

        const callback = (data: TestData): void => {

          assert.isNotNull(data, 'custom command returned null data');
          assert.strictEqual(data.testString, expectedTestString);
          done();

        };

        win[API_FUNCTION_NAME](customCommands[0].command, 2, callback, param);

      });

      describe('getTCData', (): void => {

        it('getTCData works and returns tc loaded for event status', (done): void => {

          const getTCDataCallback = createGetTCDataCallback(done, EventStatus.TC_LOADED);

          win[API_FUNCTION_NAME]('getTCData', 2, getTCDataCallback);

        });

        it('getTCData returns user action complete after setting TcData a second time', (done): void => {

          cmpApi.tcModel = createValidTCModel();

          const getTCDataCallback = createGetTCDataCallback(done);

          win[API_FUNCTION_NAME]('getTCData', 2, getTCDataCallback);

        });

        it('getTCData is queued if an invalid TcModel is set', (done): void => {

          assert.throws((): TCModel => cmpApi.tcModel = new TCModel(), 'CMP Model is not in a valid state');

          const getTCDataCallback = createGetTCDataCallback(done);

          win[API_FUNCTION_NAME]('getTCData', 2, getTCDataCallback, [1, 2, 3, 12, 37, 48]);

          cmpApi.tcModel = createValidTCModel();

        });

        it('getTCData works with vendor ids', (done): void => {

          const callback: TCDataCallback = (tcData: TCData | null, success: boolean): void => {

            assert.isTrue(success, 'getTCData was not successful');
            assert.isNotNull(tcData, 'getTCData returned null tcData');
            // @ts-ignore
            assert.equal(tcData.eventStatus, EventStatus.USER_ACTION_COMPLETE, 'Event status did not match set value');

            // Todo: Check the object more thoroughly

            done();

          };

          win[API_FUNCTION_NAME]('getTCData', 2, callback, [1, 2, 3, 12, 37, 48]);

        });

        it('getTCData fails when using invalid vendor ids', (done): void => {

          const callback: TCDataCallback = (tcData: TCData | null, success: boolean): void => {

            assert.isFalse(success, 'success was true');
            assert.isNull(tcData, 'tcData was not null');
            done();

          };

          win[API_FUNCTION_NAME]('getTCData', 2, callback, [1.5, 2]);

        });

      });

      describe('getInAppTCData', (): void => {

        it('getInAppTCData works', (done): void => {

          cmpApi.tcModel = createValidTCModel();

          const callback: IATCDataCallback = (inAppTcData: InAppTCData | null, success: boolean): void => {

            assert.isTrue(success, 'getInAppTCData was not successful');
            assert.isNotNull(inAppTcData, 'getInAppTCData returned null tcData');

            if (inAppTcData) {

              assert.equal((inAppTcData.purpose.consents as string).charAt(0), '1', 'Purpose Consent did not match set value');
              assert.equal((inAppTcData.purpose.consents as string).charAt(1), '0', 'Purpose Consent did not match set value');
              // @ts-ignore
              assert.equal(inAppTcData.eventStatus, EventStatus.USER_ACTION_COMPLETE, 'Event status did not match set value');

            }

            // Todo: Check the object more thoroughly

            done();

          };

          win[API_FUNCTION_NAME]('getInAppTCData', 2, callback);

        });

      });

      describe('EventListeners', (): void => {

        let addEventListenerCallback;

        const getAddEventListenerCallback = (callCount: number, maxCallCount: number, done): TCDataCallback => {

          return (tcData: TCData | null, success: boolean): void => {

            callCount++;

            assert.isTrue(success, 'addEventListener was not successful');
            assert.isNotNull(tcData, 'addEventListener returned null tcData');

            if (tcData) {

              assert.equal(tcData.purpose.consents['3'], true, 'Purpose Consent did not match set value');
              assert.equal(tcData.purpose.consents['2'], false, 'Purpose Consent did not match set value');
              // @ts-ignore
              assert.equal(tcData.eventStatus, EventStatus.USER_ACTION_COMPLETE, 'Event status did not match set value');

            }

            assert.isFalse(callCount > maxCallCount, 'addEventListenerCallback called after it was removed');

            // Todo: Check the object more thoroughly
            if (callCount === maxCallCount) {

              done();

            }

          };

        };

        describe('addEventListener', (): void => {

          it('addEventListener works', (done): void => {

            const callCount = 0;
            const maxCallCount = 3;

            addEventListenerCallback = getAddEventListenerCallback(callCount, maxCallCount, done);

            win[API_FUNCTION_NAME]('addEventListener', 2, addEventListenerCallback);

            const tcModel = new TCModel(gvl);
            tcModel.cmpId = 23;
            tcModel.cmpVersion = 1;

            // full consent!
            tcModel.setAll();

            tcModel.purposeConsents.unset(2);
            tcModel.vendorConsents.unset(37);

            cmpApi.tcModel = tcModel;
            cmpApi.tcModel = tcModel;
            cmpApi.tcModel = tcModel;

          });

        });

        describe('removeEventListener', (): void => {

          it('removeEventListener works', (done): void => {

            const callback: RemoveListenerCallback = (success: boolean | null): void => {

              assert.isTrue(success, 'removeEventListener did not return successful');

              // Try setting tc model to trigger addEventListenerCallback more times then it was expected
              const tcModel = new TCModel(gvl);
              tcModel.cmpId = 23;
              tcModel.cmpVersion = 1;

              // full consent!
              tcModel.setAll();

              tcModel.purposeConsents.unset(2);
              tcModel.vendorConsents.unset(37);

              cmpApi.tcModel = tcModel;

              done();

            };

            win[API_FUNCTION_NAME]('removeEventListener', 2, callback, addEventListenerCallback);

          });

        });

      });

      describe('getVendorList', (): void => {

        GVL.baseUrl = 'https://vendorlist.consensu.org/v2';

        it('getVendorList works', (done): void => {

          const callback: VendorListCallback = (gvl: GlobalVendorList | null, success: boolean): void => {

            assert.isTrue(success, 'success was false');
            assert.isNotNull(gvl, 'gvl was null');
            done();

          };

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, 2);

        });

        it('getVendorList works using 5 as the version', (done): void => {

          const callback: VendorListCallback = (gvl: GlobalVendorList | null, success: boolean): void => {

            assert.isTrue(success, 'success was false');
            assert.isNotNull(gvl, 'gvl was null');
            done();

          };

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, 5);

        });

        it('getVendorList works when using "LATEST as version"', (done): void => {

          const callback: VendorListCallback = (gvl: GlobalVendorList | null, success: boolean): void => {

            assert.isTrue(success, 'success was false');
            assert.isNotNull(gvl, 'gvl was null');
            done();

          };

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, 'LATEST');

        });

        // Todo: this isn't correct. It is supposed to be 0 or greater is valid
        it('getVendorList fails when using 0 as version', (done): void => {

          const callback: VendorListCallback = (gvl: GlobalVendorList | null, success: boolean): void => {

            assert.isFalse(success, 'success was true');
            assert.isNull(gvl, 'gvl was not null');
            done();

          };

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, 0);

        });

        it('getVendorList fails when using "SOMETHING" as version', (done): void => {

          const callback: VendorListCallback = (gvl: GlobalVendorList | null, success: boolean): void => {

            assert.isFalse(success, 'success was true');
            assert.isNull(gvl, 'gvl was not null');
            done();

          };

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, 'SOMETHING');

        });

      });

      describe('Disable CmpApi', (): void => {

        it('getTCData does not work after setting disabled', (done): void => {

          cmpApi.disable();

          const getTCDataCallback = createGetTCDataCallback((): void => {

            assert.isFalse(true, 'getTCData works after setting disabled');

          });

          win[API_FUNCTION_NAME]('getTCData', 2, getTCDataCallback, [1, 2, 3, 12, 37, 48]);

          // wait one second and call it done
          setTimeout((): void => done(), 1000);

        });

        it('ping still works after setting disabled', (done): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

            assert.isNotNull(pingReturn, 'Ping returned null');
            assert.equal((pingReturn as Ping).cmpStatus, 'error', 'CmpStatus is not error');
            done();

          };

          win[API_FUNCTION_NAME]('ping', 2, callback);

        });

        it('Set TcData throws error', (): void => {

          cmpApi.disable();

          assert.throws((): never | TCModel => cmpApi.tcModel = createValidTCModel(), 'CmpApi is Disabled');

        });

        it('Set uiVisible throws error', (): void => {

          cmpApi.disable();

          assert.throws((): never | boolean => cmpApi.uiVisible = true, 'CmpApi is Disabled');

        });

      });

    });

  });

});
