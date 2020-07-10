import * as sinon from 'sinon';
import {CmpApiModel} from '../../src/CmpApiModel';
import {GetVendorListCommand} from '../../src/command/GetVendorListCommand';
import {TCModelFactory, XMLHttpTestTools, GVLFactory, makeRandomInt} from '@iabtcf/testing';
import {VendorList, TCModel} from '@iabtcf/core';
import {expect} from 'chai';

describe('command->GetVendorListCommand', (): void => {

  it('should return version of TCModel.vendorListVersion if TCModel does not have a gvl and no parameter is passed', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.withGVL();

    new GetVendorListCommand((gvl: VendorList, success: boolean): void => {

      expect(success, 'success').to.be.true;
      expect(gvl.vendorListVersion, 'gvl.vendorListVersion').to.equal(CmpApiModel.tcModel.vendorListVersion);
      expect(gvl, 'gvl').to.deep.equal(CmpApiModel.tcModel.gvl.getJson());

      done();

    });

  });

  it('should return latest GVL if "LATEST" is passed', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.noGVL();
    const json = GVLFactory.getLatest().getJson();

    new GetVendorListCommand((gvl: VendorList, success: boolean): void => {

      expect(success, 'success').to.be.true;
      expect(gvl, 'gvl').to.deep.equal(json);

      done();

    }, 'LATEST');

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(json));

  });

  it('should return version of GVL if integer is passed', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.noGVL();

    const version = makeRandomInt(1, 22);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const json = require(`@iabtcf/testing/lib/vendorlist/vendor-list-v${version}.json`);
    const stringified = JSON.stringify(json);

    new GetVendorListCommand((gvl: VendorList, success: boolean): void => {

      expect(success, 'success').to.be.true;

      // the lastUpdated date gets wonky because of the require
      delete json.lastUpdated;
      delete gvl.lastUpdated;
      expect(gvl, 'gvl').to.deep.equal(json);

      done();

    }, version);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.url, 'req.url').to.include(`vendor-list-v${version}.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, stringified);

  });

  it('should cache a version of the gvl', (done: () => void): void => {

    CmpApiModel.tcModel = new TCModel(GVLFactory.getLatest());
    const json = CmpApiModel.tcModel.gvl.getJson();

    expect(XMLHttpTestTools.requests.length, 'requests.length - before').to.equal(0);

    CmpApiModel.tcModel.gvl.readyPromise.then((): void => {

      new GetVendorListCommand((gvl: VendorList, success: boolean): void => {

        expect(success, 'success').to.be.true;
        expect(gvl, 'gvl').to.deep.equal(json);
        done();

      });

      expect(XMLHttpTestTools.requests.length, 'requests.length - after').to.equal(0);

    });

  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runFailWithParam = (badParam: any): void => {

    it(`should return result=null and success=false for param=${badParam}`, (done: () => void): void => {

      new GetVendorListCommand((result: null, success: boolean): void => {

        expect(result, 'result').to.be.null;
        expect(success, 'success').to.be.false;
        done();

      }, badParam);

      if (XMLHttpTestTools.requests.length) {

        const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

        req.respond(404, 'text/html; charset=UTF-8', '');

      }

    });

  };

  runFailWithParam(null);
  runFailWithParam({});
  runFailWithParam('banana');
  runFailWithParam(['banana', 'apple', 'cake']);
  runFailWithParam(true);
  runFailWithParam(false);
  runFailWithParam(30000);
  runFailWithParam(0);
  runFailWithParam(1.1);
  runFailWithParam([1.7, 1.34]);

});