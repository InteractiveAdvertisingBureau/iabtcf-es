import {FieldEncoderMap} from '../field';
import {CoreFieldSequence} from '../sequence';
import {
  EncodingError,
  DecodingError,
} from '../../errors';
import {
  TCModel,
  TCModelPropType,
} from '../../';
import {
  BitLength,
  Base64Url,
} from '../';

export class CoreTCEncoder {

  public static encode(tcModel: TCModel): string {

    const encMap: FieldEncoderMap = new FieldEncoderMap();
    const coreFieldSequence: CoreFieldSequence = new CoreFieldSequence();
    const encodeSequence: string[] = coreFieldSequence[tcModel.version.toString()];
    let bitField = '';

    encodeSequence.forEach((key: string): void => {

      const value: TCModelPropType = tcModel[key];
      const numBits: number = BitLength[key];
      const encoder = encMap[key];

      try {

        if (key === 'publisherRestrictions') {

          // eslint-disable-next-line no-console
          console.log(key);

        }

        bitField += encoder.encode(value, numBits);

      } catch (err) {

        throw new EncodingError(`Error while trying to encode core '${key}': ${err.message}`);

      }

    });

    // base64url encode the string and return
    return Base64Url.encode(bitField);

  }

  public static decode(encodedString: string, tcModel: TCModel): TCModel {

    const encMap: FieldEncoderMap = new FieldEncoderMap();
    const coreFieldSequence: CoreFieldSequence = new CoreFieldSequence();
    const encodeSequence: string[] = coreFieldSequence[tcModel.version.toString()];
    const bitField = Base64Url.decode(encodedString);
    let bStringIdx = 0;

    encodeSequence.forEach((key: string): void => {

      const encoder = encMap[key];
      const bits = bitField.substr(bStringIdx, BitLength[key]);

      tcModel[key] = encoder.decode(bits);

      if (BitLength[key]) {

        bStringIdx += BitLength[key];

      } else if (tcModel[key].bitLength) {

        bStringIdx += tcModel[key].bitLength;

      } else {

        throw new DecodingError(`error decoding ${key}`);

      }

    });

    return tcModel;

  }

}
