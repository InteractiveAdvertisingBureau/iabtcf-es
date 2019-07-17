import {Encoder} from './encoder/Encoder';
import {BitLength} from './encoder/BitLength';
import {IntEncoder} from './encoder/IntEncoder';
import {Segments} from './encoder/Segments';
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

    this.forEachSegment(tcModel.version, (segmentEncoder: Encoder<TCModel>, isLast: boolean): void => {

      retrString += segmentEncoder.encode(tcModel) + (!isLast) ? '.' : '';

    });

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

    this.forEachSegment(version, (segmentEncoder: Encoder<TCModel>, isLast: boolean): void => {
    });

    return tcModel;

  }

  private forEachSegment(version: number, callback: (encoder: Encoder<TCModel>, isLast: boolean) => void): void {

    const segments: object[] = Segments[version.toString()];

    for (let i = 0; i < segments.length; i ++) {

      const segmentEncoder: Encoder<TCModel> = segments[i] as Encoder<TCModel>;

      callback(segmentEncoder, i === segments.length - 1);

    }

  }

}
