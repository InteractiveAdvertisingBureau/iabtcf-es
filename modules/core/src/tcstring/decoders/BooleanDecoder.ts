import {SpecificDecoder} from './SpecificDecoder';

class BooleanDecoder implements SpecificDecoder {

  public decode(value: string): boolean {

    // less operations than !!parseInt(value, 2)
    return value === '1';

  }

}
export {BooleanDecoder};
