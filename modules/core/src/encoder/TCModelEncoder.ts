import {Encoder} from './Encoder';
import {TCModel} from '../TCModel';

export interface TCModelEncoder {
  new(): Encoder<TCModel>;
}
