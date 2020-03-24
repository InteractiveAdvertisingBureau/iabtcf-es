import * as stub from '@iabtcf/stub';
import {CmpApiModel} from '../src/CmpApiModel';
import {CmpApi} from '../src/';
import {Disabled, Response, TCData} from '../src/response';
import {expect} from 'chai';
import {makeRandomInt, TCStringFactory} from '@iabtcf/testing';

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
    CmpApiModel.reset();

  });

  it('Issue 96 CmpApi should respond to addEventListener call with an error object when in an Error state', (done: () => void): void => {

    const cmpApi = new CmpApi(makeRandomInt(2, Math.pow(2, 6)), makeRandomInt(2, Math.pow(2, 6)));

    cmpApi.disable();

    window[API_FUNCTION_NAME]('addEventListener', 2, (response: Response): void => {

      expect(response instanceof Disabled, 'response instanceof Disabled').to.be.true;

      done();

    });

  });

  it('Should not throw an error if getTCData is called before update is called', (done: () => void): void => {

    const cmpApi = new CmpApi(makeRandomInt(2, Math.pow(2, 6)), makeRandomInt(2, Math.pow(2, 6)));

    const callDatFunc = (): void => {

      window[API_FUNCTION_NAME]('getTCData', 2, (response: Response): void => {

        expect(response instanceof TCData, 'response instanceof TCData').to.be.true;

        done();

      });

    };

    expect(callDatFunc, 'call getTCData').not.to.throw();

    cmpApi.update(TCStringFactory.base());

  });

  it('126 Should not throw an error tc string is set as ""', (done: () => void): void => {

    const cmpId = makeRandomInt(2, Math.pow(2, 6));
    const cmpVersion = makeRandomInt(2, Math.pow(2, 6));
    const cmpApi = new CmpApi(cmpId, cmpVersion);
    const emptyString = '';

    expect((): void => {

      cmpApi.update(emptyString);

    }).not.to.throw();

    expect(CmpApiModel.tcModel, 'tcModel').not.to.be.undefined;
    expect(CmpApiModel.tcModel, 'tcModel').not.to.be.null;
    expect(CmpApiModel.tcString, 'tcString').to.equal(emptyString);
    expect(CmpApiModel.tcModel.cmpId, 'tcModel.cmpId').to.equal(cmpId);
    expect(CmpApiModel.tcModel.cmpVersion, 'tcModel.cmpVersion').to.equal(cmpVersion);

    window[API_FUNCTION_NAME]('getTCData', 2, (tcData: TCData): void => {

      expect(tcData.tcString, 'tcData.tcString').to.equal(emptyString);
      expect(tcData.cmpId, 'tcData.tcModel.cmpId').to.equal(cmpId);
      expect(tcData.cmpVersion, 'tcData.cmpVersion').to.equal(cmpVersion);
      done();

    });

  });

});
