import {TCModel} from '../TCModel';
import {EncodingError} from '../errors/EncodingError';
import {TCModelPropType} from '../types/TCModelPropType';
import {Encodings, SpecificEncoder} from './encoder/Encodings';
import {BitLength} from '../model/BitLength';
import crc16 from 'crc';

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

      bitString[1] = crc16(bitString[2]).toString();

    }

    return this.base64Encode(bitString.join(''));

  }
  private base64Encode(bitString: string): string {

    return btoa(bitString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  }

}

export {Encoder};
