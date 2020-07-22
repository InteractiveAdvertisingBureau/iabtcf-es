import {
  IntEncoder,
} from './IntEncoder';

import {
  DecodingError,
  EncodingError,
} from '../../errors';

export class LangEncoder {

  private static ASCII_START: number = 65;

  public static encode(value: string, numBits: number): string {

    if (numBits % 2 !== 0) {

      throw new EncodingError(`numBits must be even, ${numBits} is not valid`);

    }

    value = value.toUpperCase();

    const firstLetter: number = value.charCodeAt(0) - LangEncoder.ASCII_START;
    const secondLetter: number = value.charCodeAt(1) - LangEncoder.ASCII_START;

    // check some things to throw some good errors
    if (firstLetter < 0 || firstLetter > 25 || secondLetter < 0 || secondLetter > 25) {

      throw new EncodingError(`invalid language code: ${value}`);

    }

    numBits = numBits/2;

    const firstLetterBString: string = IntEncoder.encode(firstLetter, numBits);
    const secondLetterBString: string = IntEncoder.encode(secondLetter, numBits);

    return firstLetterBString + secondLetterBString;

  }

  public static decode(value: string, numBits: number): string {

    // is it an even number of bits? we have to divide it
    if (numBits !== value.length || value.length % 2 !== 0) {

      throw new DecodingError('invalid bit length for language');

    }

    const mid: number = value.length/2;
    const firstLetter = IntEncoder.decode(value.slice(0, mid), mid) + LangEncoder.ASCII_START;
    const secondLetter = IntEncoder.decode(value.slice(mid), mid) + LangEncoder.ASCII_START;

    return String.fromCharCode(firstLetter) + String.fromCharCode(secondLetter);

  }

}
