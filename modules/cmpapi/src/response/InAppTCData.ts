import {IdBoolTuple, PurposeRestriction, PurposeRestrictionVector, RestrictionType, Vector} from '@iabtcf/core';
import {Restrictions} from '../types';
import {TCData} from './TCData';

interface VendorIdRestrictionType {
  vendorId: number;
  restrictionType: RestrictionType;
}

/**
 * InAppTCData response builder
 */
export class InAppTCData extends TCData {

  public constructor(vendorIds?: number[]) {

    super(vendorIds);
    delete this.outOfBand;

  }

  /**
   * Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector
   * @override
   * @param {Vector} vector
   * @return {string}
   */
  protected createVectorField(vector: Vector): string {

    return [...vector].reduce<string>((str: string, tpl: IdBoolTuple): string => {

      str += tpl[1] ? '1' : '0';
      return str;

    }, '');

  }

  /**
   * Creates a restrictions object given a PurposeRestrictionVector
   * @override
   * @param {PurposeRestrictionVector} purpRestrictions
   * @return {Restrictions}
   */
  protected createRestrictions(purpRestrictions: PurposeRestrictionVector): Restrictions {

    const retr = {};

    if (purpRestrictions.numRestrictions > 0) {

      const max = purpRestrictions.getMaxVendorId();

      for (let vendorId = 1; vendorId <= max; vendorId++) {

        purpRestrictions.getAllRestrictions().forEach((pRestrict: PurposeRestriction): void => {

          const strPurpId = pRestrict.purposeId.toString();

          if (retr[strPurpId] === undefined) {

            retr[strPurpId] = '';

          }

          if (purpRestrictions.vendorHasRestriction(vendorId, pRestrict)) {

            retr[strPurpId] += pRestrict.restrictionType.toString();

          } else {

            retr[strPurpId] += '-';

          }

        });

      }

    }

    return retr;

  };

}
