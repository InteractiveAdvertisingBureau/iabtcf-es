import {TCStringEncoder} from './TCStringEncoder';
import {TCStringDecoder} from './TCStringDecoder';
import {TCModel} from './model/TCModel';

/**
 * Main class for encoding and decoding a
 * TCF Transparency and Consent String
 */
class TCString {

  /**
   *  encodes a model into a TCString
   *
   * @type {TCModel}
   * @param {TCModel} tcModel - model to convert into encoded string
   * @return {string}
   */
  public static encode(tcModel: TCModel): string {

    const encoder = new TCStringEncoder(tcModel);

    return encoder.encode();

  }

  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedString - string to turn into a TCModel
   * @type {TCModel}
   * @return {TCModel}
   */
  public static decode(encodedString: string) {

    const decoder = new TCStringDecoder(encodedString);

    return decoder.decode();

  }

}

export {TCString};
