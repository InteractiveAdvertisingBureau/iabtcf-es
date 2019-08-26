export type BoolInt = 0 | 1 | undefined;

export class Return {

  public cmpId: number
  public cmpVersion: number;
  public gdprApplies: boolean | BoolInt;
  public tcfPolicyVersion: number;

}
