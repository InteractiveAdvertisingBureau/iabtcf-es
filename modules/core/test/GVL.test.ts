import {expect} from 'chai';
import * as sinon from 'sinon';
import {GVL} from '../src/GVL';
import {Vendor} from '../src/model/gvl';
import {IntMap} from '../src/model/IntMap';
import {XMLHttpTestTools} from '@cookiehub/iabtcf-testing';
import {Json} from '../src/Json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vendorlistJson = require('@cookiehub/iabtcf-testing/lib/vendorlist/vendor-list-v24.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const translationJson = require('@cookiehub/iabtcf-testing/lib/vendorlist/purposes-fr.json');

describe('GVL', (): void => {

  const assertPopulated = (gvl: GVL): void => {

    Object.keys(vendorlistJson).forEach((key: string): void => {

      const msg = `assertPopulated(): gvl.${key}]`;

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

  const assertTranslated = (gvl: GVL, lang: string): void => {

    expect(gvl.purposes, 'gvl.purposes').to.deep.equal(translationJson.purposes);
    expect(gvl.specialPurposes, 'gvl.specialPurposes').to.deep.equal(translationJson.specialPurposes);
    expect(gvl.features, 'gvl.features').to.deep.equal(translationJson.features);
    expect(gvl.specialFeatures, 'gvl.specialFeatures').to.deep.equal(translationJson.specialFeatures);
    expect(gvl.stacks, 'gvl.stacks').to.deep.equal(translationJson.stacks);

    expect(gvl.purposes, 'gvl.purposes').to.not.deep.equal(vendorlistJson.purposes);
    expect(gvl.specialPurposes, 'gvl.specialPurposes').to.not.deep.equal(vendorlistJson.specialPurposes);
    expect(gvl.features, 'gvl.features').to.not.deep.equal(vendorlistJson.features);
    expect(gvl.specialFeatures, 'gvl.specialFeatures').to.not.deep.equal(vendorlistJson.specialFeatures);

    expect(gvl.language, 'gvl.language').to.equal(lang.toUpperCase());

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

  it('should fail to set baseUrl to https://vendorlist.consensu.org/ (secure url)', (): void => {

    // calls constructor
    expect((): void => {

      GVL.baseUrl = 'https://vendorlist.consensu.org/';

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

  it('should produce a clone with the same language as the original gvl using its language cache', async (): Promise<void> => {

    const fetchStub = sinon.stub(Json, 'fetch');
    const gvl: GVL = new GVL(vendorlistJson);
    expect(gvl.language).to.equal(GVL.DEFAULT_LANGUAGE);
    fetchStub.resolves(vendorlistJson);

    /*
     * We test fetchStub call count for both calls to make sure that we are only fetching translations for
     * the language once, when we 'changeLanguage' is called. Calling the 'clone' function should grab the
     * translations from the cache and call count will remain at 1. */
    await gvl.changeLanguage('fr');
    expect(gvl.language).to.equal('FR');
    expect(fetchStub.callCount).to.equal(1);

    const clone: GVL = gvl.clone();
    expect(clone.language).to.equal('FR');
    expect(fetchStub.callCount).to.equal(1);

    fetchStub.restore();

  });

  it('should get latest GVL if nothing is passed to the constructor', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const gvl: GVL = new GVL();

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}vendor-list.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    await gvl.readyPromise;

    assertPopulated(gvl);

  });

  it('should get latest GVL if "LATEST" is passed to the constructor', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const gvl: GVL = new GVL('LATEST');

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}vendor-list.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    await gvl.readyPromise;

    assertPopulated(gvl);

  });

  it('should get versioned GVL if version number is passed', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const version = 22;
    const gvl: GVL = new GVL(version);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}archives/vendor-list-v${version}.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    await gvl.readyPromise;

    assertPopulated(gvl);

  });

  it('should get versioned GVL if version number as string is passed', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const version = '23';
    const gvl: GVL = new GVL(version);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}archives/vendor-list-v${version}.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));
    await gvl.readyPromise;
    assertPopulated(gvl);

  });

  it('should not re-request the "LATEST" vendorlist json if it has already downloaded it', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const gvl: GVL = new GVL('LATEST');

    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}vendor-list.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));
    await gvl.readyPromise;

    const gvl2: GVL = new GVL('LATEST');
    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(1);
    expect(XMLHttpTestTools.requests[0], 'request').to.deep.equal(req);

    await gvl2.readyPromise;

    assertPopulated(gvl2);

  });

  it('should not re-request a versioned vendorlist json if it has already downloaded it', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const gvlVersion = vendorlistJson.vendorListVersion;
    const gvl: GVL = new GVL(gvlVersion);

    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}archives/vendor-list-v${gvlVersion}.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    await gvl.readyPromise;
    assertPopulated(gvl);

    const gvl2: GVL = new GVL(gvlVersion);
    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(1);
    expect(XMLHttpTestTools.requests[0], 'request').to.deep.equal(req);

    await gvl2.readyPromise;

    assertPopulated(gvl2);

  });

  it('should not re-request a vendorlist json if it has been passed in to the constructor', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const gvlVersion = vendorlistJson.vendorListVersion;
    const gvl: GVL = new GVL(vendorlistJson);

    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(0);

    await gvl.readyPromise;
    assertPopulated(gvl);

    const gvl2: GVL = new GVL(gvlVersion);
    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(0);

    await gvl2.readyPromise;

    assertPopulated(gvl2);

  });

  it('should not re-request a vendorlist json latest is request and then that version is requested later', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const gvlVersion = vendorlistJson.vendorListVersion;
    const gvl: GVL = new GVL();

    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}vendor-list.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));
    await gvl.readyPromise;
    assertPopulated(gvl);

    const gvl2: GVL = new GVL(gvlVersion);
    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(1);
    expect(XMLHttpTestTools.requests[0], 'request').to.deep.equal(req);

    await gvl2.readyPromise;

    assertPopulated(gvl2);

  });

  it('should narrow a group of vendors when narrowVendorsTo is called with list of ids', (): void => {

    const gvl: GVL = new GVL(vendorlistJson);
    const onlyVendorId: string = Object.keys(vendorlistJson.vendors)[0];

    gvl.narrowVendorsTo([parseInt(onlyVendorId, 10)]);
    expect(gvl.vendors[onlyVendorId]).to.deep.equal(vendorlistJson.vendors[onlyVendorId]);
    expect(Object.keys(gvl.vendors).length).to.equal(1);
    expect(gvl.vendors[Object.keys(vendorlistJson.vendors)[1]]).to.be.undefined;

  });

  it('should remove a vendor if it has a deletedDate', (): void => {

    const vendorId = '1';

    const json = new GVL(vendorlistJson).clone().getJson();
    json.vendors[vendorId] = {
      id: +vendorId,
      name: 'Fake Vendor with ID 1',
      purposes: [
        1,
        2,
        3,
        4,
      ],
      legIntPurposes: [
        7,
        9,
        10,
      ],
      flexiblePurposes: [
        2,
      ],
      deletedDate: '2020-01-28T00:00:00Z',
      specialPurposes: [],
      features: [
        2,
      ],
      specialFeatures: [],
      policyUrl: 'http://www.fakevendor.com/privacy-policy/',
      usesCookies: true,
      cookieMaxAgeSeconds: 1000,
      cookieRefresh: true,
      usesNonCookieAccess: false,
    };

    expect(json.vendors[vendorId], `json.vendors["${vendorId}"]`).not.to.be.undefined;
    const gvl: GVL = new GVL(json);
    expect(gvl.vendors[vendorId], `gvl.vendors["${vendorId}"]`).to.be.undefined;

  });

  it('should replace the language when changeLanguage() is called with valid language', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const gvl: GVL = new GVL(vendorlistJson);
    const language = 'fr';

    expect(gvl.language).to.equal(GVL.DEFAULT_LANGUAGE);

    const changePromise = gvl.changeLanguage(language);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.url).to.equal(GVL.baseUrl + GVL.languageFilename.replace('[LANG]', language));

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));

    await changePromise;

    assertTranslated(gvl, language);

  });

  const langNotOk = (language: string): void => {

    it(`should throw an error if ${language} is passed to changeLanguage()`, async (): Promise<void> => {

      GVL.baseUrl = 'http://sweetcmp.com';

      const gvl: GVL = new GVL(vendorlistJson);

      try {

        await gvl.changeLanguage(language);

      } catch (err) {

        expect(err.message).to.contain('unsupported');

      }

    });

  };

  langNotOk('{Z');
  langNotOk('-Z');
  langNotOk('35');
  langNotOk('ZZZ');
  langNotOk('US');
  langNotOk('usa');
  langNotOk('..');
  langNotOk(' EN');
  langNotOk('  ');
  langNotOk('aa');
  langNotOk('aaa');
  langNotOk('zz');
  langNotOk('AA');
  langNotOk('ZZ');
  // too short
  langNotOk('a');
  langNotOk('@#');
  langNotOk('15');
  langNotOk('{{');

  it('should not request a file if the language is "EN"', (): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const gvl: GVL = new GVL(vendorlistJson);

    expect(gvl.language).to.equal(GVL.DEFAULT_LANGUAGE);

    gvl.changeLanguage(GVL.DEFAULT_LANGUAGE);
    expect(XMLHttpTestTools.requests.length).to.equal(0);

  });

  it('should not re-request the same language file if it has already been loaded', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const gvl: GVL = new GVL(vendorlistJson);
    const lang = 'fr';

    expect(gvl.language).to.equal(GVL.DEFAULT_LANGUAGE);

    const changePromise = gvl.changeLanguage(lang);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(GVL.baseUrl + GVL.languageFilename.replace('[LANG]', lang));

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));

    await changePromise;

    assertTranslated(gvl, lang);

    const gvl2 = new GVL(vendorlistJson);

    expect(XMLHttpTestTools.requests.length).to.equal(1);
    expect(XMLHttpTestTools.requests[0], 'request').to.deep.equal(req);

    await gvl2.changeLanguage(lang);
    assertTranslated(gvl2, lang);

    expect(XMLHttpTestTools.requests.length).to.equal(1);
    expect(XMLHttpTestTools.requests[0], 'request').to.deep.equal(req);

  });

  it('should error if a 404 for the language file occurs', (done: () => void): void => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const gvl: GVL = new GVL(vendorlistJson);
    const language = 'FR';

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

  it('should delete a language from the cache when requested', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com';

    const gvl: GVL = new GVL(vendorlistJson);
    const lang = 'fr';

    expect(gvl.language).to.equal(GVL.DEFAULT_LANGUAGE);

    const changePromise = gvl.changeLanguage(lang);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.url).to.equal(GVL.baseUrl + GVL.languageFilename.replace('[LANG]', lang));

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));

    await changePromise;

    assertTranslated(gvl, lang);

    GVL.emptyLanguageCache();
    const gvl2 = new GVL(vendorlistJson);

    expect(XMLHttpTestTools.requests.length).to.equal(1);
    expect(XMLHttpTestTools.requests[0], 'request').to.deep.equal(req);

    const changePromise2 = gvl2.changeLanguage(lang);

    expect(XMLHttpTestTools.requests.length).to.equal(2);
    const req2: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[1];
    req2.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));

    await changePromise2;
    assertTranslated(gvl2, lang);

  });

  it('should delete a gvl version from the cache when requested', async (): Promise<void> => {

    GVL.baseUrl = 'http://sweetcmp.com/';

    const gvl: GVL = new GVL();

    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal('GET');
    expect(req.url).to.equal(`${GVL.baseUrl}vendor-list.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));
    await gvl.readyPromise;
    assertPopulated(gvl);

    GVL.emptyCache();

    const gvl2: GVL = new GVL();

    expect(XMLHttpTestTools.requests.length, 'requests.length').to.equal(2);

    const req2: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[1];

    expect(req2.method).to.equal('GET');
    expect(req2.url).to.equal(`${GVL.baseUrl}vendor-list.json`);

    req2.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    await gvl2.readyPromise;

    assertPopulated(gvl2);

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
