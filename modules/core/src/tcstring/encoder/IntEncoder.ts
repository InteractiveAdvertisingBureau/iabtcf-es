import {EncodingError} from '../../errors/EncodingError';
import {SpecificEncoder} from './SpecificEncoder';

class IntEncoder implements SpecificEncoder {

  public encode(value, numBits): string {

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


}
export {IntEncoder};
