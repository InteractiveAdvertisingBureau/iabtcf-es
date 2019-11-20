import {BoolInt} from '../../types';
import {Response} from '../../model/responses/Response';

/**
 * Base response class containing all basic required response data and common methods
 */
export abstract class ResponseBuilder implements Response {

  public cmpId: number;
  public cmpVersion: number;
  public gdprApplies: boolean | BoolInt;
  public tcfPolicyVersion: number; // Todo: default to 2!

  /**
   * Returns this with fields only
   * @return {this}
   */
  public buildResponse(): this {

    return {...this};

  }

}
