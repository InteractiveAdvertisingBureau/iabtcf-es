import {TCModelPropType} from '../TCModel';

export interface SpecificEncoder {

  encode(value: TCModelPropType, numBits: number): string;

}
