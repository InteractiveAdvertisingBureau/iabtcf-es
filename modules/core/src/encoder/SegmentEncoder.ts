import {
  Base64Url,
} from './Base64Url';
import {
  BitLength,
} from './BitLength';
import {
  FieldEncoderMap,
  IntEncoder,
} from './field';
import {
  FieldSequence,
} from './sequence';
import {
  TCModel,
  TCModelPropType,
} from '../';
import {
  EncodingError,
  DecodingError,
} from '../errors';
import {
  Segments,
} from '../model';

export class SegmentEncoder {

  private static fieldEncoderMap: FieldEncoderMap = new FieldEncoderMap();
  private static fieldSequence: FieldSequence = new FieldSequence();

  public static encode(tcModel: TCModel, segment: string): string {

    if (!Segments[segment]) {

      throw new EncodingError(`invalid segment type: ${segment}`);

    }

    const sequence = this.fieldSequence[tcModel.version.toString()][segment];
    let bitField = '';

    /**
     * If this is anything other than the core segment we have a "segment id"
     * to append to the front of the string
     */
    if (segment !== Segments.core) {

      bitField = IntEncoder.encode(Segments[segment], BitLength.segmentType);

    }

    sequence.forEach((key: string): void => {

      const value: TCModelPropType = tcModel[key];
      const numBits: number = BitLength[key];
      const encoder = this.fieldEncoderMap[key];

      try {

        bitField += encoder.encode(value, numBits);

      } catch (err) {

        throw new EncodingError(`Error encoding ${segment}->${key}: ${err.message}`);

      }

    });

    // base64url encode the string and return
    return Base64Url.encode(bitField);

  }
  public static decode(encodedString: string, tcModel: TCModel, segment: string): TCModel {

    const sequence = this.fieldSequence[tcModel.version.toString()][segment];
    const bitField = Base64Url.decode(encodedString);
    let bStringIdx = 0;

    if (segment !== Segments.core) {

      bStringIdx += BitLength.segmentType;

    }

    sequence.forEach((key: string): void => {

      const encoder = this.fieldEncoderMap[key];
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

    /**
     * if a vendors allowed segment exists, then support for OOB signaling is
     * implied
     */
    if (segment === Segments.vendorsAllowed) {

      tcModel.supportOOB = true;

    }

    return tcModel;

  }

}
