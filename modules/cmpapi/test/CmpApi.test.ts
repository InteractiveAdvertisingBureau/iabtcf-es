import {CmpApi, CustomCommands} from '../src/';
import {CmpApiModel} from '../src/CmpApiModel';
import {Ping} from '../src/response/Ping';
import {TCData} from '../src/response/TCData';
import {CmpStatus} from '../src/status/CmpStatus';
import {DisplayStatus} from '../src/status/DisplayStatus';
import {TCFCommands} from '../src/command/TCFCommands';
import {expect} from 'chai';
import {makeRandomInt, TCModelFactory, TCStringFactory} from '@iabtcf/testing';
import {TCDataToTCModel} from './TCDataToTCModel';

// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-var-requires */
declare global {
  interface Window {
    __tcfapi: (
      command: any,
      version: any,
      callback: (response?: any, success?: any) => void,
      param?: any
    ) => void;

  }
}

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

  beforeEach((): void => {

    require('@iabtcf/stub')();

  });
  afterEach((): void => {

    removeStub();

  });

  const assertStub = (): void => {

    expect(window[API_FUNCTION_NAME], `window.${API_FUNCTION_NAME} while stub`).to.be.a('function');

    window[API_FUNCTION_NAME]('ping', 2, (ping: Ping): void => {

      expect(ping.cmpId, 'ping.cmpId with stub').to.be.undefined;
      expect(ping.cmpVersion, 'ping.cmpVersion with stub').to.be.undefined;
      expect(ping.cmpLoaded, 'ping.cmpLoaded with stub').to.be.false;
      expect(ping.gdprApplies, 'ping.gdprApplies with stub').to.be.undefined;
      expect(ping.cmpStatus, 'ping.cmpStatus with stub').to.equal('stubCMP');
      expect(ping.displayStatus, 'ping.displayStatus with stub').to.be.undefined;
      expect(ping.gvlVersion, 'ping.gvlVersion with stub').to.be.undefined;
      expect(ping.apiVersion, 'ping.apiVersion with stub').to.equal(2);

    });

  };

  it('should override the stub', (done: () => void): void => {

    assertStub();

    const cmpId = makeRandomInt(2, 100);
    const cmpVersion = makeRandomInt(0, 15);
    const cmpApi = new CmpApi(cmpId, cmpVersion);

    expect(window[API_FUNCTION_NAME], `window.${API_FUNCTION_NAME} after cmpApi created`).to.be.a('function');
    window[API_FUNCTION_NAME]('ping', 2, (ping: Ping): void => {

      expect(ping.cmpId, 'ping.cmpId after cmpApi created').to.equal(cmpId);
      expect(ping.cmpVersion, 'ping.cmpVersion after cmpApi created').to.equal(cmpVersion);
      expect(ping.cmpLoaded, 'ping.cmpLoaded after cmpApi created').to.be.true;
      expect(ping.gdprApplies, 'ping.gdprApplies after cmpApi created').to.be.undefined;
      expect(ping.cmpStatus, 'ping.cmpStatus after cmpApi created').to.equal(CmpStatus.LOADING);
      expect(ping.apiVersion, 'ping.apiVersion after cmpApi created').to.equal(2);
      expect(ping.displayStatus, 'ping.displayStatus after cmpApi created').to.equal(DisplayStatus.HIDDEN);
      expect(ping.gvlVersion, 'ping.gvlVersion after cmpApi created').to.be.undefined;

    });

    done();

  });

  const runContructionFail = (cmpId: any, cmpVersion: any): void => {

    it(`should throw an error if cmpId=${cmpId} and cmpVersion=${cmpVersion}`, (done: () => void): void => {

      expect((): void => {

        const cmpApi = new CmpApi(cmpId, cmpVersion);

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

  const getCmpApi = (customCommands?: CustomCommands): CmpApi => {

    const cmpId = makeRandomInt(2, 100);
    const cmpVersion = makeRandomInt(0, 15);
    return new CmpApi(cmpId, cmpVersion, customCommands);

  };

  it('should pick up a queued stub function an excecute it if it can when tcModel is set', (done: () => void): void => {

    assertStub();

    window[API_FUNCTION_NAME](TCFCommands.GET_TC_DATA, API_VERSION, (tcData: TCData, success: boolean): void => {

      expect(success).to.be.true;
      TCDataToTCModel.equal();
      done();

    });

    const cmpApi = getCmpApi();

    cmpApi.tcModel = TCModelFactory.withGVL();

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

    cmpApi.tcString = tcString;

  });

  it('should set CmpApiModel.uiVisible to passed in value when CmpApi.uiVisible is set', (done: () => void): void => {

    const cmpApi = getCmpApi();

    expect(CmpApiModel.uiVisible, 'CmpApiModel.uiVisible - initial').to.be.false;

    cmpApi.uiVisible = true;

    expect(CmpApiModel.uiVisible, 'CmpApiModel.uiVisible after set cmpApi.uiVisible to true').to.be.true;

    cmpApi.uiVisible = false;

    expect(CmpApiModel.uiVisible, 'CmpApiModel.uiVisible after set cmpApi.uiVisible to false').to.be.false;

    done();

  });

  it('should set CmpApiModel.dsiabled to true when CmpApi.disable() is called', (done: () => void): void => {

    const cmpApi = getCmpApi();

    expect(CmpApiModel.disabled, 'CmpApiModel.disabled - initial').to.be.false;

    cmpApi.disable();

    expect(CmpApiModel.disabled, 'CmpApiModel.disabled - after cmpApi.disable() is called').to.be.true;

    done();

  });

  it('should throw errors when disabled and tcModel, tcString, or uiVisible are set', (done: () => void): void => {

    const cmpApi = getCmpApi();

    expect(CmpApiModel.disabled, 'CmpApiModel.disabled - initial').to.be.false;

    cmpApi.disable();

    expect(CmpApiModel.disabled, 'CmpApiModel.disabled - after cmpApi.disable() is called').to.be.true;

    expect((): void => {

      cmpApi.tcModel = TCModelFactory.withGVL();

    }, 'cmpApi.tcModel after disabled').to.throw();

    expect((): void => {

      cmpApi.uiVisible = true;

    }, 'cmpApi.uiVisible after disabled').to.throw();

    expect((): void => {

      cmpApi.tcString = TCStringFactory.base();

    }, 'cmpApi.tcString after disabled').to.throw();

    done();

  });

  const runFailCommand = (command: any, version: any, because = ''): void => {

    it(`should callback with success=false and result=error message if command=${command} and version=${version} because ${because}`, (done: () => void): void => {

      const cmpApi = getCmpApi();
      window[API_FUNCTION_NAME](command, version, (result: string, success: boolean): void => {

        expect(result, 'result').to.be.a('string');
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

  runFailCommand(TCFCommands.GET_TC_DATA, '2', 'version is a string');
  runFailCommand(TCFCommands.GET_TC_DATA, 2.1, 'version is a floating point number');
  runFailCommand(TCFCommands.GET_TC_DATA, 1, 'version is not supported');
  runFailCommand(TCFCommands.GET_TC_DATA, null, 'version is null');
  runFailCommand(TCFCommands.GET_TC_DATA, true, 'version is a boolean');
  runFailCommand(TCFCommands.GET_TC_DATA, false, 'version is a boolean');
  runFailCommand(TCFCommands.GET_TC_DATA, {}, 'version is an object');

  const runFailCallback = (callback: any, because = ''): void => {

    it(`should throw an error if with callback ${callback} because it\'s ${because}`, (done: () => void): void => {

      const cmpApi = getCmpApi();
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
  runFailCallback(null, 'null');

  it('should call a custom command through the page interface', (done: () => void): void => {

    const commandName = 'superRadCommand';
    const passParam = true;
    const cmpApi = getCmpApi({
      [commandName]: (callback: (...params) => void, param?: any): void => {

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

});
