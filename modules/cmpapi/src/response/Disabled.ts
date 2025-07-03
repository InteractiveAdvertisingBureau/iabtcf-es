import {Response} from './Response.js';
import {CmpStatus} from '../status/index.js';

export class Disabled extends Response {

  public readonly cmpStatus: CmpStatus = CmpStatus.ERROR;

}
