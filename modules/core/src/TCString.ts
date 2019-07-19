import {Encoder} from './encoder/Encoder';
import {BitLength} from './encoder/BitLength';
import {IntEncoder} from './encoder/IntEncoder';
import {SegmentEncoders} from './encoder/SegmentEncoders';
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
    const segmentEncoders: object[] = SegmentEncoders[tcModel.version.toString()];

    for (let i = 0; i < segmentEncoders.length; i ++) {

      const segmentEncoder: Encoder<TCModel> = segmentEncoders[i] as Encoder<TCModel>;

      retrString += segmentEncoder.encode(tcModel) + (i !== segmentEncoders.length - 1) ? '.' : '';

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
    const version: number = intEnc.decode(encodedString.substr(0, BitLength.version));
    const segmentStrings: string[] = encodedString.split('.');

    return tcModel;

  }

}
