import DecodingError from 'model/DecodingError';

/**
 * @class
 */
class TCStringEncoder {
  /**
   * @param {string} encodedString - model to convert into encoded string
   */
  constructor(encodedString) {
    if (!isAString(encodedString)) {
      throw new DecodingError('decode value must be a string');
    }
    /**
    * @private
    * @const {!encodedString}
    * */
    this.encodedString_ = encodedString;
  }
  /**
   * getString
   *
   * @return {string} - web-safe base64 encoded Transparency and Consent String
   */
  decode() {
    const tcModel = new TCModel();

    // populate it

    return tcModel;
    return '';
  }
}
export {TCStringEncoder};
