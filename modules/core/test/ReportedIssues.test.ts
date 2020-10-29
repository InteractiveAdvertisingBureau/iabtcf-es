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
    const tcModel = new TCModel(GVLFactory.getVersion(23) as unknown as GVL);
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
    const vendors = [12, 100];

    tcModel.gvl.narrowVendorsTo(vendors);
    tcModel.vendorsDisclosed.empty();
    tcModel.setAllVendorsDisclosed();
    expect(tcModel.vendorsDisclosed.size, 'tcModel.vendorsDisclosed.size').to.equal(vendors.length);

    const decoded = TCString.decode(TCString.encode(tcModel));

    expect(decoded.vendorsDisclosed.size, 'decoded.vendorsDisclosed.size').to.equal(vendors.length);

  });

  it('142 it should throw an error if the bitfield length does not match the maxId', (): void => {

    const str = 'CLSYjTaOngnCIAOABBENAXCMAGOAABBAAA7IA5n-m7fP6_3fbqVv6E__PoA5Aqff3aJx8tv_1967rfnQEQoAIAAQCrwkAEABAcACABIMACAAuApEVABABUSABgBCAVSAtIoACACIArYQAHACgAFgAVwBJgDcAI7AWgMAAgBiKgAgBMgFfKQAQBRkQAQA4AFiBAAoA-AEVAJlAVgAtYcACAJcAr4eABAK8OgBgFzAOmAqwgABAWyA.IFukWSQh';

    expect((): void => {

      TCString.decode(str);

    }).to.throw();

  });

  it('156 it should auto detect 1 version', (): void => {

    const str = 'BOhwdphOxFC7tAHABBFRC--AAAAuhr_7__7-_9_-_f__9uj3Or_v_f__32ccL59v_h_7v-_7fi_20nV4u_1vft9yfk1-5ctDztp507iakivXmqdeb9v_nz3_5pxP78k89r7337Ew_v8_v-b7BCON_YxEiA';

    const decoded = TCString.decode(str);

    expect(decoded.version, 'decoded.version').to.equal(1);

  });

  it('162 Legal basis purpose restriction is reflected on vendors without flexible purposes too', async (): Promise<void> => {

    const gvl = GVLFactory.getVersion(36) as unknown as GVL;

    await gvl.readyPromise;

    // Vendor 4 does not have any flexible purpose at GVL version 36
    const vendorId = 4;
    // Vendor 4 specifies purpose 2 as consent purpose
    const purposeId = 2;
    const tcModel = new TCModel(gvl);
    const purposeRestriction = new PurposeRestriction(purposeId, RestrictionType.REQUIRE_LI);

    tcModel.cmpId = makeRandomInt(2, 100);
    tcModel.isServiceSpecific = true;

    tcModel.publisherRestrictions.add(vendorId, purposeRestriction);

    const decodedTCModel = TCString.decode(TCString.encode(tcModel));

    expect(decodedTCModel.publisherRestrictions.getVendors(purposeRestriction)).be.an('array')
      .that.is.empty;

  });

  it('204 Not possible to set vendorConsent for vendor which declared felxiblePurposes but no purposes', async (): Promise<void> => {

    const gvl = GVLFactory.getVersion(51) as unknown as GVL;

    await gvl.readyPromise;

    const vendorIds = [688, 751, 684, 729, 730];
    const tcModel = new TCModel(gvl);
    tcModel.cmpId = makeRandomInt(2, 100);
    tcModel.isServiceSpecific = true;

    vendorIds.forEach((vendorId: number): void => {

      const vendor = gvl.vendors[vendorId];

      // check the vendor first – if the GVL changes then this may not be the same
      expect(vendor.flexiblePurposes, 'flexiblePurposes for ' + vendor.id).to.be.an('array').that.is.not.empty;
      const purposeId = vendor.flexiblePurposes[0];
      let purposeRestriction: PurposeRestriction;

      if (vendor.purposes.length) {

        purposeRestriction = new PurposeRestriction(purposeId, RestrictionType.REQUIRE_CONSENT);
        tcModel.vendorConsents.set(vendorId);

      } else if (vendor.legIntPurposes.length) {

        purposeRestriction = new PurposeRestriction(purposeId, RestrictionType.REQUIRE_LI);
        tcModel.vendorLegitimateInterests.set(vendorId);

      }

      tcModel.publisherRestrictions.add(vendorId, purposeRestriction);

    });

    const decodedTCModel = TCString.decode(TCString.encode(tcModel));

    vendorIds.forEach((vendorId: number): void => {

      const vendor = gvl.vendors[vendorId];

      if (vendor.purposes.length) {

        expect(decodedTCModel.vendorConsents.has(vendorId), `decoded tcModel.vendorConsents.has(${vendorId})`).to.be.true;

      } else if (vendor.legIntPurposes.length) {

        expect(decodedTCModel.vendorLegitimateInterests.has(vendorId), `decoded tcModel.vendorLegitimateInterests.has(${vendorId})`).to.be.true;

      }

    });

  });

  it('191 vendorConsents empty when decoding TCF 1.1 consentString that uses vendorRangeList', async (): Promise<void> => {

    const tcModel = TCString.decode('BO2e4qiO2e4qiB9ABADEDS-AAAAxKABgACBiQA');

    expect(tcModel.vendorConsents.size, `vendorConsents size`).not.to.equal(0);

  });

  it('201 unable to decode valid TCF2 String', (): void => {

    let tcModel: TCModel;

    /**
     * This TC String has a purpose restriction encoded for a vendor multiple
     * times
     */
    expect((): void => {

      tcModel = TCString.decode('CO4VGswO4VGswAfZCBDEAzCsAP_AAH_AAAigGUNf_X9fb2vj-_599_t0eY1f9_63t-wzjheMs-8NyZ-X_J4Wv2MyvB34JqQKGRgkunLBAQdtHGncTQgBwIlViTLMY02MjzNKJrJEilsbe2dYGH9vn8XT_ZKZ70-_v__7v3___33_5Ayhr_6_r7e18f3_Pvv9ujzGr_v_W9v2GccLxln3huTPy_5PC1-xmV4O_BNSBQyMEl05YICDto407iaEAOBEqsSZZjGmxkeZpRNZIkUtjb2zrAw_t8_i6f7JTPen39___d-___--__ICgKAOAAcAA4AFAAjgB6AEYALcGACAW0AtoJAHAAOAAcACgARwA9ACMAFuFABALaAW0GgDgAHAAOABQAI4AegBGAC3DgAgFtALaEQBwADgAHAAoAEcAPQAjABbiQAQC2gFtCoA4ABwADgAUACOAHoARgAtxYAIBbQC2hkAcAA4ABwAKABHAD0AIwAW40AEAtoBbQ6AOAAcAA4AFAAjgB6AEYALceACAW0AtohAHAAOAAcACgARwA9ACMAFuRABALaAW0SgDgAHAAOABQAI4AegBGAC3JgAgFtALaKQBwADgAHAAoAEcAPQAjABblQAQC2gFtA');

    }).not.to.throw();

    expect(tcModel.version, `tcModel.version`).to.equal(2);
    expect(tcModel.publisherRestrictions.getVendors(new PurposeRestriction(1, 1)), `tcModel.publisherRestrictions vendor array`).to.deep.equal([7, 20, 71, 122, 140, 183]);

  });

});
