import {expect} from 'chai';
import {GVLFactory, TCModelFactory, sameDataDiffRef} from '@iabtcf/testing';
import {SegmentEncoder} from '../../src/encoder';
import {TCModel, GVL} from '../../src';
import {Segment} from '../../src/model';

const gvl: GVL = GVLFactory.getLatest() as unknown as GVL;

describe('encoder->SegmentEncoder', (): void => {

  it('should encode a core segment', async (): Promise<void> => {

    const tcModel: TCModel = TCModelFactory.withGVL() as unknown as TCModel;
    let encoded = '';

    const encodeIt = (): void => {

      encoded = SegmentEncoder.encode(tcModel, Segment.CORE);

    };

    await tcModel.gvl.readyPromise;

    expect(encodeIt, 'encode should not throw an error').not.to.throw();
    expect(encoded, 'shold not be empty').to.not.equal('');

  });

  it('TCModel->Core TC String->TCModel and should be equal', async (): Promise<void> => {

    const tcModel: TCModel = TCModelFactory.withGVL() as unknown as TCModel;
    const decodedModel: TCModel = new TCModel();
    let encoded = '';

    await tcModel.gvl.readyPromise;

    encoded = SegmentEncoder.encode(tcModel, Segment.CORE);
    SegmentEncoder.decode(encoded, decodedModel, Segment.CORE);

    sameDataDiffRef(tcModel, decodedModel, 'TCModel', ['bitLength']);

  });

  it('should encode a OOB Vendors Allowed Segment properly into a string', async (): Promise<void> => {

    const tcModel: TCModel = TCModelFactory.withGVL() as unknown as TCModel;
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

  it('TCModel->OOBAllowed segment->TCModel and should be equal', (done: () => void): void => {

    const tcModel: TCModel = new TCModel(gvl);
    const decodedModel: TCModel = new TCModel();
    let encoded = '';

    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

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
    tcModel.gvl.readyPromise.then((): void => {

      expect(encodeIt).not.to.throw();
      expect(decodeIt).not.to.throw();

      expect(decodedModel.vendorsAllowed.size).to.equal(tcModel.vendorsAllowed.size);
      done();

    });

  });

});
