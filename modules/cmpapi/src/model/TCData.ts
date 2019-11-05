export interface BooleanVector {
  [id: string]: boolean;
}
import {TCModel} from '@iabtcf/core';
import {Return} from './Return';
import {EventStatus} from './status';

export class TCData extends Return {

  public constructor(tcModel: TCModel, tcString: string, eventStatus: EventStatus) {

    super();

    this.tcString = tcString;
    this.eventStatus = eventStatus;
    this.isServiceSpecific = tcModel.isServiceSpecific;
    this.useNonStandardStacks = tcModel.useNonStandardStacks;
    this.purposeOneTreatment = tcModel.purposeOneTreatment;
    this.outOfBand = {
      allowedVendors: tcModel.vendorsAllowed,
      discloseVendors: tcModel.vendorsDisclosed,
    };
    // this.publisher = tcModel.publisher;
    // this.publisherCC

  }

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
    legitimateInterestslegInts: BooleanVector;

  };
  public speicalFeatureOptins: BooleanVector;
  public publisher: {

    consents: BooleanVector;
    legitimateInterests: BooleanVector;
    customPurpose: {

      consents: BooleanVector;
      legitimateInterests: BooleanVector;

    };
    restrictions: {

      [purposeId: string]: {
        [vendorId: string]: 0 | 1 | 2;
      };

    };
  }

}
