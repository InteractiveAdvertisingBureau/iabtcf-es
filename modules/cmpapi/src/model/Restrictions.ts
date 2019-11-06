import {TCModel} from '@iabtcf/core';

export interface Restrictions {

  [purposeId: string]: {
    [vendorId: string]: 0 | 1 | 2;
  };

}

/**
 * Creates a restrictions object given a TCModel
 * @param {TCModel} tcModel
 * @return {Restrictions}
 */
export const createRestrictions = (tcModel: TCModel): Restrictions => {

  return tcModel.publisherRestrictions.getAllRestrictions().reduce<Restrictions>((obj, pr): Restrictions => {

    const purposeId = pr.purposeId.toString(10);
    obj[purposeId] = {};

    tcModel.publisherRestrictions.getVendors(pr).forEach((vendorId: number) => {

      obj[purposeId][vendorId.toString(10)] = pr.restrictionType;

    });

    return obj;

  }, {});

};
