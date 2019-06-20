import {IntEncoder} from './IntEncoder';
import {SpecificEncoder} from './SpecificEncoder';

class DateEncoder implements SpecificEncoder {

  public encode(value: Date, numBits: number): string {

    const intEncoder: IntEncoder = new IntEncoder();

    return intEncoder.encode(Math.round(value.getTime()/100), numBits);

  }

}
export {DateEncoder};
