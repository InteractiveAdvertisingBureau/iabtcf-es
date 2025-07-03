import {CmpApiModel} from '../CmpApiModel.js';

export class Response {

  public readonly cmpId: number = CmpApiModel.cmpId;
  public readonly cmpVersion: number = CmpApiModel.cmpVersion;
  public readonly gdprApplies: boolean = CmpApiModel.gdprApplies;
  public readonly tcfPolicyVersion: number = CmpApiModel.tcfPolicyVersion;

}
