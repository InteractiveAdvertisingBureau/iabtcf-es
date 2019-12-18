import {CmpApiModel} from '../CmpApiModel';

export class Response {

  public cmpId: number = CmpApiModel.cmpId;
  public cmpVersion: number = CmpApiModel.cmpVersion;
  public gdprApplies: boolean = CmpApiModel.gdprApplies;
  public tcfPolicyVersion: number = CmpApiModel.tcfPolicyVersion;

}
