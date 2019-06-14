import {TCModelPropType} from '../TCModelPropType';

export interface SpecificEncoder {

  encode(value: TCModelPropType, numBits: number): string;

}
