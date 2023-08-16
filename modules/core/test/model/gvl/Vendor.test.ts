import {expect} from 'chai';
import {Vendor} from '../../../src/model/gvl/Vendor';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vendorlistJson = require('@iabtechlabtcf/testing/lib/vendorlist/v2.2/vendor-list.json');

export function run(): void {

  describe('Vendor', (): void => {

    it('must contain new fields in GVL 2.2', (): void => {

      const {vendors, gvlSpecificationVersion} = vendorlistJson;

      expect(gvlSpecificationVersion).to.equal(3);

      Object.keys(vendors).forEach((key: string): void => {

        const vendor = vendors[key] as Vendor;

        expect(vendor.id).to.equal(key);

        const {dataRetention, urls, dataDeclaration} = vendor;

        expect(dataRetention).to.be.a('object');

        expect(urls).to.be.a('object');

        expect(dataDeclaration).to.be.a('object');

      });

    });

  });

}
