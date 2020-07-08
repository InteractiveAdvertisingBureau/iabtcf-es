/* eslint-disable @typescript-eslint/no-explicit-any */
import {CmpStatus, DisplayStatus, EventStatus} from '../src/status';
import {makeRandomInt, TCStringFactory} from '@iabtcf/testing';
import {expect} from 'chai';
import {CmpApi, CustomCommands} from '../src/';
import {CmpApiModel} from '../src/CmpApiModel';
import {Ping} from '../src/response/Ping';
import {TCData} from '../src/response/TCData';
import {TCFCommands} from '../src/command/TCFCommands';
import {TestUtils} from './TestUtils';

import * as stub from '@iabtcf/stub';

const API_FUNCTION_NAME = '__tcfapi';
const API_VERSION = 2;

describe('CmpApi', (): void => {

  const removeStub = (): void =>{

    // clean up that junk
    if (typeof window[API_FUNCTION_NAME] === 'function') {

      delete window[API_FUNCTION_NAME];

    }

    const iframes = document.querySelectorAll('iframe');

    for (let i = 0; i < iframes.length; i++) {

      const frame: HTMLElement = iframes[i];

      if (frame !== null && frame.parentNode) {

        frame.parentNode.removeChild(frame);

      }

    }

  };

  const getCmpApi = (isServiceSpecific = false, customCommands?: CustomCommands): CmpApi => {

    const cmpId = makeRandomInt(2, 100);
    const cmpVersion = makeRandomInt(1, 15);
    return new CmpApi(cmpId, cmpVersion, isServiceSpecific, customCommands);

  };

  beforeEach((): void => {

    stub.default();
    TestUtils.assertDefaultCmpApiModel();

  });
  afterEach((): void => {

    removeStub();

  });

  const assertStub = async (): Promise<void> => {

    expect(window[API_FUNCTION_NAME], `window.${API_FUNCTION_NAME} while stub`).to.be.a('function');

    return new Promise((resolve: () => void): void => {

      window[API_FUNCTION_NAME](TCFCommands.PING, 2, (ping: Ping): void => {

        expect(ping.cmpId, 'ping.cmpId with stub').to.be.undefined;
        expect(ping.cmpVersion, 'ping.cmpVersion with stub').to.be.undefined;
        expect(ping.cmpLoaded, 'ping.cmpLoaded with stub').to.be.false;
        expect(ping.gdprApplies, 'ping.gdprApplies with stub').to.be.undefined;
        expect(ping.cmpStatus, 'ping.cmpStatus with stub').to.equal('stub');
        expect(ping.displayStatus, 'ping.displayStatus with stub').to.be.undefined;
        expect(ping.gvlVersion, 'ping.gvlVersion with stub').to.be.undefined;
        expect(ping.apiVersion, 'ping.apiVersion with stub').to.be.undefined;

        resolve();

      });

    });

  };

  it('should override the stub', async (): Promise<void> => {

    await assertStub();

    getCmpApi();

    expect(window[API_FUNCTION_NAME], `window.${API_FUNCTION_NAME} after cmpApi created`).to.be.a('function');
    return new Promise((resolve: () => void): void => {

      window[API_FUNCTION_NAME]('ping', 2, (ping: Ping): void => {

        expect(ping.cmpId, 'ping.cmpId after cmpApi created').is.above(2);
        expect(ping.cmpVersion, 'ping.cmpVersion after cmpApi created').is.above(0);
        expect(ping.cmpLoaded, 'ping.cmpLoaded after cmpApi created').to.be.true;
        expect(ping.gdprApplies, 'ping.gdprApplies after cmpApi created').to.be.undefined;
        expect(ping.cmpStatus, 'ping.cmpStatus after cmpApi created').to.equal(CmpStatus.LOADING);
        expect(ping.apiVersion, 'ping.apiVersion after cmpApi created').to.equal('2');
        expect(ping.displayStatus, 'ping.displayStatus after cmpApi created').to.equal(DisplayStatus.HIDDEN);
        expect(ping.gvlVersion, 'ping.gvlVersion after cmpApi created').to.be.undefined;
        resolve();

      });

    });

  });

  const runContructionFail = (cmpId: any, cmpVersion: any): void => {

    it(`should throw an error if cmpId=${cmpId} and cmpVersion=${cmpVersion}`, (done: () => void): void => {

      expect((): void => {

        new CmpApi(cmpId, cmpVersion);

      }).to.throw();

      done();

    });

  };

  runContructionFail(0, 2);
  runContructionFail(1, 2);
  runContructionFail(null, 2);
  runContructionFail('banana', 2);
  runContructionFail(0.234, 2);
  runContructionFail(-1, 2);
  runContructionFail('2', 2);
  runContructionFail('2.0', 2);

  runContructionFail(2, -1);
  runContructionFail(2, 2.02345);
  runContructionFail(2, '0');
  runContructionFail(2, 'banana');
  runContructionFail(2, null);

  it('should pick up a queued stub function an excecute it if it can when tcModel is set', (done: () => void): void => {

    assertStub();

    window[API_FUNCTION_NAME](TCFCommands.GET_TC_DATA, API_VERSION, (tcData: TCData, success: boolean): void => {

      expect(success).to.be.true;
      TestUtils.tcModelToTCData();
      done();

    });

    const cmpApi = getCmpApi();

    cmpApi.update(TCStringFactory.base());

  });

  it(`should set cmpStatus to "${CmpStatus.ERROR}" if disabled is set to true`, (): void => {

    const cmpApi = getCmpApi();
    cmpApi.disable();

    expect(CmpApiModel.cmpStatus, 'cmpStatus after').to.equal(CmpStatus.ERROR);
    expect(CmpApiModel.disabled, 'disabled after').to.true;

  });

  it('should pick up a queued stub function an excecute it if it can when tcString is set', (done: () => void): void => {

    assertStub();
    const tcString = TCStringFactory.base();

    window[API_FUNCTION_NAME](TCFCommands.GET_TC_DATA, API_VERSION, (tcData: TCData, success: boolean): void => {

      expect(success).to.be.true;
      expect(tcData.tcString, 'tcString').to.equal(tcString);
      done();

    });

    const cmpApi = getCmpApi();

    cmpApi.update(tcString);

  });

  it('should set CmpApiModel.displayStatus = "visible" when uiVisible is passed as true to the update function', (): void => {

    const cmpApi = getCmpApi();

    expect(CmpApiModel.displayStatus, 'CmpApiModel.displayStatus - initial').to.equal(DisplayStatus.HIDDEN);

    cmpApi.update(TCStringFactory.base(), true);

    expect(CmpApiModel.displayStatus, 'CmpApiModel.displayStatus - after set cmpApi.uiVisible to true').to.equal(DisplayStatus.VISIBLE);

    cmpApi.update(TCStringFactory.base(), false);

    expect(CmpApiModel.displayStatus, 'CmpApiModel.displayStatus - after set cmpApi.uiVisible to false').to.equal(DisplayStatus.HIDDEN);

  });

  it('should set CmpApiModel.dsiabled to true when CmpApi.disable() is called', (): void => {

    const cmpApi = getCmpApi();

    expect(CmpApiModel.disabled, 'CmpApiModel.disabled - initial').to.be.false;

    cmpApi.disable();

    expect(CmpApiModel.disabled, 'CmpApiModel.disabled - after cmpApi.disable() is called').to.be.true;

  });

  it('should throw an error when disabled and update is called', (): void => {

    const cmpApi = getCmpApi();

    cmpApi.disable();

    expect((): void => {

      cmpApi.update(TCStringFactory.base());

    }, 'cmpApi.tcModel after disabled').to.throw();

  });

  const runSucceedCommand = (command: any, version: any, because = ''): void => {

    it(`should callback with success=true and result=something if command=${command} and version=${version} because ${because}`, (done: () => void): void => {

      const cmpApi = getCmpApi();
      cmpApi.update(TCStringFactory.base());

      const callDat = (): void => {

        window[API_FUNCTION_NAME](command, version, (result: any, success: boolean): void => {

          expect(result, 'result').not.to.be.undefined;
          expect(success, 'success').to.be.true;

          done();

        });

      };

      expect(callDat, 'calling the function with command').not.to.throw();

    });

  };

  const runFailCommand = (command: any, version: any, because = ''): void => {

    it(`should callback with success=false and result=error message if command=${command} and version=${version} because ${because}`, (done: () => void): void => {

      getCmpApi();
      window[API_FUNCTION_NAME](command, version, (result: string, success: boolean): void => {

        expect(result, 'result').to.be.null;
        expect(success, 'success').to.be.false;

        done();

      });

    });

  };

  runFailCommand('foo', 2, 'it\'s and unknown command');
  runFailCommand(5, 2, 'command is a number');
  runFailCommand({}, 2, 'command is an object');
  runFailCommand(null, 2, 'command is null');
  runFailCommand(true, 2, 'command is a boolean');
  runFailCommand(false, 2, 'command is a boolean');

  runFailCommand(TCFCommands.GET_TC_DATA, 2.1, 'version is a floating point number that is greater than 2');
  runFailCommand(TCFCommands.GET_TC_DATA, '2.1', 'version is a floating point that doesn\'t evaluate to 2');
  runFailCommand(TCFCommands.GET_TC_DATA, 1, 'version is not supported');
  runFailCommand(TCFCommands.GET_TC_DATA, true, 'version is a boolean');
  runFailCommand(TCFCommands.GET_TC_DATA, false, 'version is a boolean');
  runFailCommand(TCFCommands.GET_TC_DATA, {}, 'version is an object');

  runSucceedCommand(TCFCommands.GET_TC_DATA, '2', 'is a string but still 2');
  runSucceedCommand(TCFCommands.GET_TC_DATA, '2.0', 'is a string but still 2');
  runSucceedCommand(TCFCommands.GET_TC_DATA, 2.0, 'version is a floating point number that evaluates to 2');
  runSucceedCommand(TCFCommands.GET_TC_DATA, null, 'null is valid');
  runSucceedCommand(TCFCommands.GET_TC_DATA, 0, '0 is valid');

  const runFailCallback = (callback: any, because = ''): void => {

    it(`should throw an error if with callback ${callback} because it\'s ${because}`, (done: () => void): void => {

      getCmpApi();
      expect((): void => {

        window[API_FUNCTION_NAME](TCFCommands.GET_TC_DATA, 2, callback);

      }).to.throw();
      done();

    });

  };

  runFailCallback(undefined, 'undefined');
  runFailCallback(true, 'a boolean');
  runFailCallback(false, 'a boolean');
  runFailCallback({}, 'an object');
  runFailCallback('foo', 'a string');
  runFailCallback(2, 'a number');

  it('should call a custom command through the page interface', (done: () => void): void => {

    const commandName = 'superRadCommand';
    const passParam = true;

    getCmpApi(false, {
      [commandName]: (callback: (...params) => void, param: boolean): void => {

        expect(callback, 'callback').to.be.a('function');
        expect(param, 'param').to.be.a('boolean');
        expect(param, 'param').to.equal(passParam);

        callback(param);

      },

    });

    window[API_FUNCTION_NAME](commandName, 2, (param: boolean): void => {

      expect(param, 'param').to.be.a('boolean');
      expect(param, 'param').to.equal(passParam);
      done();

    }, passParam);

  });

  it('should call a custom command through the page interface with multiple parameters', (done: () => void): void => {

    const commandName = 'superRadCommand';
    const passParam = true;
    const passParam2 = 'banana';
    const passParam3 = 'orange';

    getCmpApi(false, {
      [commandName]: (callback: (...params) => void, param: boolean, param2: string, param3: string): void => {

        expect(callback, 'callback').to.be.a('function');
        expect(param, 'param').to.be.a('boolean');
        expect(param, 'param').to.equal(passParam);
        expect(param2, 'param2').to.be.a('string');
        expect(param2, 'param2').to.equal(passParam2);
        expect(param3, 'param3').to.be.a('string');
        expect(param3, 'param3').to.equal(passParam3);

        callback(param, param2, param3);

      },

    });

    window[API_FUNCTION_NAME](commandName, 2, (param: boolean, param2: string, param3: string): void => {

      expect(param, 'param').to.be.a('boolean');
      expect(param, 'param').to.equal(passParam);
      expect(param2, 'param2').to.be.a('string');
      expect(param2, 'param2').to.equal(passParam2);
      expect(param3, 'param3').to.be.a('string');
      expect(param3, 'param3').to.equal(passParam3);
      done();

    }, passParam, passParam2, passParam3);

  });

  it('should call a built-in getTCData command through the page interface and decorate the response in the middleware ', (done: () => void): void => {

    const commandName = 'getTCData';
    const additionalTCDataKey = 'google_consent_string'
    const additionalTCDataValue = '1~1.35.41.101'

    const cmpApi = getCmpApi(false, {
      [commandName]: (TCDataObj: any, success: boolean, next: Function): void => {
        TCDataObj[additionalTCDataKey] = additionalTCDataValue
        next(TCDataObj, success)
      }
    });

    cmpApi.update(TCStringFactory.base());

    window[API_FUNCTION_NAME](commandName, 2, (TCData: any, success: boolean): void => {
      expect(TCData[additionalTCDataKey]).to.equal(additionalTCDataValue);
      expect(success).to.equal(true);
      done();
    });

  });

  it('should call a built-in addEventListener command through the page interface and decorate the response in the middleware ', (done: () => void): void => {

    const commandName = 'addEventListener';
    const additionalTCDataKey = 'google_consent_string'
    const additionalTCDataValue = '1~1.35.41.101'

    const cmpApi = getCmpApi(false, {
      [commandName]: (TCDataObj: any, success: boolean, next: Function): void => {
        TCDataObj[additionalTCDataKey] = additionalTCDataValue
        next(TCDataObj, success)
      }
    });

    cmpApi.update(TCStringFactory.base());

    window[API_FUNCTION_NAME](commandName, 2, (TCData: any, success: boolean): void => {
      expect(TCData[additionalTCDataKey]).to.equal(additionalTCDataValue);
      expect(success).to.equal(true);
      done();
    });

  });

  it('should call a built-in removeEventListener command through the page interface and decorate the response in the middleware ', (done: () => void): void => {

    const commandName = 'removeEventListener';
    const mutatedStatus = 'success'

    const cmpApi = getCmpApi(false, {
      [commandName]: (status: any, next: Function): void => {
        status = mutatedStatus
        next(mutatedStatus)
      }
    });

    cmpApi.update(TCStringFactory.base());

    window[API_FUNCTION_NAME](commandName, 2, (status: any): void => {
      expect(status).to.equal(mutatedStatus);
      done();
    });

  });

  it('should call a built-in inAppTCData command through the page interface and decorate the response in the middleware ', (done: () => void): void => {

    const commandName = 'getInAppTCData';
    const additionalTCDataKey = 'google_consent_string'
    const additionalTCDataValue = '1~1.35.41.101'

    const cmpApi = getCmpApi(false, {
      [commandName]: (TCDataObj: any, success: boolean, next: Function): void => {
        TCDataObj[additionalTCDataKey] = additionalTCDataValue
        next(TCDataObj, success)
      }
    });

    cmpApi.update(TCStringFactory.base());

    window[API_FUNCTION_NAME](commandName, 2, (TCData: any, success: boolean): void => {
      expect(TCData[additionalTCDataKey]).to.equal(additionalTCDataValue);
      expect(success).to.equal(true)
      done();
    });

  });

  it('should call a built-in getVendorList command through the page interface and decorate the response in the middleware ', (done: () => void): void => {

    const commandName = 'getVendorList';
    const additionalGVLKey = 'google_consent_string'
    const additionalGVLValue = '1~1.35.41.101'

    const cmpApi = getCmpApi(false, {
      [commandName]: (gvl: any, success: boolean, next: Function): void => {
        gvl[additionalGVLKey] = additionalGVLValue
        next(gvl, success)
      }
    });

    cmpApi.update(TCStringFactory.base());

    window[API_FUNCTION_NAME](commandName, 2, (TCData: any, success: boolean): void => {
      expect(TCData[additionalGVLKey]).to.equal(additionalGVLValue);
      expect(success).to.equal(true)
      done();
    });

  });


  it(`should set gdprApplies=true, displayStatus="${DisplayStatus.DISABLED}", eventStatus="${EventStatus.TC_LOADED}", and cmpStatus="${CmpStatus.LOADED}" on the first set of the tcString when uiVisible=false`, (): void => {

    const cmpApi = getCmpApi();

    cmpApi.update(TCStringFactory.base(), false);

    expect(CmpApiModel.gdprApplies, 'CmpApiModel.gdprApplies').to.be.true;
    expect(CmpApiModel.displayStatus, 'CmpApiModel.displayStatus').to.equal(DisplayStatus.DISABLED);
    expect(CmpApiModel.eventStatus, 'CmpApiModel.eventStatus').to.equal(EventStatus.TC_LOADED);
    expect(CmpApiModel.cmpStatus, 'CmpApiModel.cmpStatus').to.equal(CmpStatus.LOADED);

  });

  it(`should set gdprApplies=true, displayStatus="${DisplayStatus.VISIBLE}", eventStatus="${EventStatus.CMP_UI_SHOWN}", and cmpStatus="${CmpStatus.LOADED}" on the first set of the tcString when uiVisible=true`, (): void => {

    const cmpApi = getCmpApi();

    cmpApi.update(TCStringFactory.base(), true);

    expect(CmpApiModel.gdprApplies, 'CmpApiModel.gdprApplies').to.be.true;
    expect(CmpApiModel.displayStatus, 'CmpApiModel.displayStatus').to.equal(DisplayStatus.VISIBLE);
    expect(CmpApiModel.eventStatus, 'CmpApiModel.eventStatus').to.equal(EventStatus.CMP_UI_SHOWN);
    expect(CmpApiModel.cmpStatus, 'CmpApiModel.cmpStatus').to.equal(CmpStatus.LOADED);

  });

  it(`should set gdprApplies=false, displayStatus="${DisplayStatus.DISABLED}", eventStatus="${EventStatus.TC_LOADED}", and cmpStatus="${CmpStatus.LOADED}" when the tcString is set to null`, (): void => {

    const cmpApi = getCmpApi();

    cmpApi.update(null);

    expect(CmpApiModel.gdprApplies, 'CmpApiModel.gdprApplies').to.be.false;
    expect(CmpApiModel.displayStatus, 'CmpApiModel.displayStatus').to.equal(DisplayStatus.DISABLED);
    expect(CmpApiModel.eventStatus, 'CmpApiModel.eventStatus').to.equal(EventStatus.TC_LOADED);
    expect(CmpApiModel.cmpStatus, 'CmpApiModel.cmpStatus').to.equal(CmpStatus.LOADED);

  });

  it(`should set gdprApplies=true, displayStatus="${DisplayStatus.HIDDEN}", eventStatus="${EventStatus.USER_ACTION_COMPLETE}", and cmpStatus="${CmpStatus.LOADED}" when the tcString is set a second time`, (): void => {

    const cmpApi = getCmpApi();

    cmpApi.update(TCStringFactory.base());
    cmpApi.update(TCStringFactory.base());

    expect(CmpApiModel.gdprApplies, 'CmpApiModel.gdprApplies').to.be.true;
    expect(CmpApiModel.displayStatus, 'CmpApiModel.displayStatus').to.equal(DisplayStatus.HIDDEN);
    expect(CmpApiModel.eventStatus, 'CmpApiModel.eventStatus').to.equal(EventStatus.USER_ACTION_COMPLETE);
    expect(CmpApiModel.cmpStatus, 'CmpApiModel.cmpStatus').to.equal(CmpStatus.LOADED);

  });

  it(`should set gdprApplies=true, displayStatus="${DisplayStatus.HIDDEN}", eventStatus="${EventStatus.USER_ACTION_COMPLETE}", and cmpStatus="${CmpStatus.LOADED}" when the tcString is set a third time`, (): void => {

    /**
     * simulates a manual summon
     */

    const cmpApi = getCmpApi();

    cmpApi.update(TCStringFactory.base());
    cmpApi.update(TCStringFactory.base());
    cmpApi.update(TCStringFactory.base());

    expect(CmpApiModel.gdprApplies, 'CmpApiModel.gdprApplies').to.be.true;
    expect(CmpApiModel.displayStatus, 'CmpApiModel.displayStatus').to.equal(DisplayStatus.HIDDEN);
    expect(CmpApiModel.eventStatus, 'CmpApiModel.eventStatus').to.equal(EventStatus.USER_ACTION_COMPLETE);
    expect(CmpApiModel.cmpStatus, 'CmpApiModel.cmpStatus').to.equal(CmpStatus.LOADED);

  });

});
