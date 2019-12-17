import {expect} from 'chai';
import {
  FieldSequence,
  SegmentEncoder,
} from '../../src/encoder';
import {
  TCModel,
  GVL,
  Vector,
  Segments,
  PurposeRestrictionVector,
} from '../../src';

export function run(): void {

  // eslint-disable-next-line
  const vendorlistJson = require('../../../../vendorlist/vendor-list.json');
  const gvl: GVL = new GVL(vendorlistJson);

  it('should encode a core segment', (done: () => void): void => {

    const tcModel: TCModel = new TCModel(gvl);
    let encoded = '';

    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();

    const encodeIt = (): void => {

      encoded = SegmentEncoder.encode(tcModel, Segments.core);

    };

    expect(tcModel.gvl).to.equal(gvl);
    tcModel.gvl.readyPromise.then((): void => {

      expect(encodeIt, 'encode should not throw an error').not.to.throw();
      expect(encoded, 'shold not be empty').to.not.equal('');

      done();

    });

  });

  it('TCModel->Core TC String->TCModel and should be equal', (done: () => void): void => {

    const tcModel: TCModel = new TCModel(gvl);
    const decodedModel: TCModel = new TCModel();
    let encoded = '';

    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();

    const encodeIt = (): void => {

      encoded = SegmentEncoder.encode(tcModel, Segments.core);

    };

    const decodeIt = (): TCModel => {

      return SegmentEncoder.decode(encoded, decodedModel, Segments.core);

    };

    expect(tcModel.gvl).to.equal(gvl);
    tcModel.gvl.readyPromise.then((): void => {

      const fieldSequence: FieldSequence = new FieldSequence();
      const sequence = fieldSequence['2'][Segments.core];

      expect(encodeIt).not.to.throw();
      expect(decodeIt).not.to.throw();

      encodeIt();

      sequence.forEach((key: string): void => {

        // the same in every way :-)
        // except dates
        switch (key) {

          case 'lastUpdated':
          case 'created':

            // should round of the last two digits
            expect(decodedModel[key].getTime(), `${key} should be equal`)
              .to.equal(Math.round(tcModel[key].getTime()/100)*100);
            break;

          case 'specialFeatureOptIns':
          case 'purposeConsents':
          case 'publisherConsents':
          case 'purposeLegitimateInterest':
          case 'publisherLegitimateInterest':
          case 'publisherCustomConsents':
          case 'publisherCustomLegitimateInterest':
          case 'vendorConsents':
          case 'vendorLegitimateInterest':
          case 'vendorsDisclosed':
          case 'vendorsAllowed':

            const oldVector: Vector = tcModel[key];
            const newVector: Vector = decodedModel[key];

            expect(newVector.maxId).to.equal(oldVector.maxId);
            expect(newVector.size).to.equal(oldVector.size);
            oldVector.forEach((value: boolean, id: number): void => {

              expect(newVector.has(id)).to.equal(value);

            });
            break;
          case 'publisherRestrictions':
            const oldPRVector: PurposeRestrictionVector = tcModel[key];
            const newPRVector: PurposeRestrictionVector = decodedModel[key];

            expect(newPRVector.isEmpty()).to.equal(oldPRVector.isEmpty());
            expect(newPRVector.numRestrictions).to.equal(oldPRVector.numRestrictions);
            break;
          default:
            expect(decodedModel[key], `${key} should be equal`).to.equal(tcModel[key]);

        }

      });

      done();

    });

  });

  it('should encode a OOB Vendors Allowed Segment properly into a string', (done: () => void): void => {

    const tcModel: TCModel = new TCModel(gvl);
    let encoded = '';

    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();

    const encodeIt = (): void => {

      encoded = SegmentEncoder.encode(tcModel, Segments.vendorsAllowed);

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

      encoded = SegmentEncoder.encode(tcModel, Segments.vendorsAllowed);

    };

    const decodeIt = (): void => {

      SegmentEncoder.decode(encoded, decodedModel, Segments.vendorsAllowed);

    };

    expect(tcModel.gvl).to.equal(gvl);
    tcModel.gvl.readyPromise.then((): void => {

      expect(encodeIt).not.to.throw();
      expect(decodeIt).not.to.throw();

      expect(decodedModel.vendorsAllowed.size).to.equal(tcModel.vendorsAllowed.size);
      done();

    });

  });

}
