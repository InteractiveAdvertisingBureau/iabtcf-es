import {expect} from 'chai';
import * as sinon from 'sinon';
import {GVL} from '../src/GVL';
import {Vendor} from '../src/model/gvl';
import {IntMap} from '../src/model/IntMap';
import {XMLHttpTestTools} from 'XMLHttpTestTools';

// eslint-disable-next-line
const vendorlistJson = require('../../../dev/vendor-list.json');
// eslint-disable-next-line
const translationJson = require(`../../../dev/purposes-fr.json`);

describe('GVL', (): void => {

  const assertPopulated = (gvl: GVL): void => {

    expect(gvl.gvlSpecificationVersion, 'gvlSpecificationVersion should match')
      .to.equal(vendorlistJson.gvlSpecificationVersion);
    expect(gvl.vendorListVersion, 'vendorListVersion should match').to.equal(vendorlistJson.vendorListVersion);
    expect(gvl.tcfPolicyVersion, 'tcfPolicyVersion should match').to.equal(vendorlistJson.tcfPolicyVersion);
    expect((gvl.lastUpdated as Date).getTime(), 'lastUpdated  should match')
      .to.equal((new Date(vendorlistJson.lastUpdated).getTime()));
    expect(gvl.purposes, 'purposes should match').to.deep.equal(vendorlistJson.purposes);
    expect(gvl.specialPurposes, 'specialPurposes should match').to.deep.equal(vendorlistJson.specialPurposes);
    expect(gvl.features, 'features should match').to.deep.equal(vendorlistJson.features);
    expect(gvl.specialFeatures, 'specialFeatures should match').to.deep.equal(vendorlistJson.specialFeatures);
    expect(gvl.vendors, 'vendors should match').to.deep.equal(vendorlistJson.vendors);
    expect(gvl.stacks, 'stacks should match').to.deep.equal(vendorlistJson.stacks);

  };

  beforeEach((): void => {

    GVL.baseUrl = '';
    XMLHttpTestTools.beforeEach();

  });
  afterEach(XMLHttpTestTools.afterEach);

  it('should fail to build without setting baseUrl', (): void => {

    // calls constructor
    expect((): void => {

      new GVL();

    }).to.throw('must specify GVL.baseUrl before loading GVL json');

  });

  it('should propogate all values with passed in json', (): void => {

    const gvl: GVL = new GVL(vendorlistJson);

    assertPopulated(gvl);

  });

  it('should get latest GVL if nothing is passed to the constructor', (done): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const gvl: GVL = new GVL();

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}/vendor-list.json`);

    gvl.readyPromise.then((): void => {

      assertPopulated(gvl);
      done();

    });
    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

  });

  it('should get versioned GVL if version number is passed', (done): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const version = 23;
    const gvl: GVL = new GVL(version);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}/archives/vendor-list-v${version}.json`);

    gvl.readyPromise.then((): void => {

      assertPopulated(gvl);
      done();

    });
    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

  });

  it('should get versioned GVL if version number as string is passed', (done): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const version = '23';
    const gvl: GVL = new GVL(version);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}/archives/vendor-list-v${version}.json`);

    gvl.readyPromise.then((): void => {

      assertPopulated(gvl);
      done();

    });

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

  });

  it('should narrow a group of vendors when narrowVendorsTo is called with list of ids', (): void => {

    if (Object.keys(vendorlistJson.vendors).length > 1) {

      const gvl: GVL = new GVL(vendorlistJson);
      const onlyVendorId: string = Object.keys(vendorlistJson.vendors)[0];

      gvl.narrowVendorsTo([parseInt(onlyVendorId, 10)]);
      expect(gvl.vendors[onlyVendorId]).to.deep.equal(vendorlistJson.vendors[onlyVendorId]);
      expect(gvl.vendors[Object.keys(vendorlistJson.vendors)[1]]).to.be.undefined;

    }

  });

  it('should replace the language when changeLanguage() is called with valid language', (done: () => void): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const gvl: GVL = new GVL(vendorlistJson);
    const language = 'FR';

    expect(gvl.language).to.equal(GVL.DEFAULT_LANGUAGE);

    gvl.changeLanguage(language).then((): void => {

      expect(gvl.purposes, 'purposes should match').to.deep.equal(translationJson.purposes);
      expect(gvl.specialPurposes, 'specialPurposes should match').to.deep.equal(translationJson.specialPurposes);
      expect(gvl.features, 'features should match').to.deep.equal(translationJson.features);
      expect(gvl.specialFeatures, 'specialFeatures should match').to.deep.equal(translationJson.specialFeatures);
      expect(gvl.stacks, 'stacks should match').to.deep.equal(translationJson.stacks);

      expect(gvl.purposes, 'purposes should match').to.not.deep.equal(vendorlistJson.purposes);
      expect(gvl.specialPurposes, 'specialPurposes should match').to.not.deep.equal(vendorlistJson.specialPurposes);
      expect(gvl.features, 'features should match').to.not.deep.equal(vendorlistJson.features);
      expect(gvl.specialFeatures, 'specialFeatures should match').to.not.deep.equal(vendorlistJson.specialFeatures);

      expect(gvl.language).to.equal(language);

      done();

    });

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(GVL.baseUrl + '/' + GVL.languageFilename.replace('[LANG]', language));

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));

  });

  const langNotOk = (language: string): void => {

    it(`should throw an error if ${language} is passed to changeLanguage()`, (done: () => void): void => {

      GVL.baseUrl = 'http://sweetcmp.com';

      const gvl: GVL = new GVL(vendorlistJson);

      gvl.changeLanguage(language)
        .catch((err): void => {

          expect(err.message).to.contain('invalid');

          done();

        });

    });

  };

  langNotOk('{Z');
  langNotOk('-Z');
  langNotOk('35');
  langNotOk('ZZZ');
  langNotOk('US');
  langNotOk('usa');
  langNotOk('..');

  it(`should throw an error if GVL.baseUrl isn't set before changeLaguage() is called`, (done: () => void): void => {

    const gvl: GVL = new GVL(vendorlistJson);

    // must remove it otherwise it won't work
    gvl.emptyLanguageCache('FR');

    gvl.changeLanguage('FR')
      .then((): void => {

        expect.fail(`without setting GVL.baseURL, this should have failed: ${GVL.baseUrl}`);
        done();

      })
      .catch((err): void => {

        // expect(err).to.be.an.instanceof(GVLError);
        expect(err.message).to.contain('GVL.baseUrl');
        done();

      });

  });

  it('should not request a file if the language is the same', (): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const gvl: GVL = new GVL(vendorlistJson);

    expect(gvl.language).to.equal(GVL.DEFAULT_LANGUAGE);

    gvl.changeLanguage(GVL.DEFAULT_LANGUAGE);
    expect(XMLHttpTestTools.requests.length).to.equal(0);

  });

  it('should error if a 404 for the language file occurs', (done: () => void): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const gvl: GVL = new GVL(vendorlistJson);
    const language = 'FR';
    gvl.emptyLanguageCache('FR');

    expect(gvl.language).to.equal(GVL.DEFAULT_LANGUAGE);

    gvl.changeLanguage(language)
      .then((): void => {

        expect.fail('should not have resolved');

      })
      .catch((err): void => {

        // expect(err).to.be.an.instanceof(GVLError);
        expect(err.message).to.contain('language');
        done();

      });

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(GVL.baseUrl + '/' + GVL.languageFilename.replace('[LANG]', language));

    req.respond(404, XMLHttpTestTools.JSON_HEADER, JSON.stringify({}));

  });

  const capitalize = (str: string): string => {

    return str.charAt(0).toUpperCase() + str.slice(1);

  };

  const vendorGroupGoodTest = (purposeOrFeature: string, subType: string, special: boolean): void => {

    it(`should group vendors by${special ? ' special' : ''} ${purposeOrFeature} ${subType}`, (): void => {

      GVL.baseUrl = 'http://sweetcmp.com';

      const gvl: GVL = new GVL(vendorlistJson);
      let gvlKey: string;
      let vendorKey: string;

      if (special) {

        gvlKey = 'special' + capitalize(purposeOrFeature);
        vendorKey = gvlKey;

      } else {

        gvlKey = purposeOrFeature;

        if (subType && subType !== 'consent') {

          vendorKey = subType + capitalize(purposeOrFeature);

        } else {

          vendorKey = gvlKey;

        }

      }

      vendorKey = vendorKey + 'Ids';

      gvlKey += 's';

      Object.keys(gvl[gvlKey]).forEach((id: string): void => {

        const intId: number = parseInt(id, 10);
        const cappedPORF: string = capitalize(purposeOrFeature);
        let specialOrSubType: string = (special) ? 'Special' : '';

        if (!specialOrSubType && subType) {

          specialOrSubType = capitalize(subType);

        }

        const gvlMethodName: string = 'getVendorsWith' + specialOrSubType + cappedPORF;
        const gvlMap: IntMap<Vendor>
          = gvl[gvlMethodName](intId);

        Object.keys(vendorlistJson.vendors).forEach((vendorId: string): void => {

          const vendor: object = vendorlistJson.vendors[vendorId];
          const values: number[] = vendor[vendorKey];

          if (values && values.includes(intId)) {

            expect(gvlMap[vendorId], `vendorId ${vendorId} should be in the map when ${gvlMethodName}() is called` )
              .to.not.be.undefined;
            expect(gvlMap[vendorId]).to.deep.equal(vendor);

          }

        });

      });

    });

  };

  vendorGroupGoodTest('purpose', 'consent', false);
  vendorGroupGoodTest('purpose', 'legInt', false);
  vendorGroupGoodTest('purpose', 'flexible', false);
  vendorGroupGoodTest('purpose', '', true);

  vendorGroupGoodTest('feature', '', false);
  vendorGroupGoodTest('feature', '', true);

});
