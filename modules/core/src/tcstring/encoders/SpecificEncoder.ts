import {Vector} from '../../model/Vector';

export type TCModelPropType = number | Date | string | boolean | Vector;

export interface SpecificEncoder {

  encode(value: TCModelPropType, numBits: number): string;

}
