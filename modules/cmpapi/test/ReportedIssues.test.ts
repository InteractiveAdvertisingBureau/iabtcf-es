import {CmpApi} from '../src/';
import {TCData} from '../src/response';
import {expect} from 'chai';

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

describe('Reported github issues', (): void => {

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

  it('81 Should not throw an exception if TCModel is set to null and getTCData is called', (done: () => void): void => {

    const cmpApi = new CmpApi(100, 105);

    const setTCModelToNull = (): void => {

      cmpApi.tcModel = null;

    };

    const callGetTCData = (): void => {

      window.__tcfapi('getTCData', 2, (tcData: TCData): void => {

        expect(tcData, 'tcData').not.to.be.null;

      });
      done();

    };

    expect(setTCModelToNull, 'set TCModel to null').not.to.throw();
    expect(callGetTCData, 'getTCData').not.to.throw();

  });

});
