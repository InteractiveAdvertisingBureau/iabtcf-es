import {CmpApi} from '../src/';
import {TCString} from '@iabtcf/core';
import {expect} from 'chai';
import {XMLHttpTestTools, GVLFactory} from '@iabtcf/testing';

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

describe('Issue #72', (): void => {

  it('should have FR as the language in TCData.tcString if French is encoded in the src string', (done: () => void): void => {

    const cmpApi = new CmpApi(100, 1);
    const str = 'C0uSNRV0uSNRVAvACBFRAWCgAAAAAAAAACiQABEAAAA';
    const decodedTCModel = TCString.decode(str);

    const callback = function(tcData, success): void {

      expect(success, 'success').to.be.true;
      expect(tcData.tcString, 'tcData.tcString').to.equal(str);
      done();

    };

    cmpApi.tcModel = decodedTCModel;
    window[API_FUNCTION_NAME]('getTCData', API_VERSION, callback);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    const json = GVLFactory.getVersion(+decodedTCModel.vendorListVersion).getJson();

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(json));

  });

});
