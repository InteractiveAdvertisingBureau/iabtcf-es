import {TCModel, PurposeRestriction, PurposeRestrictionVector, Vector, IdBoolTuple} from '@iabtechlabtcf/core';

import {CmpApiModel} from '../CmpApiModel.js';
import {BooleanVector} from './BooleanVector.js';
import {Restrictions} from './Restrictions.js';
import {Booleany} from './Booleany.js';
import {Response} from './Response.js';
import {EventStatus, CmpStatus} from '../status/index.js';

export class TCData extends Response {

  public tcString: string;
  public listenerId: number;
  public eventStatus: EventStatus;
  public cmpStatus: CmpStatus;
  public isServiceSpecific: Booleany;
  public useNonStandardTexts: Booleany;
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
    disclosedVendors: BooleanVector | string;

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
   * @param {number} listenerId - if there is a listenerId to add
   */
  public constructor(vendorIds?: number[], listenerId?: number) {

    super();

    this.eventStatus = CmpApiModel.eventStatus;
    this.cmpStatus = CmpApiModel.cmpStatus;
    this.listenerId = listenerId;

    if (CmpApiModel.gdprApplies) {

      const tcModel = CmpApiModel.tcModel as TCModel;

      this.tcString = CmpApiModel.tcString;
      this.isServiceSpecific = tcModel.isServiceSpecific;
      this.useNonStandardTexts = tcModel.useNonStandardTexts;
      this.purposeOneTreatment = tcModel.purposeOneTreatment;
      this.publisherCC = tcModel.publisherCountryCode;

      if (this.isServiceSpecific === false) {

        this.outOfBand = {

          allowedVendors: this.createVectorField(tcModel.vendorsAllowed, vendorIds),
          disclosedVendors: this.createVectorField(tcModel.vendorsDisclosed, vendorIds),

        };

      }

      this.purpose = {

        consents: this.createVectorField(tcModel.purposeConsents),
        legitimateInterests: this.createVectorField(tcModel.purposeLegitimateInterests),

      };

      this.vendor = {

        consents: this.createVectorField(tcModel.vendorConsents, vendorIds),
        legitimateInterests: this.createVectorField(tcModel.vendorLegitimateInterests, vendorIds),
        disclosedVendors: this.createVectorField(tcModel.vendorsDisclosed, vendorIds),

      };

      this.specialFeatureOptins = this.createVectorField(tcModel.specialFeatureOptins);

      this.publisher = {

        consents: this.createVectorField(tcModel.publisherConsents),
        legitimateInterests: this.createVectorField(tcModel.publisherLegitimateInterests),
        customPurpose: {

          consents: this.createVectorField(tcModel.publisherCustomConsents),
          legitimateInterests: this.createVectorField(tcModel.publisherCustomLegitimateInterests),

        },
        restrictions: this.createRestrictions(tcModel.publisherRestrictions),

      };

    }

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
        purpRestrictions.getRestrictions(vendorId).forEach((pRestrict: PurposeRestriction): void => {

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
   * @param {Vector} vector
   * @param {number[]} ids filter
   * @return {BooleanVector | string}
   */
  protected createVectorField(vector: Vector, ids?: number[]): BooleanVector | string {

    if (ids) {

      return ids.reduce<BooleanVector>((booleanVector, obj): BooleanVector => {

        booleanVector[String(obj)] = vector.has(Number(obj));
        return booleanVector;

      }, {});

    }

    return [...vector].reduce<BooleanVector>((booleanVector, keys: IdBoolTuple): BooleanVector => {

      booleanVector[keys[0].toString(10)] = keys[1];
      return booleanVector;

    }, {});

  }

}
