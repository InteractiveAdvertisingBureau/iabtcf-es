import {IntEncoder} from './IntEncoder';
import {SpecificEncoder} from './SpecificEncoder';

export class DateEncoder implements SpecificEncoder {

  public encode(date: Date, numBits: number): string {

    const intEncoder: IntEncoder = new IntEncoder();

    return intEncoder.encode(Math.round(date.getTime()/100), numBits);

  }

}
