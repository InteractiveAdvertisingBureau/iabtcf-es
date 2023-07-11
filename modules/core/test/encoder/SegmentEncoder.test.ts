import {expect} from 'chai';
import {GVLFactory, TCModelFactory, sameDataDiffRef, makeRandomInt, makeRandomString} from '@iabtechlabtcf/testing';
import {SegmentEncoder} from '../../src/encoder';
import {TCModel, GVL} from '../../src';
import {Segment} from '../../src/model';
import {IntMap} from '../../src/model/IntMap';
import {Purpose} from '../../src/model/gvl/Purpose';

const gvl: GVL = GVLFactory.getLatest() as unknown as GVL;

describe('encoder->SegmentEncoder', (): void => {

  const getTCModelWithGVL = (): TCModel => {

    return TCModelFactory.withGVL() as unknown as TCModel;

  };

  it('should encode a core segment', async (): Promise<void> => {

    const tcModel: TCModel = getTCModelWithGVL();
    let encoded = '';

    const encodeIt = (): void => {

      encoded = SegmentEncoder.encode(tcModel, Segment.CORE);

    };

    await tcModel.gvl.readyPromise;

    expect(encodeIt, 'encode should not throw an error').not.to.throw();
    expect(encoded, 'shold not be empty').to.not.equal('');

  });

  it('should ensure that encode not throws an error', async (): Promise<void> => {

    const tcModel: TCModel = getTCModelWithGVL();

    const encodeIt = (): void => {

      SegmentEncoder.encode(tcModel, Segment.CORE);

    };

    await tcModel.gvl.readyPromise;

    expect(encodeIt, 'encode should not throw an error').not.to.throw();

  });

  it('should ensure that decode not throws an error', async (): Promise<void> => {

    const tcModel: TCModel = getTCModelWithGVL();
    const encoded = SegmentEncoder.encode(tcModel, Segment.CORE);

    const decodeIt = (): void => {

      SegmentEncoder.decode(encoded, tcModel, Segment.CORE);

    };

    await tcModel.gvl.readyPromise;

    expect(decodeIt, 'decode should not throw an error').not.to.throw();

  });

  it('should ensure that (en/de)coded (in/out)put restrictions are the same', async (): Promise<void> => {

    const tcModel: TCModel = getTCModelWithGVL();
    const encoded = SegmentEncoder.encode(tcModel, Segment.CORE);
    const decoded = SegmentEncoder.decode(encoded, tcModel, Segment.CORE);

    await tcModel.gvl.readyPromise;

    expect(encoded, 'should not be empty').to.not.equal('');
    expect(decoded, 'should not be empty').to.not.equal('');
    expect(tcModel).equals(decoded);

  });

  it('TCModel->Core TC String->TCModel and should be equal', async (): Promise<void> => {

    const tcModel: TCModel = getTCModelWithGVL();
    const decodedModel: TCModel = new TCModel();
    let encoded = '';

    await tcModel.gvl.readyPromise;

    encoded = SegmentEncoder.encode(tcModel, Segment.CORE);
    SegmentEncoder.decode(encoded, decodedModel, Segment.CORE);

    sameDataDiffRef(tcModel, decodedModel, 'TCModel', ['bitLength']);

  });

  it('should encode a OOB Vendors Allowed Segment properly into a string', async (): Promise<void> => {

    const tcModel: TCModel = getTCModelWithGVL();
    let encoded = '';

    const encodeIt = (): void => {

      encoded = SegmentEncoder.encode(tcModel, Segment.VENDORS_ALLOWED);

    };

    await tcModel.gvl.readyPromise;

    expect(encodeIt, 'encode should not throw an error').not.to.throw();

    expect(encoded, 'shold not be empty').to.not.equal('');
    const decodedModel = SegmentEncoder.decode(encoded, new TCModel, Segment.VENDORS_ALLOWED);

    tcModel.vendorsAllowed.forEach((value: boolean, vendorId: number): void => {

      expect(decodedModel.vendorsAllowed.has(vendorId), `vendorsAllowed.has(${vendorId})`).to.equal(value);

    });

  });

  it('TCModel->OOBAllowed segment->TCModel and should be equal', async (): Promise<void> => {

    const tcModel: TCModel = new TCModel(gvl);
    const decodedModel: TCModel = new TCModel();
    let encoded = '';

    tcModel.cmpId = makeRandomInt(2, 200);
    tcModel.cmpVersion = makeRandomInt(1, 5);

    tcModel.setAll();

    const strToInt: (str: string) => number = (str: string): number => parseInt(str, 10);
    const allowedVendors: number[] = Object.keys(tcModel.gvl.getVendorsWithConsentPurpose(1)).map(strToInt);

    tcModel.vendorsAllowed.set(allowedVendors);

    const encodeIt = (): void => {

      encoded = SegmentEncoder.encode(tcModel, Segment.VENDORS_ALLOWED);

    };

    const decodeIt = (): void => {

      SegmentEncoder.decode(encoded, decodedModel, Segment.VENDORS_ALLOWED);

    };

    expect(tcModel.gvl).to.equal(gvl);
    await tcModel.gvl.readyPromise;

    expect(encodeIt).not.to.throw();
    expect(decodeIt).not.to.throw();

    expect(decodedModel.vendorsAllowed.size).to.equal(tcModel.vendorsAllowed.size);

  });

  const testCustomPurposes = (msg: string, customPurposes?: IntMap<Purpose>): void => {

    it(`TCModel->PublisherTC segment->TCModel and should be equal with ${msg}`, async (): Promise<void> => {

      const tcModel: TCModel = getTCModelWithGVL();
      const decodedModel: TCModel = new TCModel();
      let numCustomPurposes = 0;
      let encoded = '';

      tcModel.cmpId = makeRandomInt(2, 200);
      tcModel.cmpVersion = makeRandomInt(1, 5);

      if (customPurposes !== undefined && Object.keys(customPurposes).length > 0) {

        tcModel.customPurposes = customPurposes;
        const pruposeIds: string[] = Object.keys(customPurposes)
          .sort((a: string, b: string): number => +a - +b);

        numCustomPurposes = parseInt(pruposeIds.pop(), 10);

      }

      expect(tcModel.numCustomPurposes, 'tcModel.numCustomPurposes').to.equal(numCustomPurposes);

      const encodeIt = (): void => {

        encoded = SegmentEncoder.encode(tcModel, Segment.PUBLISHER_TC);

      };

      const decodeIt = (): void => {

        SegmentEncoder.decode(encoded, decodedModel, Segment.PUBLISHER_TC);

      };

      await tcModel.gvl.readyPromise;

      expect(encodeIt, 'encode it').not.to.throw();
      expect(decodeIt, 'decode it').not.to.throw();

      expect(decodedModel.publisherCustomConsents.size, 'publisherCustomConsents.size').to.equal(tcModel.publisherCustomConsents.size);
      expect(decodedModel.publisherCustomLegitimateInterests.size, 'publisherCustomLegitimateInterests.size').to.equal(tcModel.publisherCustomLegitimateInterests.size);
      expect(decodedModel.numCustomPurposes, 'numCustomPurposes').to.equal(tcModel.numCustomPurposes);

    });

  };

  testCustomPurposes('no custom purposes (never set)');
  testCustomPurposes('no custom purposes (empty object)', {});
  testCustomPurposes('1 custom purpose', {
    '1': {
      id: 1,
      name: makeRandomString(10),
      description: makeRandomString(10),
      descriptionLegal: makeRandomString(10),
    },
  });
  testCustomPurposes('2 custom purpose', {
    '1': {
      id: 1,
      name: makeRandomString(10),
      description: makeRandomString(10),
      descriptionLegal: makeRandomString(10),
    },
    '2': {
      id: 2,
      name: makeRandomString(10),
      description: makeRandomString(10),
      descriptionLegal: makeRandomString(10),
    },
  });
  testCustomPurposes('3 custom purpose, but with id gaps', {
    '1': {
      id: 1,
      name: makeRandomString(10),
      description: makeRandomString(10),
      descriptionLegal: makeRandomString(10),
    },
    '5': {
      id: 5,
      name: makeRandomString(10),
      description: makeRandomString(10),
      descriptionLegal: makeRandomString(10),
    },
    '9': {
      id: 9,
      name: makeRandomString(10),
      description: makeRandomString(10),
      descriptionLegal: makeRandomString(10),
    },
  });

});
