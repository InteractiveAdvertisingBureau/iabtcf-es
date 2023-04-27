import {RestrictionType} from '@didomi/iabtcf-core';

export interface Restrictions {

  [purposeId: string]: {
    [vendorId: string]: RestrictionType;
  } | string;

}
