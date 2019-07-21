import {

  CoreFieldSequence,
  Encoder,
  EncoderMap,
  BitLength,

} from '.';

import {

  EncodingError,
  DecodingError,

} from '../errors';

import {

  TCModel,
  TCModelPropType,
  Base64Url,

} from '..';

export class CoreTCStringEncoder implements Encoder<TCModel> {

  private encMap: EncoderMap = new EncoderMap();
  private coreFieldSequence: CoreFieldSequence = new CoreFieldSequence();

  public encode(tcModel: TCModel): string {

    const encodeSequence: string[] = this.coreFieldSequence[tcModel.version.toString()];
    let bitField = '';
    let bitSum = 0;

    encodeSequence.forEach((key: string): void => {

      bitSum += BitLength[key];

      const value: TCModelPropType = tcModel[key];
      const numBits: number = BitLength[key];
      const encoder: Encoder<TCModelPropType> = new this.encMap[key]() as Encoder<TCModelPropType>;

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
    if (bitField.length % 6 !== 0) {

      bitField += '0'.repeat(6-(bitSum % 6));

    }

    // base64url encode the string and return
    return Base64Url.encode(bitField);

  }

  public decode(encodedString: string, tcModel: TCModel): TCModel {

    const encodeSequence: string[] = this.coreFieldSequence[tcModel.version.toString()];
    const bitField = Base64Url.decode(encodedString);
    let bStringIdx = 0;

    encodeSequence.forEach((key: string): void => {

      const encoder: Encoder<TCModelPropType> = new this.encMap[key]() as Encoder<TCModelPropType>;

      tcModel[key] = encoder.decode(bitField.substr(bStringIdx, BitLength[key]));


      if (BitLength[key]) {

        bStringIdx += BitLength[key];

      } else if (encoder.getBitLength) {

        bStringIdx += encoder.getBitLength();

      } else {

        throw new DecodingError('Indeterminate bit length');

      }

    });


    return tcModel;

  }

}
