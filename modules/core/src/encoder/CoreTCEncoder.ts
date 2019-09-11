import {

  Encoder,
  EncoderMap,
  BitLength,
  Base64Url,

} from '.';
import {CoreFieldSequence} from './CoreFieldSequence';

import {

  TCModel,
  TCModelPropType,

} from '..';

export class CoreTCEncoder implements Encoder<TCModel> {

  private encMap: EncoderMap = new EncoderMap();

  public encode(tcModel: TCModel): string {

    const coreFieldSequence: CoreFieldSequence = new CoreFieldSequence();
    const encodeSequence: string[] = coreFieldSequence[tcModel.version.toString()];
    let bitField = '';

    encodeSequence.forEach((key: string): void => {

      const value: TCModelPropType = tcModel[key];
      const numBits: number = BitLength[key];
      const encoder: Encoder<TCModelPropType> = new this.encMap[key]() as Encoder<TCModelPropType>;

      try {
        bitField += encoder.encode(value, numBits);
      } catch (err) {
        err.message = `Error while trying to encode '${key}': ${err.message}`;
        throw err;
      }

    });

    const base64Url: Base64Url = new Base64Url();

    // base64url encode the string and return
    return base64Url.encode(bitField);

  }

  public decode(encodedString: string, tcModel: TCModel): TCModel {

    const coreFieldSequence: CoreFieldSequence = new CoreFieldSequence();
    const encodeSequence: string[] = coreFieldSequence[tcModel.version.toString()];
    const base64Url: Base64Url = new Base64Url();
    const bitField = base64Url.decode(encodedString);
    let bStringIdx = 0;

    encodeSequence.forEach((key: string): void => {

      const encoder: Encoder<TCModelPropType> = new this.encMap[key]() as Encoder<TCModelPropType>;
      const bits = bitField.substr(bStringIdx, BitLength[key]);
      tcModel[key] = encoder.decode(bits);

      if (BitLength[key]) {

        bStringIdx += BitLength[key];

      } else if (typeof encoder.getBitLength === 'function') {

        bStringIdx += encoder.getBitLength();

      }

    });

    return tcModel;

  }

}
