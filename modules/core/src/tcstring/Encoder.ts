import {TCModel} from '../TCModel';
import {EncodingError} from '../errors/EncodingError';
import {TCModelPropType} from '../types/TCModelPropType';
import {Encodings, SpecificEncoder} from './encoder/Encodings';
import {BitLength} from '../model/BitLength';
import {Base64} from 'base-64';


class Encoder {

  /**
   * @param {TCModel} tcModel - model to convert into encoded string
   *
   * @return {string} - web-safe base64 encoded Transparency and Consent String
  */

  public encode(tcModel: TCModel): string {

    const encoding: readonly string[] = Encodings.order[tcModel.version - 1];
    let bitString = '';

    encoding.forEach((key: string): void => {

      const value: TCModelPropType = tcModel[key];
      const numBits: number = BitLength[key];
      const encoder: SpecificEncoder = new Encodings.encoders[key]();

      try {

        bitString += encoder.encode(value, numBits);

      } catch (err) {

        throw new EncodingError(`Unable to encode ${key}: ${err.message}`);

      }


    });

    return this.base64Encode(bitString);

  }
  private base64Encode(bitString: string): string {

    return Base64.encode(bitString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  }

}

export {Encoder};
