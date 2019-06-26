import {IntDecoder} from './IntDecoder';
import {SpecificDecoder} from './SpecificDecoder';

class DateDecoder implements SpecificDecoder {

  public decode(value: string): Date {

    const intDecoder: IntDecoder = new IntDecoder();

    return new Date(intDecoder.decode(value) * 100);

  }

}
export {DateDecoder};
