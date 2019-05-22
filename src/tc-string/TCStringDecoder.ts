import {TCModel} from 'model/TCModel';

class TCStringDecoder {

  private encodedString: string;

  /**
   * @param {string} encodedString - model to convert into encoded string
   */
  public constructor(encodedString: string) {

    this.encodedString = encodedString;

  }
  /**
   * @return {string} - web-safe base64 encoded Transparency and Consent String
   */
  public decode(): TCModel {

    const tcModel = new TCModel();

    // populate it

    return tcModel;

  }

}

export {TCStringDecoder};
