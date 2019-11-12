import {BoolInt} from '../../types';

/**
 * Basic return class containing all basic required response data
 */
export class Return {

  public cmpId: number;
  public cmpVersion: number;
  public gdprApplies: boolean | BoolInt;
  public tcfPolicyVersion: number; // Todo: default to 2!

}
