import {expect} from 'chai';
import {PurposeRestriction} from '../../src/model/PurposeRestriction';
import {PurposeRestrictionTypeEnum} from '../../src/model/enum/PurposeRestrictionTypeEnum';
import {PurposeRestrictionVector} from '../../src/model/PurposeRestrictionVector';

export function run(): void {

  describe('PurposeRestrictionVector', (): void => {

    const makePurposesAvailable = (purposes: number[]): void => {

      purposes.forEach((purposeId: number): void => {

        PurposeRestriction.availablePurposeIds.add(purposeId);

      });

    };

    afterEach((): void => {

      PurposeRestriction.availablePurposeIds = new Set<number>();

    });

    it('should store vendors by purpose restriction in order', (): void => {

      makePurposesAvailable([1, 2, 3]);
      const purposeId = 2;
      const vendors: number[] = [1, 44, 3, 5, 99, 22, 57, 2, 14, 28, 29, 33];
      const purposeRestriction: PurposeRestriction
        = new PurposeRestriction(purposeId, PurposeRestrictionTypeEnum.NOT_ALLOWED);

      const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

      for (let i = 0; i < vendors.length; i++) {

        prVector.add(vendors[i], purposeRestriction);

      }

      const expected: number[] = vendors.sort((a: number, b: number): number => {

        return a - b;

      });
      const actual: number[] = prVector.getVendors(purposeRestriction);

      expect(actual).to.deep.equal(expected);

    });

  });

}
