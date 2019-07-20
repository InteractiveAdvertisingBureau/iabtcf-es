import {

  Encoder,
  BitLength,
  IntEncoder,
  SegmentEncoderMap,
  SegmentSequence,
  TCModelEncoder,

} from './encoder';

import {DecodingError} from './errors';

import {TCModel} from './TCModel';

/**
 * Main class for encoding and decoding a
 * TCF Transparency and Consent String
 */
export class TCString implements Encoder<TCModel> {

  /**
   *  encodes a model into a TCString
   *
   * @type {TCModel}
   * @param {TCModel} tcModel - model to convert into encoded string
   * @return {string} - base64url encoded Transparency and Consent String
   */
  public encode(tcModel: TCModel): string {

    let retrString = '';
    const segmentSequence: number[] = SegmentSequence[tcModel.version.toString()];
    const len: number = segmentSequence.length;

    for (let i = 0; i < len; i ++) {

      const segEncClass: TCModelEncoder = SegmentEncoderMap[segmentSequence[i]];
      const segEnc: Encoder<TCModel> = new segEncClass();

      retrString += segEnc.encode(tcModel) + (i < len - 1) ? '.' : '';

    }

    return retrString;

  }

  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedString - base64url encoded Transparency and
   * Consent String to decode
   * @return {TCModel} - Returns populated TCModel
   */
  public decode(encodedString: string): TCModel {

    const tcModel: TCModel = new TCModel();
    const intEnc: IntEncoder = new IntEncoder();
    const version: string = intEnc.decode(encodedString.substr(0, BitLength.version)).toString();
    const segmentEncMap: Map<number, TCModelEncoder> = SegmentEncoderMap[version];
    const segments: string[] = encodedString.split('.');
    const len: number = segments.length;

    for (let i = 0; i < len; i ++) {

      let segEncClass: TCModelEncoder;
      const segment: string = segments[i];

      // fist is always core
      if ( i === 0 ) {

        segEncClass = segmentEncMap.get(i) as TCModelEncoder;

      } else {

        const segType: number = intEnc.decode(segment.substr(0, BitLength.segmentType));

        if (!segmentEncMap.has(segType)) {

          throw new DecodingError(`Unknown Segment Type: ${segType}`);

        }
        segEncClass = segmentEncMap.get(segType) as TCModelEncoder;

      }

      const segEnc: Encoder<TCModel> = new segEncClass();

      segEnc.decode(segment, tcModel);

    }

    return tcModel;

  }

}
