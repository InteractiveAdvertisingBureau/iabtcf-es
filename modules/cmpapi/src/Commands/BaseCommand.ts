import {CmpData} from '../model/CmpData';
import {Return} from '../model/returned/Return';

export abstract class BaseCommand {

  protected cmpData: CmpData;

  protected constructor(cmpData: CmpData) {

    this.cmpData = cmpData;

  }

  /**
     * Sets all the fields on a Return object using current cmp api data
     * @param {Return} returnObj a Return object
     */
  protected setReturnFields(returnObj: Return): void {

    returnObj.cmpId = this.cmpData.cmpId;
    returnObj.cmpVersion = this.cmpData.cmpVersion;
    returnObj.gdprApplies = this.cmpData.gdprApplies;
    returnObj.tcfPolicyVersion = this.cmpData.tcfPolicyVersion;

  }

}
