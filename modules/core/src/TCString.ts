import {
  Base64Url,
  BitLength,
  EncodingOptions,
  SegmentEncoder,
  SegmentSequence,
} from './encoder';

import {EncodingError} from './errors';
import {IntEncoder} from './encoder/field/IntEncoder';
import {Fields, Segment, SegmentIDs} from './model';
import {TCModel} from './TCModel';

/**
 * Main class for encoding and decoding a
 * TCF Transparency and Consent String
 */
export class TCString {

  private static readonly MAX_ENCODING_VERSION: number = 2;
  private static preEncode(tcModel: TCModel): TCModel | never {

    tcModel = tcModel.clone();

    if (!tcModel.gvl) {

      throw new EncodingError('Unable to encode TCModel without a GVL');

    }

    /**
     * Purpose 1 is never allowed to be true for legitimate interest
     */
    if (tcModel[Fields.purposeLegitimateInterests].has(1)) {

      tcModel[Fields.purposeLegitimateInterests].unset(1);

    }

    if (!tcModel[Fields.isServiceSpecific]) {

      /**
       * Sets vendorsDisclosed
       *
       * If this is a globally-scoped string (not service-specific) or they
       * want to explicitly include it then we will set the vendorsDisclosed
       * segement with all the vendors that were disclosed to the user
       */

      const vIds: number[] = Object.keys(tcModel.gvl.vendors).map((vId: string): number => parseInt(vId, 10));
      tcModel[Fields.vendorsDisclosed].set(vIds);

    }

    tcModel['version_'] = TCString.MAX_ENCODING_VERSION;

    return tcModel;

  }

  /**
   * encodes a model into a TCString
   *
   * @param {TCModel} tcModel - model to convert into encoded string
   * @param {EncodingOptions} options - for encoding options other than default
   * @return {string} - base64url encoded Transparency and Consent String
   */
  public static encode(tcModel: TCModel, options?: EncodingOptions): string {

    tcModel = this.preEncode(tcModel);

    let out = '';
    let sequence: Segment[];

    /**
     * If they pass in a special segment sequence.  The only requirement we
     * have here is that the CORE string is first if it's included. So first we
     * check that the segments option exists and is an array then if it
     * contains the CORE segment then move it to the front of the sequence
     */
    if (options && Array.isArray(options.segments)) {

      if (options.segments[0] !== Segment.CORE) {

        for (let i =0; i< options.segments.length; i ++) {

          if (options.segments[i] === Segment.CORE) {

            options.segments.splice(i, 1);
            options.segments.unshift(Segment.CORE);

          }

        }

      }

      sequence = options.segments;

    } else {

      const segSequence: SegmentSequence = new SegmentSequence(tcModel, TCString.MAX_ENCODING_VERSION, options);
      sequence = segSequence[''+TCString.MAX_ENCODING_VERSION];

    }

    const len: number = sequence.length;

    for (let i = 0; i < len; i ++) {

      let dotMaybe = '';

      if (i < len - 1) {

        dotMaybe = '.';

      }

      out += SegmentEncoder.encode(tcModel, ''+TCString.MAX_ENCODING_VERSION, sequence[i]) + dotMaybe;

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
      let segment: Segment;

      // first is always core
      if ( i === 0 ) {

        segment = Segment.CORE;

      } else {

        // first char will contain 6 bits, we only need the first 3
        const firstChar: string = Base64Url.decode(segString.charAt(0));
        const segTypeBits: string = firstChar.substr(0, BitLength.segmentType);

        segment = SegmentIDs.ID_TO_KEY[IntEncoder.decode(segTypeBits).toString()];

      }

      SegmentEncoder.decode(segString, tcModel, ''+TCString.MAX_ENCODING_VERSION, segment);

    }

    return tcModel;

  }

}
