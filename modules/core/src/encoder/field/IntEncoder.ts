import {
  EncodingError,
} from '../../errors';

export class IntEncoder {

  public static encode(value: number | string, numBits: number): string {

    let bitString;

    if (typeof value === 'string') {

      value = parseInt(value, 10);

    }

    bitString = value.toString(2);

    if (bitString.length > numBits || value < 0) {

      throw new EncodingError(`${value} too large to encode into ${numBits}`);

    }

    // Pad the string if not filling all bits
    if (bitString.length < numBits ) {

      // pad left
      bitString = '0'.repeat(numBits - bitString.length) + bitString;

    }

    return bitString;

  }

  public static decode(value: string): number {

    return parseInt(value, 2);

  }

}
