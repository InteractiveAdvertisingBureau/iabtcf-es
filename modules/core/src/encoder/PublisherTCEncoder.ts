import {

  Encoder,
  EncoderMap,
  BitLength,
  Base64Url,

} from '.';

import {PublisherFieldSequence} from './PublisherFieldSequence';

import {

  TCModel,
  TCModelPropType,

} from '..';

export class PublisherTCEncoder implements Encoder<TCModel> {

  private encMap: EncoderMap = new EncoderMap();

  public encode(tcModel: TCModel): string {

    const pubFieldSequence: PublisherFieldSequence = new PublisherFieldSequence();
    const encodeSequence: string[] = pubFieldSequence[tcModel.version.toString()];
    let bitField = '';

    encodeSequence.forEach((key: string): void => {

      const value: TCModelPropType = tcModel[key];
      const encoder: Encoder<TCModelPropType> = new this.encMap[key]() as Encoder<TCModelPropType>;
      const numBits: number = (BitLength[key]) ? BitLength[key] : tcModel.numCustomPurposes;

      bitField += encoder.encode(value, numBits);

    });

    const base64Url: Base64Url = new Base64Url();

    // base64url encode the string and return
    return base64Url.encode(bitField);

  }

  public decode(encodedString: string, tcModel: TCModel): TCModel {

    const pubFieldSequence: PublisherFieldSequence = new PublisherFieldSequence();
    const encodeSequence: string[] = pubFieldSequence[tcModel.version.toString()];
    const base64Url: Base64Url = new Base64Url();
    let bStringIdx = 0;
    let bitField = base64Url.decode(encodedString);

    /**
     * the first n bits are the type we don't actually care about them because
     * it's handled at a different level
     */
    bitField = bitField.substr(BitLength.segmentType);

    encodeSequence.forEach((key: string): void => {

      const encoder: Encoder<TCModelPropType> = new this.encMap[key]() as Encoder<TCModelPropType>;
      const numBits: number = (BitLength[key]) ? BitLength[key] : tcModel.numCustomPurposes;

      tcModel[key] = encoder.decode(bitField.substr(bStringIdx, numBits));
      bStringIdx += numBits;

    });

    return tcModel;

  }

}
