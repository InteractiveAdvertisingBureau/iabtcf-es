import {TCModel, TCString, Vector} from '@iabtcf/core';
import {EventStatus} from '../../status';
import {BoolInt} from '../../types';
import {BooleanVector, createBooleanVector} from '../BooleanVector';
import {Restrictions} from '../Restrictions';
import {Return} from './Return';

/**
 * Class represents consent data
 */
export class TCData extends Return {

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
   * @param {number[]} _vendorIds
   */
  public constructor(tcModel: TCModel, eventStatus: EventStatus, _vendorIds?: number[]) {

    super();

    const tcStringEncoder: TCString = new TCString();
    const vendorIds: string[] = _vendorIds ? _vendorIds.map((id) => id.toString(10)) : Object.keys(tcModel.gvl.vendors);
    const purposeIds: string[] = Object.keys(tcModel.gvl.purposes);
    const specialFeatureIds: string[] = Object.keys(tcModel.gvl.specialFeatures);

    this.tcString = tcStringEncoder.encode(tcModel);
    this.eventStatus = eventStatus;
    this.isServiceSpecific = tcModel.isServiceSpecific;
    this.useNonStandardStacks = tcModel.useNonStandardStacks;
    this.purposeOneTreatment = tcModel.purposeOneTreatment;
    this.publisherCC = tcModel.publisherCountryCode;

    this.outOfBand = {
      allowedVendors: createBooleanVector(vendorIds, tcModel.vendorsAllowed),
      discloseVendors: createBooleanVector(vendorIds, tcModel.vendorsDisclosed),
    };

    this.purpose = {

      consents: this.createVectorField(purposeIds, tcModel.purposeConsents),
      legitimateInterests: this.createVectorField(purposeIds, tcModel.purposeLegitimateInterest),

    };

    this.vendor = {
      consents: this.createVectorField(vendorIds, tcModel.vendorConsents),
      legitimateInterests: this.createVectorField(vendorIds, tcModel.vendorLegitimateInterest),
    };

    this.specialFeatureOptins = this.createVectorField(specialFeatureIds, tcModel.specialFeatureOptIns);

    this.publisher = {

      consents: this.createVectorField(purposeIds, tcModel.publisherConsents),
      legitimateInterests: this.createVectorField(purposeIds, tcModel.publisherLegitimateInterest),
      customPurpose: {

        consents: this.createVectorField(purposeIds, tcModel.publisherCustomConsents),
        legitimateInterests: this.createVectorField(purposeIds, tcModel.publisherCustomLegitimateInterest),

      },
      restrictions: this.createRestrictions(tcModel),
    };

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

      tcModel.publisherRestrictions.getVendors(pr).forEach((vendorId: number) => {

        obj[purposeId][vendorId.toString(10)] = pr.restrictionType;

      });

      return obj;

    }, {});

  };

  /**
   * Creates a string bit field with a value for each id where each value is '1' if its id is in the passed in vector
   * Can be overwritten to return a string
   * @param {string[]} ids
   * @param {Vector }vector
   * @return {BooleanVector | string}
   */
  protected createVectorField(ids: string[], vector: Vector): BooleanVector | string {

    return createBooleanVector(ids, vector);

  }

}