import {expect} from 'chai';
import {CoreFieldSequence} from '../../src/encoder/sequence';
import {CoreTCEncoder} from '../../src/encoder/segment';
import {
  Vector,
  PurposeRestrictionVector,
} from '../../src/model/';

import {

  TCModel,
  GVL,

} from '../../src';

export function run(): void {

  describe('CoreTCEncoder', (): void => {

    // eslint-disable-next-line
    const vendorlistJson = require('../../../../dev/vendor-list.json');
    const gvl: GVL = new GVL(vendorlistJson);

    it('should encode into a string', (done: () => void): void => {

      const tcModel: TCModel = new TCModel(gvl);
      let encoded = '';

      tcModel.cmpId = 23;
      tcModel.cmpVersion = 1;

      // full consent!
      tcModel.setAll();

      const encodeIt = (): void => {

        encoded = CoreTCEncoder.encode(tcModel);

      };

      expect(tcModel.gvl).to.equal(gvl);
      tcModel.gvl.readyPromise.then((): void => {

        expect(encodeIt, 'encode should not throw an error').not.to.throw();
        expect(encoded, 'shold not be empty').to.not.equal('');

        done();

      });

    });

    it('TCModel->String->TCModel and should be equal', (done: () => void): void => {

      const tcModel: TCModel = new TCModel(gvl);
      const decodedModel: TCModel = new TCModel();
      let encoded = '';

      tcModel.cmpId = 23;
      tcModel.cmpVersion = 1;

      // full consent!
      tcModel.setAll();

      const encodeIt = (): void => {

        encoded = CoreTCEncoder.encode(tcModel);

      };

      const decodeIt = (): TCModel => {

        return CoreTCEncoder.decode(encoded, decodedModel);

      };

      expect(tcModel.gvl).to.equal(gvl);
      tcModel.gvl.readyPromise.then((): void => {

        const coreFieldSequence: CoreFieldSequence = new CoreFieldSequence();


        expect(encodeIt).not.to.throw();
        expect(decodeIt).not.to.throw();

        encodeIt();

        coreFieldSequence['2'].forEach((key: string): void => {

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

  });

}
