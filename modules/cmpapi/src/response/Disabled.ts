import {Response} from './Response';
import {CmpStatus} from '../status';

export class Disabled extends Response {

  public readonly cmpStatus: CmpStatus = CmpStatus.ERROR;

}
