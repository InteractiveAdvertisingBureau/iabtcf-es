import {CmpApi} from '../src/';
import {TCData} from '../src/response';
import {expect} from 'chai';
import * as stub from '@iabtcf/stub';

const API_FUNCTION_NAME = '__tcfapi';

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

    stub.default();

  });
  afterEach((): void => {

    removeStub();

  });

  it('Issue 81 Should not throw an exception if TCModel is set to null and getTCData is called', (done: () => void): void => {

    const cmpApi = new CmpApi(100, 105);

    const setTCModelToNull = (): void => {

      cmpApi.tcModel = null;

    };

    const callGetTCData = (): void => {

      window[API_FUNCTION_NAME]('getTCData', 2, (tcData: TCData): void => {

        expect(tcData, 'tcData').not.to.be.null;

      });
      done();

    };

    expect(setTCModelToNull, 'set TCModel to null').not.to.throw();
    expect(callGetTCData, 'getTCData').not.to.throw();

  });

});
