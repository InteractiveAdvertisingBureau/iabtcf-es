import {SpecificDecoder} from './SpecificDecoder';

class IntDecoder implements SpecificDecoder {

  public decode(value: string): number {

    return parseInt(value, 2);

  }


}
export {IntDecoder};
