import {TCModel} from '../TCModel';
import {EncodingError} from '../errors/EncodingError';
import {Encodings, SpecificEncoder, TCModelPropType} from './Encodings';
import {BitLength} from '../model/BitLength';
import {WebSafeBase64} from './WebSafeBase64';
import crc from 'crc';

class Encoder {

  /**
   * @param {TCModel} tcModel - model to convert into encoded string
   *
   * @return {string} - web-safe base64 encoded Transparency and Consent String
  */
  public encode(tcModel: TCModel): string {

    if (!tcModel.isValid()) {

      throw new EncodingError('Invalid TCModel');

    }
    const encoding: readonly string[] = Encodings.order[tcModel.version - 1];
    const bitString: string[] = [''];
    let bStringIdx = 0;

    encoding.forEach((key: string): void => {

      if (key === 'checksum') {

        bitString.push('');
        bStringIdx += 2;
        bitString[bStringIdx] = '';

      } else {

        const value: TCModelPropType = tcModel[key];

        const numBits: number = BitLength[key];
        const encoder: SpecificEncoder = new Encodings.encoders[key]();

        try {

          bitString[bStringIdx] += encoder.encode(value, numBits);

        } catch (err) {

          throw new EncodingError(`Unable to encode ${key}: ${err.message}`);

        }

      }


    });

    // Generate checksum
    if (bitString.length === 3) {

      // I'm not totally sure this is right
      const checksum = crc.crc16(bitString[2]).toString(2);

      bitString[1] = '0'.repeat(BitLength.checksum - checksum.length) + checksum;

    }

    return WebSafeBase64.encode(bitString.join(''));

  }

}

export {Encoder};
