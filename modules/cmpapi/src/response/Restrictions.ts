import {RestrictionType} from '@cookiehub/iabtcf-core';

export interface Restrictions {

  [purposeId: string]: {
    [vendorId: string]: RestrictionType;
  } | string;

}
