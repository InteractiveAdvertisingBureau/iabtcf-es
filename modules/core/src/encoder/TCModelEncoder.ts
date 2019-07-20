import {Encoder} from '.';
import {TCModel} from '../TCModel';

export interface TCModelEncoder {
  new(): Encoder<TCModel>;
}
