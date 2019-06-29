import {SpecificDecoder} from './SpecificDecoder';

export interface VariableLengthSpecificDecoder extends SpecificDecoder {
  getBitLength(): number;
}
