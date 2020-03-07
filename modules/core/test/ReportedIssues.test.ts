import {expect} from 'chai';
import {GVL, TCString, TCModel} from '../src';
import {GVLFactory} from '@iabtcf/testing';

describe('Reported Issues on Github', (): void => {

  it('91 TCString.encode use 0 as vendorListVersion instead of gvl', (done: () => void): void => {

    const gvl = GVLFactory.getLatest();
    gvl.readyPromise.then((): void => {

      const tcModel = new TCModel(gvl as unknown as GVL);
      tcModel.cmpId = 123;
      tcModel.cmpVersion = 1;
      tcModel.consentScreen = 3;
      const encodedTCString = TCString.encode(tcModel);

      const decodeIt = (): void => {

        TCString.decode(encodedTCString);// Throw error

      };

      expect(decodeIt, 'decoding it').not.to.throw;
      done();

    });

  });

});
