import {TCModel, TCString} from '@iabtcf/core';
import {BooleanVector, createBooleanVector} from './BooleanVector';
import {createRestrictions, Restrictions} from './Restrictions';
import {Return} from './Return';
import {EventStatus} from './status';

/**
 * Class represents consent data
 */
export class TCData extends Return {

  public tcString: string;
  public eventStatus: string;
  public isServiceSpecific: boolean;
  public useNonStandardStacks: boolean;
  public publisherCC: string;
  public purposeOneTreatment: boolean;
  public outOfBand: {

    allowedVendors: BooleanVector;
    discloseVendors: BooleanVector;

  };
  public purpose: {

    consents: BooleanVector;
    legitimateInterests: BooleanVector;

  };
  public vendor: {

    consents: BooleanVector;
    legitimateInterests: BooleanVector;

  };
  public specialFeatureOptins: BooleanVector;
  public publisher: {

    consents: BooleanVector;
    legitimateInterests: BooleanVector;
    customPurpose: {

      consents: BooleanVector;
      legitimateInterests: BooleanVector;

    };
    restrictions: Restrictions;
  };

  /**
   * Constructor to create a TCData object from a TCModel
   * @param {TCModel} tcModel
   * @param {EventStatus} eventStatus is optional
   */
  public constructor(tcModel: TCModel, eventStatus: EventStatus) {

    super();

    const tcStringEncoder: TCString = new TCString();
    const vendorIds = Object.keys(tcModel.gvl.vendors);
    const purposeIds = Object.keys(tcModel.gvl.purposes);
    const specialFeatureIds = Object.keys(tcModel.gvl.specialFeatures);

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

      consents: createBooleanVector(purposeIds, tcModel.purposeConsents),
      legitimateInterests: createBooleanVector(purposeIds, tcModel.purposeLegitimateInterest),

    };

    this.vendor = {
      consents: createBooleanVector(vendorIds, tcModel.vendorConsents),
      legitimateInterests: createBooleanVector(vendorIds, tcModel.vendorLegitimateInterest),
    };

    this.specialFeatureOptins = createBooleanVector(specialFeatureIds, tcModel.specialFeatureOptIns);

    this.publisher = {

      consents: createBooleanVector(purposeIds, tcModel.publisherConsents),
      legitimateInterests: createBooleanVector(purposeIds, tcModel.publisherLegitimateInterest),
      customPurpose: {

        consents: createBooleanVector(purposeIds, tcModel.publisherCustomConsents),
        legitimateInterests: createBooleanVector(purposeIds, tcModel.publisherCustomLegitimateInterest),

      },
      restrictions: createRestrictions(tcModel),
    };

  }

}
