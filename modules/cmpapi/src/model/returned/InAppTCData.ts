import {
  Return,
} from './Return';

import {
  BoolInt,
} from '../../types/BoolInt';

export interface StringBoolVector {
  [id: string]: string;
}

export class InAppTCData extends Return {

  public tcString: string;
  public eventStatus: string;
  public useNonStandardStacks: BoolInt;
  public publisherCC: string;
  public purposeOneTreatment: BoolInt;
  public outOfBand: {

    allowedVendors: StringBoolVector;
    discloseVendors: StringBoolVector;

  };
  public purpose: {

    consents: StringBoolVector;
    legitimateInterests: StringBoolVector;

  };
  public vendor: {

    consents: StringBoolVector;
    legitimateInterestslegInts: StringBoolVector;

  };
  public speicalFeatureOptins: StringBoolVector;
  public publisher: {

    consents: StringBoolVector;
    legitimateInterests: StringBoolVector;
    customPurpose: {

      consents: StringBoolVector;
      legitimateInterests: StringBoolVector;

    };
    restrictions: {

      [purposeId: string]: {
        [vendorId: string]: 0 | 1 | 2;
      };

    };
  }

}
