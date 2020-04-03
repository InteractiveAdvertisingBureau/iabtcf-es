import {Base64Url} from './Base64Url';
import {BitLength} from './BitLength';
import {FieldEncoderMap, IntEncoder} from './field';
import {FieldSequence} from './sequence';
import {TCModel, TCModelPropType} from '../';
import {EncodingError, DecodingError} from '../errors';
import {Segment, SegmentIDs} from '../model';

export class SegmentEncoder {

  private static fieldSequence: FieldSequence = new FieldSequence();

  public static encode(tcModel: TCModel, segment: Segment): string {

    let sequence;

    try {

      sequence = this.fieldSequence[''+tcModel.version][segment];

    } catch (err) {

      throw new EncodingError(`Unable to encode version: ${tcModel.version}, segment: ${segment}`);

    }

    let bitField = '';

    /**
     * If this is anything other than the core segment we have a "segment id"
     * to append to the front of the string
     */
    if (segment !== Segment.CORE) {

      bitField = IntEncoder.encode(SegmentIDs.KEY_TO_ID[segment], BitLength.segmentType);

    }

    sequence.forEach((key: string): void => {

      const value: TCModelPropType = tcModel[key];
      const numBits: number = BitLength[key];
      const encoder = FieldEncoderMap[key];

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

    const sequence = this.fieldSequence[''+tcModel.version][segment];
    const bitField = Base64Url.decode(encodedString);
    let bStringIdx = 0;

    if (segment !== Segment.CORE) {

      bStringIdx += BitLength.segmentType;

    }

    sequence.forEach((key: string): void => {

      const encoder = FieldEncoderMap[key];
      const bits = bitField.substr(bStringIdx, BitLength[key]);

      tcModel[key] = encoder.decode(bits, BitLength[key]);

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
