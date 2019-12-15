import {GVL, TCModel, VendorList} from '@iabtcf/core';
import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {createStub} from '../../../dev/stub';
import {XMLHttpTestTools, smellsLikeGVL} from '@iabtcf/testing';
import {
  CmpApi,
  EventStatus,
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
import {ValidationMessages} from '../src/validation';
import {createValidTCModel, gvl} from './utils';

interface TestData {
  testString: string;
  testNum: number;
}

const API_FUNCTION_NAME = '__tcfapi';

const win: Window = window;

const createGetTCDataCallback =
  (done: () => void, eventStatus: EventStatus = EventStatus.USER_ACTION_COMPLETE): TCDataCallback => {

    return (tcData: TCData | null, success: boolean): void => {

      expect(success, 'success').to.be.true;
      expect(tcData, 'tcData').not.to.be.null;
      expect((tcData as TCData).eventStatus, 'eventStatus').to.equal(eventStatus);

      // Todo: Check the object more thoroughly

      done();

    };

  };

describe('CmpApi', (): void => {

  /**
   * Create the __tcfapi stub
   */
  createStub();

  const custCommandTestData: TestData = {testString: 'There was a farmer who had a dog, and DOG_NAME was his name-o', testNum: 42};

  /**
   * An array of custom commands
   * @type {{customFunction: (version: string, callback: (obj: object) => void) => void; command: string}[]}
   */
  const customCommands: CustomCommandRegistration[] = [
    {command: 'testCustomCommand', customFunction: (version: string, callback: (obj: object) => void): void => {

      const _testData = custCommandTestData;
      callback({..._testData, testString: _testData.testString.replace('DOG_NAME', 'BINGO')});

    }},
  ];

  // eslint-disable-next-line no-unused-vars
  let cmpApi: CmpApi;

  describe('Creation', (): void => {

    describe('Before creation of a new instance of CmpApi:', (): void => {

      it('Stub exists', (done: () => void): void => {

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

        assert.throws((): CmpApi | never => new CmpApi(1, 3), ValidationMessages.EXISTING_CMP);

      });

      it('ping works', (done: () => void): void => {

        const callback: PingCallback = (pingReturn: Ping | null): void => {

          assert.isNotNull(pingReturn, 'Ping returned null');
          done();

        };

        win[API_FUNCTION_NAME]('ping', 2, callback);

      });

      it('setTCModel works', (): void => {

        assert.doesNotThrow((): TCModel => cmpApi.tcModel = createValidTCModel(gvl), 'setTCModel threw an error');

      });

      describe('Custom Commands:', (): void => {

        it('custom command works', (done: () => void): void => {

          const param = 'BINGO';
          const expectedTestString = custCommandTestData.testString.replace('DOG_NAME', param);

          const callback = (data: TestData): void => {

            assert.isNotNull(data, 'custom command returned null data');
            assert.strictEqual(data.testString, expectedTestString);
            done();

          };

          win[API_FUNCTION_NAME](customCommands[0].command, 2, callback, param);

        });

        it('Command fails if command is not supported', (done: () => void): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

            assert.isNull(pingReturn, 'Ping returned null');
            done();

          };

          win[API_FUNCTION_NAME]('asdfasdf', 2, callback);

        });

        it('Command fails if command is not a string', (done: () => void): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

            assert.isNull(pingReturn, 'Ping returned null');
            done();

          };

          win[API_FUNCTION_NAME](2, 2, callback);

        });

        it('Command fails if version is an integer less than 2', (done: () => void): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

            assert.isNull(pingReturn, 'Ping not null');
            done();

          };

          win[API_FUNCTION_NAME]('ping', 1, callback);

        });

        it('Command fails when using an object as version', (done: () => void): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

            assert.isNull(pingReturn, 'Ping is not null');
            done();

          };

          win[API_FUNCTION_NAME]('ping', {}, callback);

        });

        // Todo: how to test this
        // it('Command fails when callback is not a function', (done:() => void): void => {
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

      // it('custom command works', (done:() => void): void => {
      //
      //   const param = 'BINGO';
      //   const expectedTestString = custCommandTestData.testString.replace('DOG_NAME', param);
      //
      //   const callback = (data: TestData): void => {
      //
      //     assert.isNotNull(data, 'custom command returned null data');
      //     assert.strictEqual(data.testString, expectedTestString);
      //     done();
      //
      //   };
      //
      //   win[API_FUNCTION_NAME](customCommands[0].command, 2, callback, param);
      //
      // });

      describe('getTCData', (): void => {

        it('getTCData works and returns tc loaded for event status', (done: () => void): void => {

          const getTCDataCallback = createGetTCDataCallback(done, EventStatus.TC_LOADED);

          win[API_FUNCTION_NAME]('getTCData', 2, getTCDataCallback);

        });

        it('getTCData returns user action complete after setting TcData a second time', (done: () => void): void => {

          cmpApi.tcModel = createValidTCModel(gvl);

          const getTCDataCallback = createGetTCDataCallback(done);

          win[API_FUNCTION_NAME]('getTCData', 2, getTCDataCallback);

        });

        it('getTCData works with vendor ids', (done: () => void): void => {

          const callback: TCDataCallback = (tcData: TCData | null, success: boolean): void => {

            expect(success, 'success').to.be.true;
            expect(tcData, 'tcData').not.to.be.null;
            expect((tcData as TCData).eventStatus, 'eventStatus').to.equal(EventStatus.USER_ACTION_COMPLETE);

            // Todo: Check the object more thoroughly

            done();

          };

          win[API_FUNCTION_NAME]('getTCData', 2, callback, [1, 2, 3, 12, 37, 48]);

        });

        it('getTCData fails when using invalid vendor ids', (done: () => void): void => {

          const callback: TCDataCallback = (tcData: TCData | null, success: boolean): void => {

            assert.isFalse(success, 'success was true');
            assert.isNull(tcData, 'tcData was not null');
            done();

          };

          win[API_FUNCTION_NAME]('getTCData', 2, callback, [1.5, 2]);

        });

      });

      describe('getInAppTCData', (): void => {

        it('getInAppTCData works', (done: () => void): void => {

          cmpApi.tcModel = createValidTCModel(gvl);

          const callback: IATCDataCallback = (inAppTcData: InAppTCData | null, success: boolean): void => {

            assert.isTrue(success, 'getInAppTCData was not successful');
            assert.isNotNull(inAppTcData, 'getInAppTCData returned null tcData');

            if (inAppTcData) {

              expect((inAppTcData.purpose.consents as string).charAt(0), 'inAppTcData.purpose.consents.charAt(0)').to.equal( '1');
              expect((inAppTcData.purpose.consents as string).charAt(1), 'inAppTcData.purpose.consents.charAt(1)').to.equal( '0');
              expect((inAppTcData as InAppTCData).eventStatus, 'eventStatus').to.equal(EventStatus.USER_ACTION_COMPLETE);

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

              expect(tcData.purpose.consents['3'], 'tcData.purpose.consents["3"]').to.be.true;
              expect(tcData.purpose.consents['2'], 'tcData.purpose.consents["2"]').to.be.false;
              expect((tcData as TCData).eventStatus, 'eventStatus').to.equal(EventStatus.USER_ACTION_COMPLETE);

            }

            assert.isFalse(callCount > maxCallCount, 'addEventListenerCallback called after it was removed');

            // Todo: Check the object more thoroughly
            if (callCount === maxCallCount) {

              done();

            }

          };

        };

        describe('addEventListener', (): void => {

          it('addEventListener works', (done: () => void): void => {

            const callCount = 0;
            const maxCallCount = 3;

            addEventListenerCallback = getAddEventListenerCallback(callCount, maxCallCount, done);

            win[API_FUNCTION_NAME]('addEventListener', 2, addEventListenerCallback);

            const tcModel = new TCModel(gvl);

            tcModel.cmpId = 2;
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

          it('removeEventListener works', (done: () => void): void => {

            const callback: RemoveListenerCallback = (success: boolean | null): void => {

              assert.isTrue(success, 'removeEventListener did not return successful');

              // Try setting tc model to trigger addEventListenerCallback more times then it was expected
              const tcModel = new TCModel(gvl);
              tcModel.cmpId = 2
              ;
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

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const vendorlistJson: VendorList = require('../../../dev/vendor-list.json');

        beforeEach(XMLHttpTestTools.beforeEach);
        afterEach(XMLHttpTestTools.afterEach);

        GVL.baseUrl = 'https://super-rad-cmp.mgr.consensu.org/vendorlist';

        const getSuccesfulCallback = (done: () => void): VendorListCallback => {

          return (gvl: VendorList | null, success: boolean): void => {

            expect(success, 'success').to.be.true;
            expect(gvl, 'gvl').not.to.be.null;
            smellsLikeGVL(gvl as object);

            done();

          };

        };

        const getUnsuccesfulCallback = (done: () => void): VendorListCallback => {

          return (gvl: VendorList | null, success: boolean): void => {

            expect(success, 'success').to.be.false;
            expect(gvl, 'gvl').to.be.null;
            done();

          };

        };

        const expectRequest = (url: string): void => {

          expect(XMLHttpTestTools.requests.length).to.equal(1);

          const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

          expect(req, 'req').not.to.be.undefined;
          expect(req.method, 'req.method').to.equal('GET');
          expect(req.url, 'req.url').to.equal(url);

          // respond to the request
          req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

        };

        const expectNoRequest = (): void => {

          expect(XMLHttpTestTools.requests.length).to.equal(0);

        };

        const runTest = (shouldSucceed: boolean, param?: string | number, requestURL?: string): void => {

          it(`will ${requestURL ? '' : 'not '}make an HTTPrequest and should ${shouldSucceed ? '' : 'not '}succeed when the param is ${param}`, (done: () => void): void => {

            win[API_FUNCTION_NAME]('getVendorList', 2, shouldSucceed ? getSuccesfulCallback(done) : getUnsuccesfulCallback(done), param);

            if (requestURL) {

              expectRequest(requestURL);

            } else {

              expectNoRequest();

            }

          });

        };

        runTest(true);
        runTest(true, 5, `${GVL.baseUrl}/archives/vendor-list-v5.json`);
        runTest(true, 'LATEST', `${GVL.baseUrl}/vendor-list.json`);
        runTest(false, 0);
        runTest(false, 'SOMETHING');

      });

      describe('Disable CmpApi', (): void => {

        it('getTCData does not work after setting disabled', (done: () => void): void => {

          cmpApi.disable();

          const getTCDataCallback = createGetTCDataCallback((): void => {

            assert.isFalse(true, 'getTCData works after setting disabled');

          });

          win[API_FUNCTION_NAME]('getTCData', 2, getTCDataCallback, [1, 2, 3, 12, 37, 48]);

          // wait one second and call it done
          setTimeout((): void => done(), 1000);

        });

        it('ping still works after setting disabled', (done: () => void): void => {

          const callback: PingCallback = (pingReturn: Ping | null): void => {

            assert.isNotNull(pingReturn, 'Ping returned null');
            assert.equal((pingReturn as Ping).cmpStatus, 'error', 'CmpStatus is not error');
            done();

          };

          win[API_FUNCTION_NAME]('ping', 2, callback);

        });

        it('Set TcData throws error', (): void => {

          cmpApi.disable();

          assert.throws(
            (): never | TCModel => cmpApi.tcModel = createValidTCModel(gvl),
            ValidationMessages.CMP_API_IN_DISABLED_STATE
          );

        });

        it('Set uiVisible throws error', (): void => {

          cmpApi.disable();

          assert.throws((): never | boolean => cmpApi.uiVisible = true, ValidationMessages.CMP_API_IN_DISABLED_STATE);

        });

      });

    });

  });

});
