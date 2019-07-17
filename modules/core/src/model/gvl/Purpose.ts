import {GVLMapItem} from './GVLMapItem';

export interface Purpose extends GVLMapItem {
  description: string;
  descriptionLegal: string;
  /*
   * default=true  false means CMPs should never afford users the means to
   * provide an opt-in consent choice
   */
  consentable? : boolean;
  /**
   * default=true  false means CMPs should never afford users the means to
   * exercise a right to object
   */
  rightToObject?: boolean;
};
