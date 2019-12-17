import {GVL, TCModel, VendorList} from '@iabtcf/core';
import {assert, expect} from 'chai';
import * as sinon from 'sinon';
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

const createStub = (): void => {

  require('@iabtcf/stub');

};

const createGetTCDataCallback = (done: () => void, eventStatus: EventStatus): TCDataCallback => {

  return (tcData: TCData | null, success: boolean): void => {

    expect(success, 'success').to.be.true;
    expect(tcData, 'tcData').not.to.be.null;
    expect((tcData as TCData).eventStatus, 'eventStatus').to.equal(eventStatus);

    done();

  };

};

describe('CmpApi', (): void => {

  beforeEach((): void => {

    /**
     * Create the __tcfapi stub
     */
    createStub();
    XMLHttpTestTools.beforeEach();

  });
  afterEach((): void => {

    XMLHttpTestTools.afterEach();
    // clean up that junk
    window[API_FUNCTION_NAME] = null;

  });

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

  describe('After creation of a new instance of CmpApi:', (): void => {

    it('Page handler is created and is a function', (): void => {

      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const cmpApi = new CmpApi(1, 3);

      expect(win[API_FUNCTION_NAME], `window.${API_FUNCTION_NAME}`).to.be.a('function');

    });

    it('Creation of a duplicate CmpApi instance throws an error', (): void => {

      const createNewCMP = (): void => {

        debugger;
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const cmpApi = new CmpApi(1, 3);

      };

      createNewCMP();
      expect(createNewCMP).to.throw(ValidationMessages.EXISTING_CMP);

    });

    it('ping returns', (done: () => void): void => {

      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const cmpApi = new CmpApi(1, 3);

      const callback: PingCallback = (pingReturn: Ping | null): void => {

        expect(pingReturn, 'pingReturn').not.to.be.null;
        done();

      };

      win[API_FUNCTION_NAME]('ping', 2, callback);

    });

    it('setTCModel does not throw an error', (): void => {

      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const cmpApi = new CmpApi(1, 3);

      expect((): TCModel => cmpApi.tcModel = createValidTCModel(gvl)).not.to.throw();

    });

    describe('Custom Commands:', (): void => {

      it('envokes a custom command successfully with data', (done: () => void): void => {

        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const cmpApi = new CmpApi(1, 3, customCommands);
        const param = 'BINGO';
        const expectedTestString = custCommandTestData.testString.replace('DOG_NAME', param);

        win[API_FUNCTION_NAME](customCommands[0].command, 2, (data: TestData): void => {

          expect(data, 'data').not.to.be.null;
          expect(data.testString).to.equal(expectedTestString);
          done();

        }, param);

      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const runFail = (command: any, version: any): void => {

        it(`returns null and success=false null if command ${command} and version is ${version}`, (done: () => void): void => {

          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const cmpApi = new CmpApi(1, 3, customCommands);

          win[API_FUNCTION_NAME](command, version, (returnObject: null, success: boolean): void => {

            expect(returnObject, 'returnObject').to.be.null;
            expect(success, 'success').to.be.false;
            done();

          });

        });

      };

      runFail('asdfasdf', 2);
      runFail(null, 2);
      runFail(2, 2);
      runFail('ping', 1);
      runFail('ping', 3);
      runFail('ping', {});
      runFail('ping', null);

    });

    describe('getTCData', (): void => {

      it(`has an initial event status of ${EventStatus.TC_LOADED}`, (done: () => void): void => {

        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const cmpApi = new CmpApi(1, 3);

        win[API_FUNCTION_NAME]('getTCData', 2, createGetTCDataCallback(done, EventStatus.TC_LOADED));

      });

      it(`has an event status of ${EventStatus.USER_ACTION_COMPLETE} if tcModel is set twice`, (done: () => void): void => {

        const cmpApi = new CmpApi(1, 3);

        cmpApi.tcModel = createValidTCModel(gvl);
        cmpApi.tcModel = createValidTCModel(gvl);
        win[API_FUNCTION_NAME]('getTCData', 2, createGetTCDataCallback(done, EventStatus.USER_ACTION_COMPLETE));

      });

      it(`still has an event status of ${EventStatus.USER_ACTION_COMPLETE} if tcModel is set three times`, (done: () => void): void => {

        const cmpApi = new CmpApi(1, 3);

        cmpApi.tcModel = createValidTCModel(gvl);
        cmpApi.tcModel = createValidTCModel(gvl);
        cmpApi.tcModel = createValidTCModel(gvl);
        win[API_FUNCTION_NAME]('getTCData', 2, createGetTCDataCallback(done, EventStatus.USER_ACTION_COMPLETE));

      });

      it('filters vendors with array of integer vendorIds passed in', (done: () => void): void => {

        const cmpApi = new CmpApi(1, 3);
        const vendors = [1, 2, 3, 12, 37, 48];
        const tcModel = createValidTCModel(gvl);

        tcModel.vendorConsents.set(vendors);
        tcModel.vendorLegitimateInterest.set(vendors);

        cmpApi.tcModel = tcModel;

        win[API_FUNCTION_NAME]('getTCData', 2, (tcData: TCData | null, success: boolean): void => {

          expect(success, 'success').to.be.true;
          expect(tcData, 'tcData').not.to.be.null;
          expect((tcData as TCData).eventStatus, 'eventStatus').to.equal(EventStatus.USER_ACTION_COMPLETE);

          vendors.forEach((id: number): void => {

            const strId = id.toString();
            expect((tcData as TCData).vendor.consents[strId]).to.be.true;
            expect((tcData as TCData).vendor.legitimateInterests[strId]).to.be.true;

          });

          expect(Object.keys((tcData as TCData).vendor.consents).length).to.equal(vendors.length);
          expect(Object.keys((tcData as TCData).vendor.legitimateInterests).length).to.equal(vendors.length);

          done();

        }, vendors);

      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const runFail = (vendorIds: any): void => {

        it(`returns null and success=false null if vendorIds=${vendorIds}`, (done: () => void): void => {

          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const cmpApi = new CmpApi(1, 3);

          win[API_FUNCTION_NAME]('getTCData', 2, (returnObject: null, success: boolean): void => {

            expect(returnObject, 'returnObject').to.be.null;
            expect(success, 'success').to.be.false;
            done();

          });

        });

      };

      runFail([1.5, 2]);
      runFail([-2, -1]);
      runFail('foobar');
      runFail(1);

    });

    /*
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
      const vendorlistJson: VendorList = require('../../../vendorlist/vendor-list.json');

      GVL.baseUrl = 'https://super-rad-cmp.mgr.consensu.org/vendorlist/';

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

        expect(XMLHttpTestTools.requests.length, 'request length, when expecting a request').to.equal(1);

        const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

        expect(req, 'req').not.to.be.undefined;
        expect(req.method, 'req.method').to.equal('GET');
        expect(req.url, 'req.url').to.equal(url);

        // respond to the request
        req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

      };

      const expectNoRequest = (): void => {

        expect(XMLHttpTestTools.requests.length, 'request length, when expecting no request').to.equal(0);

      };

      const runTest = (shouldSucceed: boolean, param?: string | number, requestURL?: string): void => {

        it(`will ${requestURL ? '' : 'not '}make an HTTPrequest and should ${shouldSucceed ? '' : 'not '}succeed when the param is ${param}`, (done: () => void): void => {

          let callback;

          if (shouldSucceed) {

            callback = getSuccesfulCallback(done);

          } else {

            callback = getUnsuccesfulCallback(done);

          }

          win[API_FUNCTION_NAME]('getVendorList', 2, callback, param);

          if (requestURL) {

            expectRequest(requestURL);

          } else {

            expectNoRequest();

          }

        });

      };

      runTest(true);
      runTest(true, 5, `${GVL.baseUrl}archives/vendor-list-v5.json`);
      runTest(true, 'LATEST', `${GVL.baseUrl}vendor-list.json`);
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

  */

  });

});
