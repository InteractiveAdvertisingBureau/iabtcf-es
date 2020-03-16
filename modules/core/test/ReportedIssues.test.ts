import * as sinon from 'sinon';
import {GVL, TCString, TCModel} from '../src';
import {XMLHttpTestTools} from '@iabtcf/testing';

import {expect} from 'chai';

describe('Issues Reported', (): void => {

  it('99 Cannot pass json object to ctor', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vendorlist = require('@iabtcf/testing/lib/vendorlist/vendor-list.json');

    expect((): void => {

      new TCModel(vendorlist);

    }, 'constructing a tcmodel with vendorlist').not.to.throw();

    expect(XMLHttpTestTools.requests.length, 'requests length after constructing TCModel').to.equal(0);

    expect((): void => {

      new GVL(vendorlist);

    }, 'constructing a GVL with vendorlist').not.to.throw();

    expect(XMLHttpTestTools.requests.length, 'requests length after constructing GVL').to.equal(0);

  });

  it('91 TCString.encode use 0 as vendorListVersion instead of gvl', (done: () => void): void => {

    const CMPID = 23;
    const CMPVERSION = 3;
    const CONSENTSCREEN = 1;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vendorlist = require('@iabtcf/testing/lib/vendorlist/vendor-list.json');

    GVL.baseUrl = 'http://mydomain.com/cmp/vendorlist';
    GVL.latestFilename = 'vendor-list.json';
    const gvl = new GVL('LATEST');
    gvl.readyPromise.then(() => {

      const tcModel = new TCModel(gvl);
      tcModel.cmpId = CMPID;
      tcModel.cmpVersion = CMPVERSION;
      tcModel.consentScreen = CONSENTSCREEN;
      const encodedTCString = TCString.encode(tcModel);

      const decodeFunc = (): void => {

        TCString.decode(encodedTCString);// Throw error

      };

      expect(decodeFunc, 'decodeFunc').not.to.throw();
      done();

    });

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlist));

  });

  it('77 should not delete tcfPolicyVersion and gvlSpecificationVersion after a language is changed', (done: () => void): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const language = 'fr';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const translationJson = require('@iabtcf/testing/lib/vendorlist/purposes-fr.json');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const gvl = new GVL(require('@iabtcf/testing/lib/vendorlist/vendor-list.json'));
    const {tcfPolicyVersion, gvlSpecificationVersion} = gvl;

    expect(tcfPolicyVersion, 'tcfPolicyVersion').to.equal(2);
    expect(gvlSpecificationVersion, 'gvlSpecificationVersion').to.equal(2);

    gvl.changeLanguage(language).then((): void => {

      expect(gvl.tcfPolicyVersion, 'gvl.tcfPolicyVersion').to.equal(tcfPolicyVersion);
      expect(gvl.gvlSpecificationVersion, 'gvl.gvlSpecificationVersion').to.equal(gvlSpecificationVersion);
      done();

    });

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));

  });

});
