import * as sinon from 'sinon';
import {GVL, TCString, TCModel} from '../src';
import {XMLHttpTestTools, makeRandomInt, GVLFactory} from '@iabtcf/testing';

import {expect} from 'chai';
import {PurposeRestriction} from '../src/model/PurposeRestriction';
import {RestrictionType} from '../src/model/RestrictionType';

describe('Issues Reported', (): void => {

  it('112 Vendor ranges incorrectly decoded from publisher restrictions', async (): Promise<void> => {

    const CMPID = makeRandomInt(2, 100);
    const CMPVERSION = makeRandomInt(1, 63);
    const CONSENTSCREEN = makeRandomInt(1, 63);
    const purposeRestriction = new PurposeRestriction(2, RestrictionType.NOT_ALLOWED);
    const tcModel = new TCModel(GVLFactory.getLatest() as unknown as GVL);
    const vendorID1 = 8;
    const vendorID2 = vendorID1 + 1;

    tcModel.cmpId = CMPID;
    tcModel.cmpVersion = CMPVERSION;
    tcModel.consentScreen = CONSENTSCREEN;

    tcModel.publisherRestrictions.add(vendorID1, purposeRestriction);
    tcModel.publisherRestrictions.add(vendorID2, purposeRestriction);

    await tcModel.gvl.readyPromise;

    const encodedTCString = TCString.encode(tcModel);
    const newTCModel = TCString.decode(encodedTCString);
    const vendors = newTCModel.publisherRestrictions.getVendors(purposeRestriction);

    for (let i = 1; i < 17; i++) {

      if (i === vendorID1 || i === vendorID2) {

        expect(vendors.includes(i), `vendor id ${i}`).to.be.true;

      } else {

        expect(vendors.includes(i), `vendor id ${i}`).to.be.false;

      }

    }

  });

  it('91 TCString.encode use 0 as vendorListVersion instead of gvl', async (): Promise<void> => {

    const CMPID = makeRandomInt(2, 100);
    const CMPVERSION = makeRandomInt(1, 63);
    const CONSENTSCREEN = makeRandomInt(1, 63);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vendorlist = require('@iabtcf/testing/lib/vendorlist/vendor-list.json');

    GVL.baseUrl = 'http://mydomain.com/cmp/vendorlist';

    const gvl = new GVL('LATEST');
    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlist));
    await gvl.readyPromise;

    const tcModel = new TCModel(gvl);
    tcModel.cmpId = CMPID;
    tcModel.cmpVersion = CMPVERSION;
    tcModel.consentScreen = CONSENTSCREEN;

    const encodedTCString = TCString.encode(tcModel);

    const decodeFunc = (): void => {

      TCString.decode(encodedTCString);// Throw error

    };

    expect(decodeFunc, 'decodeFunc').not.to.throw();

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

  it('122 consentLanguage should not be ignored', (): void => {

    const FRENCH = 'FR';
    const ENGLISH = 'EN';

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const gvl = new GVL(require('@iabtcf/testing/lib/vendorlist/vendor-list.json'));
    const tcModel = new TCModel(gvl);

    expect(tcModel.consentLanguage, 'consentLanguage').to.equal(ENGLISH);

    tcModel.consentLanguage = FRENCH;

    expect(tcModel.consentLanguage, 'consentLanguage').to.equal(FRENCH);

  });

  it('117 TCString.encode writes all vendors as disclosed even after GVL.narrowVendorsTo([...])', async (): Promise<void> => {

    const tcModel = new TCModel(new GVL());
    tcModel.cmpId = makeRandomInt(2, 100);
    tcModel.cmpVersion = makeRandomInt(1, 100);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vendorlist = require('@iabtcf/testing/lib/vendorlist/vendor-list.json');
    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlist));

    await tcModel.gvl.readyPromise;

    tcModel.gvl.narrowVendorsTo([12, 100]);
    tcModel.vendorsDisclosed.empty();
    tcModel.setAllVendorsDisclosed();
    expect(tcModel.vendorsDisclosed.size, 'tcModel.vendorsDisclosed.size').to.equal(2);

    const encoded = TCString.encode(tcModel);
    const decoded = TCString.decode(encoded);

    expect(decoded.vendorsDisclosed.size, 'decoded.vendorsDisclosed.size').to.equal(2);

  });

  it('140 Unable to set and unset individual purposes, specialFeatures, or vendors', async (): Promise<void> => {

    const tcModel = new TCModel(new GVL());
    tcModel.cmpId = makeRandomInt(2, 100);
    tcModel.cmpVersion = makeRandomInt(1, 100);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vendorlist = require('@iabtcf/testing/lib/vendorlist/vendor-list.json');
    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlist));

    await tcModel.gvl.readyPromise;

    const optedInPurposeIds = [1, 2, 3]; // purposes the user has selected
    tcModel.purposeConsents.set(optedInPurposeIds);
    expect((): void => {

      TCString.encode(tcModel);

    }).not.to.throw();

  });

});
