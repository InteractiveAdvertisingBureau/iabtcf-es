import TCStringEncoder from 'TCStringEncoder';
import TCStringDecoder from 'TCStringDecoder';

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
  static encode(tcModel) {
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
  static decode(encodedString) {
    const decoder = new TCStringDecoder(encodedString);
    return decoder.decode();
  }
}
export {TCString};
