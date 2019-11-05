import {

  Encoder,
  BitLength,
  IntEncoder,
  SegmentEncoderMap,
  SegmentSequence,
  SegmentType,
  Base64Url,
} from './encoder';

import {TCModel} from './TCModel';

/**
 * Main class for encoding and decoding a
 * TCF Transparency and Consent String
 */
export class TCString implements Encoder<TCModel> {

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

      const encoder: Encoder<TCModel> = new segEncMap[segName]();
      const encoded: string = encoder.encode(tcModel, segName);

      if (encoded) {

        stringSegments.push(encoded);

      }

    });

    return stringSegments.join('.');

  }

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
  public encode(tcModel: TCModel, isForSaving: boolean = false): string {

    return TCString.encode(tcModel, isForSaving);

  }

  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedString - base64url encoded Transparency and
   * Consent String to decode
   * @return {TCModel} - Returns populated TCModel
   */
  public static decode(encodedString: string): TCModel {

    const base64Url: Base64Url = new Base64Url();
    const tcModel: TCModel = new TCModel();
    const intEnc: IntEncoder = new IntEncoder();
    const segments: string[] = encodedString.split('.');
    const segMap: SegmentEncoderMap = new SegmentEncoderMap();
    const len: number = segments.length;

    for (let i = 0; i < len; i ++) {

      const segment: string = segments[i];
      let encoder: Encoder<TCModel>;

      // first is always core
      if ( i === 0 ) {

        encoder = new segMap.core();

      } else {

        // first char will contain 6 bits, we only need the first 3
        const firstChar: string = base64Url.decode(segment.charAt(0));
        const segTypeBits: string = firstChar.substr(0, BitLength.segmentType);
        const segType: string = intEnc.decode(segTypeBits).toString();

        encoder = new segMap[SegmentType[segType]]();

      }

      encoder.decode(segment, tcModel);

    }

    return tcModel;

  }
  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedString - base64url encoded Transparency and
   * Consent String to decode
   * @return {TCModel} - Returns populated TCModel
   */
  public decode(encodedString: string): TCModel {

    return TCString.decode(encodedString);

  }

}
