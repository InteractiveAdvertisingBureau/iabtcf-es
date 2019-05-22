import {EncodingError} from 'errors/EncodingError';
import {TCModel} from 'model/TCModel';

class TCStringEncoder {

  private tcModel: TCModel;

  /**
   * @type {TCModel}
   * @param {TCModel} tcModel - model to convert into encoded string
   */
  public constructor(tcModel: TCModel) {

    if ((tcModel instanceof TCModel)) {

      throw new EncodingError('TCModel required to encode a TCString');

    }

    /**
    * @private
    * @const {!tcModel}
    * */
    this.tcModel = tcModel;

  }
  /**
   * @return {string} - web-safe base64 encoded Transparency and Consent String
   */
  public encode(): string {

    return '';

  }

}

export {TCStringEncoder};
