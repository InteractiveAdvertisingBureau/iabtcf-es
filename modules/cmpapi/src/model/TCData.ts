export interface BooleanVector {
  [id: string]: boolean;
}
import {Return} from './Return';

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
