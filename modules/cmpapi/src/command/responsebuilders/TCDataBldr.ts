import {TCModel, TCString, Vector} from '@iabtcf/core';
import {BooleanVector, createBooleanVector, Restrictions, TCData} from '../../model';
import {EventStatus} from '../../status';
import {BoolInt} from '../../types';
import {ResponseBuilder} from './ResponseBuilder';

/**
 * TCData response builder
 */
export class TCDataBldr extends ResponseBuilder implements TCData {

  public tcString: string;
  public eventStatus: string;
  public isServiceSpecific: boolean | BoolInt;
  public useNonStandardStacks: boolean | BoolInt;
  public publisherCC: string;
  public purposeOneTreatment: boolean | BoolInt;

  // TcDataOnly
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
   * @param {TCModel} tcModel
   * @param {EventStatus} eventStatus is optional
   * @param {number[]} _vendorIds - if not undefined, will be used to filter vendor ids
   */
  public constructor(tcModel: TCModel, eventStatus: EventStatus, _vendorIds?: number[]) {

    super();

    // const vendorIds: string[] = this.getVendorIds(tcModel, _vendorIds);
    // const purposeIds: string[] = Object.keys(tcModel.gvl.purposes);
    // const specialFeatureIds: string[] = Object.keys(tcModel.gvl.specialFeatures);

    this.tcString = TCString.encode(tcModel);
    this.eventStatus = eventStatus;
    this.isServiceSpecific = tcModel.isServiceSpecific;
    this.useNonStandardStacks = tcModel.useNonStandardStacks;
    this.purposeOneTreatment = tcModel.purposeOneTreatment;
    this.publisherCC = tcModel.publisherCountryCode;

    this.outOfBand = {
      allowedVendors: createBooleanVector(tcModel.vendorsAllowed),
      discloseVendors: createBooleanVector(tcModel.vendorsDisclosed),
    };

    this.purpose = {

      consents: this.createVectorField(tcModel.purposeConsents),
      legitimateInterests: this.createVectorField(tcModel.purposeLegitimateInterest),

    };

    this.vendor = {
      consents: this.createVectorField(tcModel.vendorConsents),
      legitimateInterests: this.createVectorField(tcModel.vendorLegitimateInterest),
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

      const purposeId = pr.purposeId.toString(10);
      obj[purposeId] = {};

      tcModel.publisherRestrictions.getVendors(pr).forEach((vendorId: number): void => {

        obj[purposeId][vendorId.toString(10)] = pr.restrictionType;

      });

      return obj;

    }, {});

  };

  /**
   * Creates a string bit field with a value for each id where each value is
   * '1' if its id is in the passed in vector Can be overwritten to return a
   * string
   * @param {Vector }vector
   * @return {BooleanVector | string}
   */
  protected createVectorField(vector: Vector): BooleanVector | string {

    return createBooleanVector(vector);

  }

}
