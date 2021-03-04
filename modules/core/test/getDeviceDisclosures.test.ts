import sinon from 'sinon';
import {expect} from 'chai';
import {Json} from '../src/Json';
import {XMLHttpTestTools} from '@iabtcf/testing';
import {DeviceDisclosure} from '../src/model/DeviceDisclosure';
import {getDeviceDisclosures} from '../src/getDeviceDisclosures';

const generateMockDisclosures = (): DeviceDisclosure[] => {

  return [{
    identifier: 'agnes',
    maxAgeSeconds: 3000000,
    purposes: [1, 2],
    type: 'cookie',
  }];

};

describe('getDeviceDisclosure', (): void => {

  const URL = 'it was Agatha all along';
  let mockDisclosures: DeviceDisclosure[];
  let jsonStub: sinon.SinonStub;

  beforeEach((): void => {

    XMLHttpTestTools.beforeEach(); // can remove when the unit tests join the entire suite.
    mockDisclosures = generateMockDisclosures();
    jsonStub = sinon.stub(Json, 'fetch');

  });

  afterEach(sinon.restore);

  it('should only parse valid keys', async (): Promise<void> => {

    (mockDisclosures[0] as unknown)['name'] = 'Agatha Harkness';
    jsonStub.resolves({disclosures: mockDisclosures});

    const actual: DeviceDisclosure[] = await getDeviceDisclosures(URL, 5);
    const containsValidKeys = !Object.keys(actual[0]).includes('name');
    expect(containsValidKeys).to.be.true;

  });

  it('should contain domain if disclosure type is web or cookie', async (): Promise<void> => {

    mockDisclosures[0].domain = 'Salem';
    jsonStub.resolves({disclosures: mockDisclosures});

    const actual: DeviceDisclosure[] = await getDeviceDisclosures(URL, 5);
    expect(actual[0].domain).to.equal('Salem');

  });

  it('should not have domain key if disclosure type app', async (): Promise<void> => {

    mockDisclosures[0].domain = 'Salem';
    mockDisclosures[0].type = 'app';
    jsonStub.resolves({disclosures: mockDisclosures});

    const actual: DeviceDisclosure[] = await getDeviceDisclosures(URL, 5);
    expect(actual[0].domain).to.be.undefined;

  });

  it('should contain maxAgeSeconds if disclosure type is cookie', async (): Promise<void> => {

    jsonStub.resolves({disclosures: mockDisclosures});

    const actual: DeviceDisclosure[] = await getDeviceDisclosures(URL, 5);
    expect(actual[0].maxAgeSeconds).to.equal(generateMockDisclosures()[0].maxAgeSeconds);

  });

  it('should contain maxAgeSeconds with value null if disclosure type is web or app', async (): Promise<void> => {

    mockDisclosures[0].type = 'web';
    jsonStub.resolves({disclosures: mockDisclosures});

    const actual: DeviceDisclosure[] = await getDeviceDisclosures(URL, 5);
    expect(actual[0].maxAgeSeconds).to.be.null;

  });

  it('should contain cookieRefresh if disclosure type is cookie', async (): Promise<void> => {

    mockDisclosures[0].cookieRefresh = true;
    jsonStub.resolves({disclosures: mockDisclosures});

    const actual: DeviceDisclosure[] = await getDeviceDisclosures(URL, 5);
    expect(actual[0].cookieRefresh).to.be.true;

  });

  it('should not have cookieRefresh key if disclosure type is web or app', async (): Promise<void> => {

    mockDisclosures[0].cookieRefresh = true;
    mockDisclosures[0].type = 'web';
    jsonStub.resolves({disclosures: mockDisclosures});

    const actual: DeviceDisclosure[] = await getDeviceDisclosures(URL, 5);
    expect(actual[0].cookieRefresh).to.be.undefined;

  });

  it('should not have a key if the publisher omitted or forgot the given key', async (): Promise<void> => {

    mockDisclosures[0].identifier = undefined;
    mockDisclosures[0].purposes = undefined;
    jsonStub.resolves({disclosures: mockDisclosures});

    const actual: DeviceDisclosure[] = await getDeviceDisclosures(URL, 5);
    expect(actual[0].identifier).to.equal('');
    expect(actual[0].purposes.length).to.equal(0);

  });

  it('should only return device disclosures that have non-default values', async (): Promise<void> =>{

    mockDisclosures[0].identifier = '';
    mockDisclosures[0].maxAgeSeconds = null;
    mockDisclosures[0].purposes = [];
    mockDisclosures[0].type = '';
    jsonStub.resolves({disclosures: mockDisclosures});

    const actual: DeviceDisclosure[] = await getDeviceDisclosures(URL, 5);
    expect(actual.length).to.equal(0);

  });

});
