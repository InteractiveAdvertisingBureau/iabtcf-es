import * as stub from '@iabtcf/stub';
import {CmpApiModel} from '../src/CmpApiModel';
import {CmpApi} from '../src/';
import {Disabled, Response, TCData} from '../src/response';
import {TCString} from '@iabtcf/core';
import {expect} from 'chai';
import {makeRandomInt, GVLFactory, TCModelFactory, XMLHttpTestTools} from '@iabtcf/testing';

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

    stub.default();

  });
  afterEach((): void => {

    removeStub();
    CmpApiModel.reset();

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

  it('Issue 96 CmpApi should respond to addEventListener call with an error object when in an Error state', (done: () => void): void => {

    const cmpApi = new CmpApi(makeRandomInt(2, 500), makeRandomInt(2, 500));

    cmpApi.disable();

    window[API_FUNCTION_NAME]('addEventListener', 2, (response: Response): void => {

      expect(response instanceof Disabled, 'response instanceof Disabled').to.be.true;

      done();

    });

  });

  it('Should not throw an error if getTCData is called before a tcModel is set', (done: () => void): void => {

    const cmpAPI = new CmpApi(makeRandomInt(2, 500), makeRandomInt(2, 500));

    const callDatFunc = (): void => {

      window[API_FUNCTION_NAME]('getTCData', 2, (response: Response): void => {

        expect(response instanceof TCData, 'response instanceof TCData').to.be.true;

        done();

      });

    };

    expect(callDatFunc, 'call getTCData').not.to.throw();
    cmpAPI.tcModel = TCModelFactory.withGVL();

  });

  it('Issue 72 TCString from getTCData does not match TCString used to decode TCModel', (done: () => void): void => {

    const cmpId = makeRandomInt(2, 100);
    const cmpVersion = makeRandomInt(0, 15);
    const cmpApi = new CmpApi(cmpId, cmpVersion);
    const encodedString = 'COvZp2vOvZp2vDIAAAFRAPCMAFIAAEoAAAAAAVEUQQgAIQCBgBgAGACRAIAAgQAA.IFoEUQQgAIQwgIwQABAEAAAAOIAACAIAAAAQAIAgEAACEAAAAAgAQBAAAAAAAGBAAgAAAAAAAFAAECAAAgAAQARAEQAAAAAJAAIAAgAAAYQEAAAQmAgBC3ZAYzUw.YAAAAAAAAAAAAAAAAAA';
    const tcModel = TCString.decode(encodedString);
    const json = GVLFactory.getVersion(+tcModel.vendorListVersion).getJson();

    cmpApi.tcModel = tcModel;

    window[API_FUNCTION_NAME]('getTCData', API_VERSION, (tcData: TCData): void => {

      expect(tcData.tcString, 'tcData.tcString').to.equal(encodedString);
      done();

    });

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(json));

  });

});
