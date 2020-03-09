import * as sinon from 'sinon';
import {GVL, TCString, TCModel} from '../src';
import {GVLFactory, XMLHttpTestTools} from '@iabtcf/testing';

import {expect} from 'chai';

describe('Issues Reported', (): void => {

  it('91 TCString.encode use 0 as vendorListVersion instead of gvl', (done: () => void): void => {

    const gvl = GVLFactory.getLatest();
    gvl.readyPromise.then((): void => {

      const tcModel = new TCModel(gvl as unknown as GVL);
      tcModel.cmpId = 123;
      tcModel.cmpVersion = 1;
      tcModel.consentScreen = 3;
      const encodedTCString = TCString.encode(tcModel);

      const decodeIt = (): void => {

        TCString.decode(encodedTCString);// Throw error

      };

      expect(decodeIt, 'decoding it').not.to.throw;
      done();

    });

  });

  it('77 should not delete tcfPolicyVersion and gvlSpecificationVersion after a language is changed', (done: () => void): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const language = 'FR';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const translationJson = require('@iabtcf/testing/lib/vendorlist/purposes-fr.json');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const gvl = new GVL(require('@iabtcf/testing/lib/vendorlist/vendor-list.json'));
    const {tcfPolicyVersion, gvlSpecificationVersion} = gvl;

    gvl.changeLanguage(language).then((): void => {

      expect(gvl.tcfPolicyVersion, 'gvl.tcfPolicyVersion').to.equal(tcfPolicyVersion);
      expect(gvl.gvlSpecificationVersion, 'gvl.gvlSpecificationVersion').to.equal(gvlSpecificationVersion);
      done();

    });

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));

  });

});
