import {TCModelPropType} from '../TCModel';

export interface SpecificDecoder {

  decode(value: string): TCModelPropType;

}
