import {TCModel, TCString, PurposeRestriction, PurposeRestrictionVector, Vector, IdBoolTuple} from '@iabtcf/core';

import {CmpApiModel} from '../CmpApiModel';
import {BooleanVector, Restrictions, Booleany} from '../types';
import {Response} from './Response';
import {EventStatus, CmpStatus} from '../status';

export class TCData extends Response {

  public tcString: string;
  public eventStatus: EventStatus;
  public cmpStatus: CmpStatus;
  public isServiceSpecific: Booleany;
  public useNonStandardStacks: Booleany;
  public publisherCC: string;
  public purposeOneTreatment: Booleany;

  public outOfBand: {

    allowedVendors: BooleanVector | string;
    disclosedVendors: BooleanVector | string;

  };
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
      allowedVendors: this.createVectorField(tcModel.vendorsAllowed, vendorIds),
      disclosedVendors: this.createVectorField(tcModel.vendorsDisclosed, vendorIds),
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
      restrictions: this.createRestrictions(tcModel.publisherRestrictions),
    };

  }

  /**
   * Creates a restrictions object given a PurposeRestrictionVector
   * @param {PurposeRestrictionVector} purpRestrictions
   * @return {Restrictions}
   */
  protected createRestrictions(purpRestrictions: PurposeRestrictionVector): Restrictions {

    const retr = {};

    if (purpRestrictions.numRestrictions > 0) {

      const max = purpRestrictions.getMaxVendorId();

      for (let vendorId = 1; vendorId <= max; vendorId++) {

        const strVendorId = vendorId.toString();
        // vendors restrictions
        purpRestrictions.getRestriction(vendorId).forEach((pRestrict: PurposeRestriction): void => {

          const strPurpId = pRestrict.purposeId.toString();

          if (!retr[strPurpId]) {

            retr[strPurpId] = {};

          }

          retr[strPurpId][strVendorId] = pRestrict.restrictionType;

        });

      }

    }

    return retr;

  };

  /**
   * Creates a string bit field with a value for each id where each value is
   * '1' if its id is in the passed in vector Can be overwritten to return a
   * string
   * @param {Vector }vector
   * @param {number[]} ids filter
   * @return {BooleanVector | string}
   */
  protected createVectorField(vector: Vector, ids?: number[]): BooleanVector | string {

    if (ids) {

      return ids.reduce<BooleanVector>((booleanVector, obj): BooleanVector => {

        booleanVector[obj + ''] = vector.has(+obj);
        return booleanVector;

      }, {});

    }

    return [...vector].reduce<BooleanVector>((booleanVector, keys: IdBoolTuple): BooleanVector => {

      booleanVector[keys[0].toString(10)] = keys[1];
      return booleanVector;

    }, {});

  }

}
