import {RestrictionType} from '@internaltestiabtechlab/core';

export interface Restrictions {

  [purposeId: string]: {
    [vendorId: string]: RestrictionType;
  } | string;

}
