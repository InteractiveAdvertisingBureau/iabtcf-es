import {

  SegmentType,

} from '.';

import {

  Base64Url,
  BitLength,

} from '../';

import {

  FieldEncoderMap,
  IntEncoder,

} from '../field';

import {

  PublisherFieldSequence,

} from '../sequence';

import {

  TCModel,
  TCModelPropType,

} from '../../';

export class PublisherTCEncoder {

  public static encode(tcModel: TCModel): string {

    const encMap: FieldEncoderMap = new FieldEncoderMap();
    const pubFieldSequence: PublisherFieldSequence = new PublisherFieldSequence();
    const encodeSequence: string[] = pubFieldSequence[tcModel.version.toString()];

    // first encode the segment type
    let bitField: string = IntEncoder.encode(SegmentType.publisherTC, BitLength.segmentType);

    encodeSequence.forEach((key: string): void => {

      const value: TCModelPropType = tcModel[key];
      const encoder = encMap[key];
      const numBits: number = (BitLength[key]) ? BitLength[key] : tcModel.numCustomPurposes;

      bitField += encoder.encode(value, numBits);

    });

    // base64url encode the string and return
    return Base64Url.encode(bitField);

  }

  public static decode(encodedString: string, tcModel: TCModel): TCModel {

    const encMap: FieldEncoderMap = new FieldEncoderMap();
    const pubFieldSequence: PublisherFieldSequence = new PublisherFieldSequence();
    const encodeSequence: string[] = pubFieldSequence[tcModel.version.toString()];
    let bStringIdx = 0;
    let bitField = Base64Url.decode(encodedString);

    /**
     * the first n bits are the type we don't actually care about them because
     * it's handled at a different level
     */
    bitField = bitField.substr(BitLength.segmentType);

    encodeSequence.forEach((key: string): void => {

      const encoder = encMap[key];
      const numBits: number = (BitLength[key]) ? BitLength[key] : tcModel.numCustomPurposes;

      tcModel[key] = encoder.decode(bitField.substr(bStringIdx, numBits));
      bStringIdx += numBits;

    });

    return tcModel;

  }

}
