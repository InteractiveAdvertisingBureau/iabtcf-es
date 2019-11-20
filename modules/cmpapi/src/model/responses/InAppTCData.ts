import {Response} from './Response';
import {TCData} from './TCData';

/**
 * InAppTCData response model to be returned to TCF Api Command issuer
 */
export interface InAppTCData extends TCData, Response {
  outOfBand: undefined;
}
