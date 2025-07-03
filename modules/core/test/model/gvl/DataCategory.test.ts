import {expect} from 'chai';
import {DataCategory} from '../../../src/model/gvl/DataCategory';

import vendorlistJson from '../../../../testing/lib/mjs/vendorlist/v2.2/vendor-list.json' assert { type: 'json' };

export function run(): void {

  describe('DataCategory', (): void => {

    it('must be present in GVL 2.2', (): void => {

      const {dataCategories, gvlSpecificationVersion} = vendorlistJson;

      expect(gvlSpecificationVersion).to.equal(3);

      Object.keys(dataCategories).forEach((key: string): void => {

        const dataCategory = dataCategories[key] as DataCategory;

        expect(dataCategory.id).to.equal(key);

        expect(dataCategory.name).to.be.a('string');

        expect(dataCategory.description).to.be.a('string');

      });

    });

  });

}
