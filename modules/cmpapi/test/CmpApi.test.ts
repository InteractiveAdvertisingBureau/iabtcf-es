import {CmpApi, PageCallHandler} from '../src/';
import {Ping} from '../src/response/Ping';
import {TCData} from '../src/response/TCData';
import {CmpStatus} from '../src/status/CmpStatus';
import {DisplayStatus} from '../src/status/DisplayStatus';
import {Commands} from '../src/types/Commands';
import {expect} from 'chai';
import {makeRandomInt, TCModelFactory} from '@iabtcf/testing';
import {TCDataToTCModel} from './TCDataToTCModel';

// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-var-requires */
declare global {
  interface Window {
    __tcfapi: PageCallHandler;
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

  it('should pick up a queued stub function an excecute it if it can', (done: () => void): void => {

    assertStub();

    window[API_FUNCTION_NAME](Commands.GET_TC_DATA, API_VERSION, (tcData: TCData, success: boolean): void => {

      expect(success).to.be.true;
      TCDataToTCModel.equal();
      done();

    });

    const cmpId = makeRandomInt(2, 100);
    const cmpVersion = makeRandomInt(0, 15);
    const cmpApi = new CmpApi(cmpId, cmpVersion);

    cmpApi.tcModel = TCModelFactory.noGVL();

  });

});
