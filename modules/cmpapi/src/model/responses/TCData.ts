import {BoolInt} from '../../types';
import {BooleanVector} from '../BooleanVector';
import {Restrictions} from '../Restrictions';
import {Response} from './Response';

/**
 * TCData response model to be returned to TCF Api Command issuer
 */
export interface TCData extends Response {
  tcString: string;
  eventStatus: string;
  isServiceSpecific: boolean | BoolInt;
  useNonStandardStacks: boolean | BoolInt;
  publisherCC: string;
  purposeOneTreatment: boolean | BoolInt;
  outOfBand: {

    allowedVendors: BooleanVector;
    discloseVendors: BooleanVector;

  } | undefined;
  purpose: {

    consents: BooleanVector | string;
    legitimateInterests: BooleanVector | string;

  };
  vendor: {

    consents: BooleanVector | string;
    legitimateInterests: BooleanVector | string;

  };
  specialFeatureOptins: BooleanVector | string;
  publisher: {

    consents: BooleanVector | string;
    legitimateInterests: BooleanVector | string;
    customPurpose: {

      consents: BooleanVector | string;
      legitimateInterests: BooleanVector | string;

    };
    restrictions: Restrictions;
  };
}
