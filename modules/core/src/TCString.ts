import {TCModel, TCModelPropType} from './TCModel';
import {EncodingError, DecodingError} from './errors';
import {Encodings} from './tcstring/Encodings';
import {BitLength} from './tcstring/BitLength';
import {Base64Url} from './tcstring/Base64Url';
import {SpecificEncoder} from './tcstring/encoders';
import {SpecificDecoder, VariableLengthSpecificDecoder} from './tcstring/decoders';
import {Checksum} from './tcstring/Checksum';

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
    const bitField: string[] = [''];
    let bStringIdx = 0;
    let bitSum = 0;

    encoding.forEach((key: string): void => {

      bitSum += BitLength[key];

      if (key === 'checksum') {

        bitField.push('');
        bStringIdx += 2;
        bitField[bStringIdx] = '';

      } else {

        const value: TCModelPropType = tcModel[key];

        const numBits: number = BitLength[key];
        const encoder: SpecificEncoder = new Encodings.encoders[key]();

        try {

          bitField[bStringIdx] += encoder.encode(value, numBits);

        } catch (err) {

          throw new EncodingError(`Unable to encode ${key}: ${err.message}`);

        }

      }


    });

    /**
     * Pad the remainder of the bitField with with zeros to so that it is a
     * valid base64-able bitfield
     */
    bitField[2] += '0'.repeat(6-(bitSum % 6));

    /**
     * insert the checksum into the middle of the bitField array
     */
    bitField[1] = Checksum.create(bitField[2], BitLength.checksum);

    // encode the joined string and return
    return Base64Url.encode(bitField.join(''));

  }

  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedString - web-safe base64 encoded Transparency and
   * Consent String to decode
   * @return {TCModel} - Returns populated TCModel
   */
  public static decode(encodedString: string): TCModel {

    const tcModel = new TCModel();
    const encoding: readonly string[] = Encodings.order[tcModel.version - 1];
    const bitField = Base64Url.decode(encodedString);
    let bStringIdx = 0;

    encoding.forEach((key: string): void => {

      let vLengthBits = 0;

      if (key === 'checksum') {

        // compare encoded checksum with what we've got
        const theirChecksum = bitField.substr(bStringIdx, BitLength.checksum);
        const ourChecksum = Checksum.create(bitField.substr(bStringIdx + BitLength.checksum), BitLength.checksum);

        if (ourChecksum !== theirChecksum) {

          throw new DecodingError('Checksum does not match');

        }

      } else {

        const decoder: SpecificDecoder = new Encodings.decoders[key]();

        tcModel[key] = decoder.decode(bitField.substr(bStringIdx, BitLength[key]));

        /**
         * if it has no entry in the BitLength map, then it is a variable
         * length encoding
         */
        if (!BitLength[key]) {

          vLengthBits = (decoder as VariableLengthSpecificDecoder).getBitLength();

        }


      }

      /**
       * vLengthBits can only be set from a variable length decoder otherwise
       * it's 0
       */
      if (vLengthBits || BitLength[key]) {

        bStringIdx += (vLengthBits) ? vLengthBits : BitLength[key];

      } else {

        throw new DecodingError('Something went wrong...');

      }

    });


    return tcModel;

  }

}

export {TCString};
