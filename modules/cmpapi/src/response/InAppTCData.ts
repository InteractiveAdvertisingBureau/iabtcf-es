import {IdBoolTuple, PurposeRestriction, RestrictionType, TCModel, Vector} from '@iabtcf/core';
import {BooleanVector, Restrictions} from '../types';
import {TCData} from './TCData';

interface VendorIdRestrictionType {
  vendorId: number;
  restrictionType: RestrictionType;
}

/**
 * InAppTCData response builder
 */
export class InAppTCData extends TCData {

  public outOfBand: undefined;

  /**
   * Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector
   * @override
   * @param {Vector }vector
   * @return {BooleanVector | string}
   */
  protected createVectorField(vector: Vector): BooleanVector | string {

    return this.createBitFieldString(vector);

  }

  /**
   * Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector
   * @param {Vector }vector
   * @return {string}
   */
  protected createBitFieldString(vector: Vector): string {

    return [...vector].reduce<string>((str: string, tpl: IdBoolTuple): string => {

      str += tpl[1] ? '1' : '0';
      return str;

    }, '');

  }

  /**
   * Creates a restrictions object given a TCModel
   * @override
   * @param {TCModel} tcModel
   * @return {Restrictions}
   */
  protected createRestrictions(tcModel: TCModel): Restrictions {

    const tempObj = tcModel.publisherRestrictions.getAllRestrictions().reduce(
      (obj, pr: PurposeRestriction): Restrictions => {

        const purposeId = '' + pr.purposeId;
        const restrictionType = pr.restrictionType;

        return tcModel.publisherRestrictions.getVendors(pr).reduce((obj, vendorId: number) => {

          obj[purposeId] = obj[purposeId] || [] as VendorIdRestrictionType[];

          obj[purposeId].push({vendorId, restrictionType});
          return obj;

        }, obj);

      }, {});

    return Object.keys(tempObj).reduce<Restrictions>((restrictions: Restrictions, key: string) => {

      restrictions[key] = tempObj[key].
        sort((o1: VendorIdRestrictionType, o2: VendorIdRestrictionType) => o1.vendorId > o2.vendorId).
        reduce((str: string, keyVal: VendorIdRestrictionType, index) => {

          const paddingCount = index > 0 ? keyVal.vendorId - tempObj[key][index - 1].vendorId : keyVal.vendorId;

          for (let i = 1; i < paddingCount; i++) {

            str += RestrictionType.NO_RESTRICTION;

          }

          str += keyVal.restrictionType;
          return str;

        }, '');

      return restrictions;

    }, tempObj);

  };

}
