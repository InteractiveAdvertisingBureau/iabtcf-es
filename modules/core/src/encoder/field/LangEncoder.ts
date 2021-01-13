import {
  IntEncoder,
} from './IntEncoder';

import {
  DecodingError,
  EncodingError,
} from '../../errors';

export class LangEncoder {

  public static encode(value: string, numBits: number): string {

    value = value.toUpperCase();

    const ASCII_START = 65;
    const firstLetter: number = value.charCodeAt(0) - ASCII_START;

    const secondLetter: number = value.charCodeAt(1) - ASCII_START;

    // check some things to throw some good errors
    if (firstLetter < 0 || firstLetter > 25 || secondLetter < 0 || secondLetter > 25) {

      throw new EncodingError(`invalid language code: ${value}`);

    }

    if (numBits % 2 === 1) {

      throw new EncodingError(`numBits must be even, ${numBits} is not valid`);

    }

    numBits = numBits/2;
    const firstLetterBString: string = IntEncoder.encode(firstLetter, numBits);
    const secondLetterBString: string = IntEncoder.encode(secondLetter, numBits);

    return firstLetterBString + secondLetterBString;

  }

  public static decode(value: string, numBits: number): string {

    let retr: string;

    // is it an even number of bits? we have to divide it
    if (numBits === value.length && !(value.length % 2)) {

      const ASCII_START = 65;
      const mid: number = value.length/2;
      const firstLetter = IntEncoder.decode(value.slice(0, mid), mid) + ASCII_START;
      const secondLetter = IntEncoder.decode(value.slice(mid), mid) + ASCII_START;

      retr = String.fromCharCode(firstLetter) + String.fromCharCode(secondLetter);

    } else {

      throw new DecodingError('invalid bit length for language');

    }

    return retr;

  }

}
