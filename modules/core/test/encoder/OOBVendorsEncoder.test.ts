import {

  expect,

} from 'chai';

import {

  OOBVendorsEncoder,

} from '../../src/encoder/segment';

import {

  Fields,

} from '../../src/model';

import {

  TCModel,
  GVL,

} from '../../src';

export function run(): void {

  describe('OOBVendorsEncoder', (): void => {

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

        encoded = OOBVendorsEncoder.encode(tcModel, Fields.vendorsAllowed);

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

      tcModel.setAll();

      const strToInt: (str: string) => number = (str: string): number => parseInt(str, 10);
      const allowedVendors: number[] = Object.keys(tcModel.gvl.getVendorsWithConsentPurpose(1)).map(strToInt);

      tcModel.vendorsAllowed.set(allowedVendors);

      const encodeIt = (): void => {

        encoded = OOBVendorsEncoder.encode(tcModel, Fields.vendorsAllowed);

      };

      const decodeIt = (): void => {

        OOBVendorsEncoder.decode(encoded, decodedModel);

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

}
