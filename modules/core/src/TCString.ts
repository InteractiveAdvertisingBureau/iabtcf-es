import {

  Encoder,
  BitLength,
  IntEncoder,
  SegmentEncoderMap,
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
   * @type {TCModel}
   * @param {TCModel} tcModel - model to convert into encoded string
   * @return {string} - base64url encoded Transparency and Consent String
   */
  public encode(tcModel: TCModel): string {

    let retrString = '';
    const segEncMap: SegmentEncoderMap = new SegmentEncoderMap();
    const len = SegmentType.numTypes;

    for (let i = 0; i < len; i ++) {

      const encoder: Encoder<TCModel> = new segEncMap[SegmentType[i.toString()]]();
      const dotOrNot: string = (i < len - 1) ? '.' : '';
      const encoded: string = encoder.encode(tcModel);

      if (encoded) {

        retrString += encoded + dotOrNot;

      }

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
        const firstCharBits: string = base64Url.decode(segment.charAt(0));
        const segTypeBits: string = firstCharBits.substr(0, BitLength.segmentType);
        const segType: string = intEnc.decode(segTypeBits).toString();
        
        encoder = new segMap[SegmentType[segType]]();

      }

      encoder.decode(segment, tcModel);

    }

    return tcModel;

  }

}
