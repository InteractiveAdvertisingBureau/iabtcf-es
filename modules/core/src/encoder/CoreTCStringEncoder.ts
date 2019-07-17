import {Encoder} from './Encoder';
import {Base64Url} from '../Base64Url';
import {EncodingError, DecodingError} from '../errors';
import {EncoderMap} from './EncoderMap';
import {TCModel, TCModelPropType} from '../TCModel';
import {BitLength} from '../model/BitLength';
import {CoreFieldSequence} from './CoreFieldSequence';

export class CoreTCStringEncoder implements Encoder<TCModel> {

  public encode(tcModel: TCModel): string {

    const encoding: string[] = CoreFieldSequence[tcModel.version.toString()];
    let bitField = '';
    let bitSum = 0;

    encoding.forEach((key: string): void => {

      bitSum += BitLength[key];

      const value: TCModelPropType = tcModel[key];

      const numBits: number = BitLength[key];
      const encoder: Encoder<TCModelPropType> = new EncoderMap[key]() as Encoder<TCModelPropType>;

      try {

        bitField += encoder.encode(value, numBits);

      } catch (err) {

        throw new EncodingError(`Unable to encode ${key}: ${err.message}`);

      }


    });

    /**
     * Pad the remainder of the bitField with with zeros to so that it is a
     * valid base64-able bitfield
     */
    bitField += '0'.repeat(6-(bitSum % 6));

    // base64url encode the string and return
    return Base64Url.encode(bitField);

  }
  public decode(encodedString: string): TCModel {

    const tcModel = new TCModel();
    const encoding: string[] = CoreFieldSequence[tcModel.version.toString()];
    const bitField = Base64Url.decode(encodedString);
    let bStringIdx = 0;

    encoding.forEach((key: string): void => {

      let vLengthBits = 0;
      const encoder: Encoder<TCModelPropType> = new EncoderMap[key]() as Encoder<TCModelPropType>;

      tcModel[key] = encoder.decode(bitField.substr(bStringIdx, BitLength[key]));

      /**
       * if it has no entry in the BitLength map, then it is a variable
       * length encoding
       */
      if (!BitLength[key] && encoder.getBitLength) {

        vLengthBits = encoder.getBitLength();

      }

      /**
       * vLengthBits can only be set from a variable length encodeencoder otherwise
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
