import {expect} from 'chai';
export const smellsLikeGVL = (possibleGVL: object): void => {

  expect(possibleGVL).to.include([
    'gvlSpecificationVersion',
    'vendorListVersion',
    'tcfPolicyVersion',
    'lastUpdated',
    'purposes',
    'specialPurposes',
    'features',
    'specialFeatures',
    'vendors',
    'stacks',
  ]);

}
