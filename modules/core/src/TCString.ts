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

  /**
   * encodes a model into a TCString
   *
   * @param {TCModel} tcModel - model to convert into encoded string
   * @param {EncodingOptions} options - for encoding options other than default
   * @return {string} - base64url encoded Transparency and Consent String
   */
  public static encode(tcModel: TCModel, options?: EncodingOptions): string {

    let out = '';
    let sequence: Segment[];

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

    if (options && options.version === 1) {

      tcModel.version = 1;

    } else {

      tcModel.version = TCString.MAX_ENCODING_VERSION;

    }

    /**
     * If they pass in a special segment sequence.
     */
    if (options && Array.isArray(options.segments)) {

      sequence = options.segments;

    } else {

      const segSequence: SegmentSequence = new SegmentSequence(tcModel, options);
      sequence = segSequence[''+tcModel.version];

    }

    sequence.forEach((segment: Segment, idx: number): void => {

      let dotMaybe = '';

      if (idx < sequence.length - 1) {

        dotMaybe = '.';

      }

      out += SegmentEncoder.encode(tcModel, segment) + dotMaybe;

    });

    return out;

  }

  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedTCString - base64url encoded Transparency and
   * Consent String to decode - can also be a single or group of segments of
   * the string
   * @param {string} [tcModel] - model to enhance with the information.  If
   * none is passed a new instance of TCModel will be created.
   * @return {TCModel} - Returns populated TCModel
   */
  public static decode(encodedTCString: string, tcModel?: TCModel): TCModel {

    const segments: string[] = encodedTCString.split('.');
    const len: number = segments.length;

    if (!tcModel) {

      tcModel = new TCModel();

    }

    for (let i = 0; i < len; i ++) {

      const segString: string = segments[i];

      /**
       * first char will contain 6 bits, we only need the first 3. In version 1
       * and 2 of the TC string there is no segment type for the CORE string.
       * Instead the first 6 bits are reserved for the encoding version, but
       * because we're only on a maximum of encoding version 2 the first 3 bits
       * in the core segment will evaluate to 0.
       */
      const firstChar: string = Base64Url.decode(segString.charAt(0));
      const segTypeBits: string = firstChar.substr(0, BitLength.segmentType);
      const segment = SegmentIDs.ID_TO_KEY[IntEncoder.decode(segTypeBits).toString()];

      SegmentEncoder.decode(segString, tcModel, segment);

    }

    return tcModel;

  }

}
