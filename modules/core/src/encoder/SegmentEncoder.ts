import {Base64Url} from './Base64Url.js';
import {BitLength} from './BitLength.js';
import {FieldEncoderMap, IntEncoder, VendorVectorEncoder} from './field/index.js';
import {FieldSequence} from './sequence/index.js';
import {EncodingError, DecodingError} from '../errors/index.js';
import {Fields} from '../model/Fields.js';
import {Segment, SegmentIDs} from '../model/index.js';
import {TCModel, TCModelPropType} from '../index.js';

export class SegmentEncoder {

  private static fieldSequence: FieldSequence = new FieldSequence();

  public static encode(tcModel: TCModel, segment: Segment): string {

    let sequence;

    try {

      sequence = this.fieldSequence[String(tcModel.version)][segment];

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

    const fieldEncoderMap = FieldEncoderMap();
    sequence.forEach((key: string): void => {

      const value: TCModelPropType = tcModel[key];
      const encoder = fieldEncoderMap[key];
      let numBits: number = BitLength[key];

      if (numBits === undefined) {

        if (this.isPublisherCustom(key)) {

          /**
           * publisherCustom[Consents | LegitimateInterests] are an edge case
           * because they are of variable length. The length is defined in a
           * separate field named numCustomPurposes.
           */
          numBits = Number(tcModel[Fields.numCustomPurposes]);

        }

      }

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

    const bitField = Base64Url.decode(encodedString);
    let bStringIdx = 0;

    if (segment === Segment.CORE) {

      tcModel.version = IntEncoder.decode(bitField.substr(bStringIdx, BitLength[Fields.version]), BitLength[Fields.version]);

    }

    if (segment !== Segment.CORE) {

      bStringIdx += BitLength.segmentType;

    }

    const sequence = this.fieldSequence[String(tcModel.version)][segment];

    const fieldEncoderMap = FieldEncoderMap();
    sequence.forEach((key: string): void => {

      const encoder = fieldEncoderMap[key];
      let numBits = BitLength[key];

      if (numBits === undefined) {

        if (this.isPublisherCustom(key)) {

          /**
           * publisherCustom[Consents | LegitimateInterests] are an edge case
           * because they are of variable length. The length is defined in a
           * separate field named numCustomPurposes.
           */
          numBits = Number(tcModel[Fields.numCustomPurposes]);

        }

      }

      if (numBits !== 0) {

        /**
         * numBits could be 0 if this is a publisher custom purposes field and
         * no custom purposes are defined. If that is the case, we don't need
         * to gather no bits and we don't need to increment our bStringIdx
         * pointer because those would all be 0 increments and would mess up
         * the next logical if statement.
         */

        const bits = bitField.substr(bStringIdx, numBits);

        if (encoder === VendorVectorEncoder) {

          tcModel[key] = encoder.decode(bits, tcModel.version);

        } else {

          tcModel[key] = encoder.decode(bits, numBits);

        }

        if (Number.isInteger(numBits)) {

          bStringIdx += numBits;

        } else if (Number.isInteger(tcModel[key].bitLength)) {

          bStringIdx += tcModel[key].bitLength;

        } else {

          throw new DecodingError(key);

        }

      }

    });

    return tcModel;

  }

  private static isPublisherCustom(key: string): boolean {

    return key.indexOf('publisherCustom') === 0;

  }

}
