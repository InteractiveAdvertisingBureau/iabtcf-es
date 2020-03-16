import {expect} from 'chai';
import {GVLFactory, TCModelFactory, sameDataDiffRef} from '@iabtcf/testing';
import {SegmentEncoder} from '../../src/encoder';
import {TCModel, GVL} from '../../src';
import {Segment} from '../../src/model';

const gvl: GVL = GVLFactory.getLatest() as unknown as GVL;

describe('encoder->SegmentEncoder', (): void => {

  it('should encode a core segment', (done: () => void): void => {

    const tcModel: TCModel = TCModelFactory.withGVL() as unknown as TCModel;
    let encoded = '';

    const encodeIt = (): void => {

      encoded = SegmentEncoder.encode(tcModel, '2', Segment.CORE);

    };

    tcModel.gvl.readyPromise.then((): void => {

      expect(encodeIt, 'encode should not throw an error').not.to.throw();
      expect(encoded, 'shold not be empty').to.not.equal('');

      done();

    });

  });

  it('TCModel->Core TC String->TCModel and should be equal', (done: () => void): void => {

    const tcModel: TCModel = TCModelFactory.withGVL() as unknown as TCModel;
    const decodedModel: TCModel = new TCModel();
    let encoded = '';

    encoded = SegmentEncoder.encode(tcModel, '2', Segment.CORE);
    SegmentEncoder.decode(encoded, decodedModel, '2', Segment.CORE);

    sameDataDiffRef(tcModel, decodedModel, 'TCModel', ['bitLength']);

    done();

  });

  it('should encode a OOB Vendors Allowed Segment properly into a string', (done: () => void): void => {

    const tcModel: TCModel = new TCModel(gvl);
    let encoded = '';

    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();

    const encodeIt = (): void => {

      encoded = SegmentEncoder.encode(tcModel, '2', Segment.VENDORS_ALLOWED);

    };

    expect(tcModel.gvl).to.equal(gvl);
    tcModel.gvl.readyPromise.then((): void => {

      expect(encodeIt, 'encode should not throw an error').not.to.throw();
      expect(encoded, 'shold not be empty').to.not.equal('');

      done();

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

      encoded = SegmentEncoder.encode(tcModel, '2', Segment.VENDORS_ALLOWED);

    };

    const decodeIt = (): void => {

      SegmentEncoder.decode(encoded, decodedModel, '2', Segment.VENDORS_ALLOWED);

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
