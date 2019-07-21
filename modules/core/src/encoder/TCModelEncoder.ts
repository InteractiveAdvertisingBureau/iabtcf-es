import {Encoder} from '.';
import {TCModel} from '..';

export interface TCModelEncoder {
  new(): Encoder<TCModel>;
}
