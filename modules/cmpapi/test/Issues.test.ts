import {CmpApi} from '../src/';
import {TCData} from '../src/response/TCData';
import {TCString} from '@iabtcf/core';
import {expect} from 'chai';
import {GVLFactory, makeRandomInt, XMLHttpTestTools} from '@iabtcf/testing';

// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-var-requires */
declare global {
  interface Window {
    __tcfapi: (
      command: any,
      version: any,
      callback: (...params: any) => void,
      ...param: any
    ) => void;

  }
}

const API_FUNCTION_NAME = '__tcfapi';
const API_VERSION = 2;

describe('Issues', (): void => {

  it('72', (done: () => void): void => {

    const cmpId = makeRandomInt(2, 100);
    const cmpVersion = makeRandomInt(0, 15);
    const cmpApi = new CmpApi(cmpId, cmpVersion);
    const encodedString = 'COvZp2vOvZp2vDIAAAFRAPCMAFIAAEoAAAAAAVEUQQgAIQCBgBgAGACRAIAAgQAA.IFoEUQQgAIQwgIwQABAEAAAAOIAACAIAAAAQAIAgEAACEAAAAAgAQBAAAAAAAGBAAgAAAAAAAFAAECAAAgAAQARAEQAAAAAJAAIAAgAAAYQEAAAQmAgBC3ZAYzUw';
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
//
