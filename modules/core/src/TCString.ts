import {Encoder} from './encoder/Encoder';
import {SegmentSequence} from './encoder/SegmentSequence';
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

    const segments: object[] = SegmentSequence[tcModel.version.toString()];
    let retrString = '';

    for (let i = 0; i < segments.length; i ++) {

      const segmentEncoder: Encoder<TCModel> = segments[i] as Encoder<TCModel>;

      retrString += segmentEncoder.encode(tcModel) + (i !== segments.length - 1) ? '.' : '';

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

    return tcModel;

  }

}
