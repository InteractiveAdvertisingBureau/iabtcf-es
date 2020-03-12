import {expect} from 'chai';
import * as sinon from 'sinon';
import {GVL} from '../src/GVL';
import {Vendor} from '../src/model/gvl';
import {IntMap} from '../src/model/IntMap';
import {XMLHttpTestTools} from '@iabtcf/testing';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vendorlistJson = require('@iabtcf/testing/lib/vendorlist/vendor-list.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const translationJson = require('@iabtcf/testing/lib/vendorlist/purposes-fr.json');

const gvlKeys: string[] = [
  'gvlSpecificationVersion',
  'vendorListVersion',
  'tcfPolicyVersion',
  'lastUpdated',
  'purposes',
  'specialPurposes',
  'features',
  'specialFeatures',
  'vendors',
  'stacks',
];

describe('GVL', (): void => {

  const assertPopulated = (gvl: GVL): void => {

    gvlKeys.forEach((key: string): void => {

      const msg = `${key} should match`;

      if (key === 'lastUpdated') {

        expect((gvl[key] as Date).getTime(), msg)
          .to.equal((new Date(vendorlistJson.lastUpdated).getTime()));

      } else if (typeof vendorlistJson[key] === 'object') {

        expect(gvl[key], msg).to.deep.equal(vendorlistJson[key]);

      } else {

        expect(gvl[key], msg).to.equal(vendorlistJson[key]);

      }

    });

  };

  beforeEach((): void => {

    GVL.baseUrl = '';

  });

  it('should fail to intialize without setting baseUrl', (): void => {

    // calls constructor
    expect((): void => {

      new GVL();

    }).to.throw('must specify GVL.baseUrl before loading GVL json');

  });

  it('should fail to set baseUrl to http://vendorlist.consensu.org/', (): void => {

    // calls constructor
    expect((): void => {

      GVL.baseUrl = 'http://vendorlist.consensu.org/';

    }).to.throw('Invalid baseUrl!  You may not pull directly from vendorlist.consensu.org and must provide your own cache');

  });

  it('should add a trailing slash to baseUrl if one is not there', (): void => {

    const myURL = 'http://vendorlist.mysweetcmp.mgr.consensu.org';

    // calls constructor
    expect((): void => {

      GVL.baseUrl = myURL;

    }).not.to.throw();

    expect(GVL.baseUrl).to.equal(myURL + '/');

  });

  it('should fail to set baseUrl to https://vendorlist.consensu.org/ (secure url)', (): void => {

    // calls constructor
    expect((): void => {

      GVL.baseUrl = 'https://vendorlist.consensu.org/';

    }).to.throw('Invalid baseUrl!  You may not pull directly from vendorlist.consensu.org and must provide your own cache');

  });

  it('should propogate all values with passed in json', (): void => {

    const gvl: GVL = new GVL(vendorlistJson);

    assertPopulated(gvl);

  });

  it('should clone all values', (): void => {

    const gvl: GVL = new GVL(vendorlistJson);
    const clone: GVL = gvl.clone();

    assertPopulated(gvl);
    assertPopulated(clone);

  });

  it('should get latest GVL if nothing is passed to the constructor', (done): void => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const gvl: GVL = new GVL();

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}vendor-list.json`);

    gvl.readyPromise
      .then((): void => {

        assertPopulated(gvl);
        done();

      })
      .catch((): void => {

        expect.fail('Should have worked');

      });
    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

  });

  it('should get versioned GVL if version number is passed', (done): void => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const version = 23;
    const gvl: GVL = new GVL(version);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}archives/vendor-list-v${version}.json`);

    gvl.readyPromise
      .then((): void => {

        assertPopulated(gvl);
        done();

      })
      .catch((): void => {

        expect.fail('Should have worked');

      });
    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

  });

  it('should get versioned GVL if version number as string is passed', (done): void => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const version = '23';
    const gvl: GVL = new GVL(version);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}archives/vendor-list-v${version}.json`);

    gvl.readyPromise
      .then((): void => {

        assertPopulated(gvl);
        done();

      })
      .catch((): void => {

        expect.fail('Should have worked');

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
    const language = 'fr';
    const languageUpperCase = language.toUpperCase();

    expect(gvl.language).to.equal(GVL.DEFAULT_LANGUAGE);

    gvl.changeLanguage(language)
      .then((): void => {

        expect(gvl.purposes, 'gvl.purposes').to.deep.equal(translationJson.purposes);
        expect(gvl.specialPurposes, 'gvl.specialPurposes').to.deep.equal(translationJson.specialPurposes);
        expect(gvl.features, 'gvl.features').to.deep.equal(translationJson.features);
        expect(gvl.specialFeatures, 'gvl.specialFeatures').to.deep.equal(translationJson.specialFeatures);
        expect(gvl.stacks, 'gvl.stacks').to.deep.equal(translationJson.stacks);

        expect(gvl.purposes, 'gvl.purposes').to.not.deep.equal(vendorlistJson.purposes);
        expect(gvl.specialPurposes, 'gvl.specialPurposes').to.not.deep.equal(vendorlistJson.specialPurposes);
        expect(gvl.features, 'gvl.features').to.not.deep.equal(vendorlistJson.features);
        expect(gvl.specialFeatures, 'gvl.specialFeatures').to.not.deep.equal(vendorlistJson.specialFeatures);

        expect(gvl.language, 'gvl.language').to.equal(languageUpperCase);

        done();

      })
      .catch((): void => {

        expect.fail('Should have worked');

      });

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(GVL.baseUrl + GVL.languageFilename.replace('[LANG]', language));

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));

  });

  const langNotOk = (language: string): void => {

    it(`should throw an error if ${language} is passed to changeLanguage()`, (done: () => void): void => {

      GVL.baseUrl = 'http://sweetcmp.com';

      const gvl: GVL = new GVL(vendorlistJson);

      gvl.changeLanguage(language)
        .catch((err): void => {

          expect(err.message).to.contain('unsupported');

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
    expect(req.url).to.equal(GVL.baseUrl + GVL.languageFilename.replace('[LANG]', language));

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
        const gvlMap: IntMap<Vendor> =
          gvl[gvlMethodName](intId);

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
