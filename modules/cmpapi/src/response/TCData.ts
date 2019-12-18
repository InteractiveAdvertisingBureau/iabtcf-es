import {TCModel, TCString, Vector, IdBoolTuple} from '@iabtcf/core';
import {CmpApiModel} from '../CmpApiModel';
import {BooleanVector, Restrictions} from '../types';
import {Response} from './Response';

export class TCData extends Response {

  public tcString: string;
  public eventStatus: string;
  public isServiceSpecific: boolean | 0 | 1;
  public useNonStandardStacks: boolean | 0 | 1;
  public publisherCC: string;
  public purposeOneTreatment: boolean | 0 | 1;

  public outOfBand: {

    allowedVendors: BooleanVector;
    discloseVendors: BooleanVector;

  } | undefined;
  public purpose: {

    consents: BooleanVector | string;
    legitimateInterests: BooleanVector | string;

  };
  public vendor: {

    consents: BooleanVector | string;
    legitimateInterests: BooleanVector | string;

  };
  public specialFeatureOptins: BooleanVector | string;
  public publisher: {

    consents: BooleanVector | string;
    legitimateInterests: BooleanVector | string;
    customPurpose: {

      consents: BooleanVector | string;
      legitimateInterests: BooleanVector | string;

    };
    restrictions: Restrictions;
  };

  /**
   * Constructor to create a TCData object from a TCModel
   * @param {number[]} vendorIds - if not undefined, will be used to filter vendor ids
   */
  public constructor(vendorIds?: number[]) {

    super();

    const tcModel = CmpApiModel.tcModel as TCModel;

    this.tcString = TCString.encode(tcModel);
    this.eventStatus = CmpApiModel.eventStatus;
    this.isServiceSpecific = tcModel.isServiceSpecific;
    this.useNonStandardStacks = tcModel.useNonStandardStacks;
    this.purposeOneTreatment = tcModel.purposeOneTreatment;
    this.publisherCC = tcModel.publisherCountryCode;

    this.outOfBand = {
      allowedVendors: this.createBooleanVector(tcModel.vendorsAllowed, vendorIds),
      discloseVendors: this.createBooleanVector(tcModel.vendorsDisclosed, vendorIds),
    };

    this.purpose = {

      consents: this.createVectorField(tcModel.purposeConsents),
      legitimateInterests: this.createVectorField(tcModel.purposeLegitimateInterest),

    };

    this.vendor = {
      consents: this.createVectorField(tcModel.vendorConsents, vendorIds),
      legitimateInterests: this.createVectorField(tcModel.vendorLegitimateInterest, vendorIds),
    };

    this.specialFeatureOptins = this.createVectorField(tcModel.specialFeatureOptIns);

    this.publisher = {

      consents: this.createVectorField(tcModel.publisherConsents),
      legitimateInterests: this.createVectorField(tcModel.publisherLegitimateInterest),
      customPurpose: {

        consents: this.createVectorField(tcModel.publisherCustomConsents),
        legitimateInterests: this.createVectorField(tcModel.publisherCustomLegitimateInterest),

      },
      restrictions: this.createRestrictions(tcModel),
    };

  }

  /**
   * Returns a string[] of vendor ids to be used when creating the TCData instance.
   * If vendorIds param is not undefined, its converted to a string[] and returned, if not the ids from the gvl is used.
   * @param {TCModel} tcModel
   * @param {number[]} vendorIds
   * @return {string[]}
   */
  private getVendorIds(tcModel: TCModel, vendorIds?: number[], ): string[] {

    return vendorIds ? vendorIds.map((id): string => id.toString(10)) : Object.keys(tcModel.gvl.vendors);

  }

  /**
   * Creates a restrictions object given a TCModel
   * @param {TCModel} tcModel
   * @return {Restrictions}
   */
  protected createRestrictions(tcModel: TCModel): Restrictions {

    return tcModel.publisherRestrictions.getAllRestrictions().reduce<Restrictions>((obj, pr): Restrictions => {

      const purposeId = ''+pr.purposeId;
      const restrictionType = pr.restrictionType;

      obj[purposeId] = obj[purposeId] || {};

      return tcModel.publisherRestrictions.getVendors(pr).reduce(
        (restrictions: Restrictions, vendorId: number): Restrictions => {

          const vid = ''+vendorId;

          obj[purposeId][vid] = obj[purposeId][vid] || {};

          obj[purposeId][vid] = restrictionType;
          return obj;

        }, obj);

    }, {});

  };

  protected createVectorField(vector: Vector, ids?: number[]): BooleanVector | string {

    return this.createBooleanVector(vector, ids);

  }

  /**
   * Creates a string bit field with a value for each id where each value is
   * '1' if its id is in the passed in vector Can be overwritten to return a
   * string
   * @param {Vector }vector
   * @param {number[]} ids filter
   * @return {BooleanVector | string}
   */
  private createBooleanVector(vector: Vector, ids?: number[]): BooleanVector {

    if (ids) {

      return ids.reduce<BooleanVector>((booleanVector, obj): BooleanVector => {

        booleanVector[obj] = vector.has(+obj);
        return booleanVector;

      }, {});

    }

    return [...vector].reduce<BooleanVector>((booleanVector, keys: IdBoolTuple): BooleanVector => {

      booleanVector[keys[0].toString(10)] = keys[1];
      return booleanVector;

    }, {});

  }

}
