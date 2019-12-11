import {GVL, PurposeRestriction, RestrictionType, TCModel} from '@iabtcf/core';

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

  tcModel.publisherConsents.set(2);
  tcModel.publisherConsents.set(5);

  tcModel.publisherCustomConsents.set(2);
  tcModel.publisherCustomConsents.set(3);

  tcModel.publisherCustomLegitimateInterest.set(3);

  tcModel.publisherRestrictions.add(98, new PurposeRestriction(7, RestrictionType.NOT_ALLOWED));
  tcModel.publisherRestrictions.add(224, new PurposeRestriction(7, RestrictionType.REQUIRE_LI));

  tcModel.publisherRestrictions.add(98, new PurposeRestriction(8, RestrictionType.REQUIRE_LI));
  tcModel.publisherRestrictions.add(224, new PurposeRestriction(8, RestrictionType.REQUIRE_LI));

  return tcModel;

};
