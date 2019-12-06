import {GVL, TCModel} from '@iabtcf/core';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const vendorListJson = require('../../../dev/vendor-list.json');
export const gvl: GVL = new GVL(vendorListJson);

/**
 * Creates and returns a valid TCModel given a valid GVL
 * @param {GVL} gvl
 * @return {TCModel}
 */
export const createValidTCModel = (gvl: GVL): TCModel => {

  const tcModel = new TCModel(gvl);
  tcModel.cmpId = 2;
  tcModel.cmpVersion = 1;

  // full consent!
  tcModel.setAll();

  tcModel.purposeConsents.unset(2);
  tcModel.vendorConsents.unset(37);
  return tcModel;

};
