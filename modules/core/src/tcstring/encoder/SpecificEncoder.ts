import {TCModelPropType} from '../../types/TCModelPropType';

export interface SpecificEncoder {

  encode(value: TCModelPropType, numBits: number): string;

}
