import {Encoder} from '.';
import {EncodingError} from '../errors';

export class IntEncoder implements Encoder<number> {

  public encode(value: number, numBits: number): string {

    let bitString = value.toString(2);

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

  public decode(value: string): number {

    return parseInt(value, 2);

  }

}
