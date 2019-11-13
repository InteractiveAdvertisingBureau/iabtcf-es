import {

  BitLength,
  IntEncoder,
  SegmentEncoderMap,
  SegmentSequence,
  SegmentType,
  Base64Url,

} from './encoder';

import {

  TCModel,

} from './TCModel';

/**
 * Main class for encoding and decoding a
 * TCF Transparency and Consent String
 */
export class TCString {

  /**
   *  encodes a model into a TCString
   *
   * @param {TCModel} tcModel - model to convert into encoded string
   * @param {boolean} isForSaving = false - Defaults to false.  Whether a TC
   * String is meant for storage (true) or meant to be handed to AdTech through
   * the tcfapi (true).  This will modify which segments are handed back with
   * the string.
   * @return {string} - base64url encoded Transparency and Consent String
   */
  public static encode(tcModel: TCModel, isForSaving: boolean = false): string {

    const stringSegments: string[] = [];
    const segEncMap: SegmentEncoderMap = new SegmentEncoderMap();
    const segSequence: SegmentSequence = new SegmentSequence(tcModel, isForSaving);
    const seq: string[] = segSequence[tcModel.version.toString()];

    seq.forEach((segName: string): void => {

      const encoder = segEncMap[segName];
      const encoded: string = encoder.encode(tcModel, segName);

      if (encoded) {

        stringSegments.push(encoded);

      }

    });

    return stringSegments.join('.');

  }

  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedString - base64url encoded Transparency and
   * Consent String to decode
   * @return {TCModel} - Returns populated TCModel
   */
  public static decode(encodedString: string): TCModel {

    const tcModel: TCModel = new TCModel();
    const segments: string[] = encodedString.split('.');
    const segMap: SegmentEncoderMap = new SegmentEncoderMap();
    const len: number = segments.length;

    for (let i = 0; i < len; i ++) {

      const segment: string = segments[i];
      let encoder;

      // first is always core
      if ( i === 0 ) {

        encoder = segMap.core;

      } else {

        // first char will contain 6 bits, we only need the first 3
        const firstChar: string = Base64Url.decode(segment.charAt(0));
        const segTypeBits: string = firstChar.substr(0, BitLength.segmentType);
        const segType: string = IntEncoder.decode(segTypeBits).toString();

        encoder = segMap[SegmentType[segType]];

      }

      encoder.decode(segment, tcModel);

    }

    return tcModel;

  }

}
