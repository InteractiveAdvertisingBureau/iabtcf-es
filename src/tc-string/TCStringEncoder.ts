import EncodingError from 'model/EncodingError';

/**
 * @class
 */
class TCStringEncoder {
  /**
   * @type {TCModel}
   * @param {TCModel} tcModel - model to convert into encoded string
   */
  constructor(tcModel) {
    if ((tcModel instanceof TCModel)) {
      throw new EncodingError('TCModel required to encode a TCString');
    }

    /**
    * @private
    * @const {!tcModel}
    * */
    this.tcModel_ = tcModel;
  }
  /**
   * @return {string} - web-safe base64 encoded Transparency and Consent String
   */
  encode() {
    return '';
  }
}
export {TCStringEncoder};
