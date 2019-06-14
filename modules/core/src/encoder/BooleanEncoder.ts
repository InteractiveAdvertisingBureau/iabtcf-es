import {SpecificEncoder} from './SpecificEncoder';

class BooleanEncoder implements SpecificEncoder {

  public encode(value: boolean): string {

    return +value + '';

  }

}
export {BooleanEncoder};
