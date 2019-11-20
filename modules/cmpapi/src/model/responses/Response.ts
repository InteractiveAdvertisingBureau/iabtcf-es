import {BoolInt} from '../../types';

/**
 * Base response model to be returned to TCF Api Command issuer
 */
export interface Response {
  cmpId: number;
  cmpVersion: number;
  gdprApplies: boolean | BoolInt;
  tcfPolicyVersion: number;
}
