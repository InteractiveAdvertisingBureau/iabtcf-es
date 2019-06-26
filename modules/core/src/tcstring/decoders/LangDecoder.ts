import {IntDecoder} from './IntDecoder';
import {SpecificDecoder} from './SpecificDecoder';
import {DecodingError} from '../../errors/DecodingError';

class LangDecoder implements SpecificDecoder {

  public decode(value: string): string {

    let retr: string;

    // is it an even number of bits? we have to divide it
    if (!(value.length % 2)) {

      const intDecoder: IntDecoder = new IntDecoder();
      const ASCII_START = 65;
      const mid: number = value.length/2;
      const firstLetter = intDecoder.decode(value.slice(0, mid)) + ASCII_START;
      const secondLetter = intDecoder.decode(value.slice(mid)) + ASCII_START;


      retr = String.fromCharCode(firstLetter) + String.fromCharCode(secondLetter);

    } else {

      throw new DecodingError('invalid bit length for language');

    }

    return retr;

  }

}
export {LangDecoder};
