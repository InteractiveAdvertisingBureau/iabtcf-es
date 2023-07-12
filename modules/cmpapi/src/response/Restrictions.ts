import {RestrictionType} from '@iabtechlabtcf/core';

export interface Restrictions {

  [purposeId: string]: {
    [vendorId: string]: RestrictionType;
  } | string;

}
