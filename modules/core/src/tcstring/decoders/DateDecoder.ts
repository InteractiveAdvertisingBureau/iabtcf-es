import {IntDecoder} from './IntDecoder';
import {SpecificDecoder} from './SpecificDecoder';

export class DateDecoder implements SpecificDecoder {

  public decode(bitString: string): Date {

    const intDecoder: IntDecoder = new IntDecoder();
    const date: Date = new Date();

    date.setTime(intDecoder.decode(bitString) * 100);

    return date;

  }

}
