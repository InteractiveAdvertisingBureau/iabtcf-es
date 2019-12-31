import {
  BitLength,
  SegmentEncoder,
  SegmentSequence,
  Base64Url,
} from './encoder';

import {IntEncoder} from './encoder/field/IntEncoder';
import {TCModel} from './TCModel';
import {Segments} from './model';

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
  public static encode(tcModel: TCModel, isForSaving?: boolean): string {

    let out = '';
    const segSequence: SegmentSequence = new SegmentSequence(tcModel, !!isForSaving);
    const sequence: string[] = segSequence[tcModel.version.toString()];

    const len: number = sequence.length;

    for (let i = 0; i < len; i ++) {

      let dotMaybe = '';

      if (i < len - 1) {

        dotMaybe = '.';

      }

      out += SegmentEncoder.encode(tcModel, sequence[i]) + dotMaybe;

    }

    return out;

  }

  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedTCString - base64url encoded Transparency and
   * Consent String to decode
   * @return {TCModel} - Returns populated TCModel
   */
  public static decode(encodedTCString: string): TCModel {

    const tcModel: TCModel = new TCModel();
    const segments: string[] = encodedTCString.split('.');
    const len: number = segments.length;

    for (let i = 0; i < len; i ++) {

      const segString: string = segments[i];
      let segment: string;

      // first is always core
      if ( i === 0 ) {

        segment = Segments.core;

      } else {

        // first char will contain 6 bits, we only need the first 3
        const firstChar: string = Base64Url.decode(segString.charAt(0));
        const segTypeBits: string = firstChar.substr(0, BitLength.segmentType);

        segment = Segments.ID_TO_KEY[IntEncoder.decode(segTypeBits).toString()];

      }

      SegmentEncoder.decode(segString, tcModel, segment);

    }

    return tcModel;

  }

}
