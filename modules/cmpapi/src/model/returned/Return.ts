import {BoolInt} from '../../types/BoolInt';

export class Return {

  public cmpId: number;
  public cmpVersion: number;
  public gdprApplies: boolean | BoolInt;
  public tcfPolicyVersion: number; // default to 2!

}
