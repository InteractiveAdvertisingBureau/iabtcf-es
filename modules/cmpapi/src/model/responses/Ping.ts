import {CmpStatus, DisplayStatus} from '../../status';
import {Response} from './Response';

/**
 * Ping response model to be returned to TCF Api Command issuer
 */
export interface Ping extends Response {
  cmpLoaded: boolean;
  cmpStatus: CmpStatus;
  displayStatus: DisplayStatus;
  apiVersion: string;
  gvlVersion: number;
}
