import {TCModel, TCModelPropType} from './TCModel';
import {EncodingError, DecodingError} from './errors';
import {Encodings} from './tcstring/Encodings';
import {BitLength} from './model/BitLength';
import {WebSafeBase64} from './tcstring/WebSafeBase64';
import {SpecificEncoder} from './tcstring/encoders';
import {SpecificDecoder} from './tcstring/decoders';
import crc from 'crc';

/**
 * Main class for encoding and decoding a
 * TCF Transparency and Consent String
 */
class TCString {

  /**
   *  encodes a model into a TCString
   *
   * @type {TCModel}
   * @param {TCModel} tcModel - model to convert into encoded string
   * @return {string} - web-safe base64 encoded Transparency and Consent String
   */
  public static encode(tcModel: TCModel): string {

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


    bitString[1] = this.makeChecksum(bitString[2]);

    return WebSafeBase64.encode(bitString.join(''));


  }

  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedString - web-safe base64 encoded Transparency and Consent String to decode
   * @return {TCModel} - Returns populated TCModel
   */
  public static decode(encodedString: string): TCModel {

    const tcModel = new TCModel();
    const encoding: readonly string[] = Encodings.order[tcModel.version - 1];
    const bitString = WebSafeBase64.decode(encodedString);
    let bStringIdx = 0;
    let checksum = '';

    encoding.forEach((key: string): void => {

      if (key === 'checksum') {

        checksum = bitString.slice(bStringIdx, BitLength[key]);
        if (this.makeChecksum(bitString.slice(1 + BitLength.checksum)) !== checksum) {

          throw new DecodingError('Checksum does not match');

        }

      } else {

        const decoder: SpecificDecoder = new Encodings.decoders[key]();

        tcModel[key] = decoder.decode(bitString.slice(bStringIdx, BitLength[key]));

      }

      bStringIdx += BitLength[key];

    });


    return tcModel;

  }

  private static makeChecksum(bits: string): string {

    // I'm not totally sure this is right
    const checksum = crc.crc16(bits).toString(2);

    return '0'.repeat(BitLength.checksum - checksum.length) + checksum;

  }

}

export {TCString};
