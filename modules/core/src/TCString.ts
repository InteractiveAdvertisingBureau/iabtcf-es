import {
  Base64Url,
  BitLength,
  SegmentEncoder,
  SegmentSequence,
} from './encoder';

import {EncodingError} from './errors';
import {IntEncoder} from './encoder/field/IntEncoder';
import {Fields, Segments} from './model';
import {TCModel} from './TCModel';

/**
 * Main class for encoding and decoding a
 * TCF Transparency and Consent String
 */
export class TCString {

  private static preEncode(tcModel: TCModel, includeDisclosedVendors: boolean): TCModel | never {

    tcModel = tcModel.clone();

    if (!tcModel.gvl) {

      throw new EncodingError('Unable to encode TCModel without a GVL');

    }

    if (!tcModel.isServiceSpecific || includeDisclosedVendors) {

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

    return tcModel;

  }

  /**
   * encodes a model into a TCString
   *
   * @param {TCModel} tcModel - model to convert into encoded string
   * @param {boolean} isForSaving = false - Defaults to false.  Whether a TC
   * String is meant for storage (true) or meant to be handed to AdTech through
   * the tcfapi (true).  This will modify which segments are handed back with
   * the string.
   * @param {boolean} includeDisclosedVendors - whether or not to include
   * disclosedVendors when the serviceSpecific flag is true
   * @return {string} - base64url encoded Transparency and Consent String
   */
  public static encode(tcModel: TCModel, isForSaving = false, includeDisclosedVendors = false): string {

    tcModel = this.preEncode(tcModel, includeDisclosedVendors);

    let out = '';
    const segSequence: SegmentSequence = new SegmentSequence(tcModel, isForSaving, includeDisclosedVendors);
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
