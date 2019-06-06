import {TCModel} from './TCModel';

class Decoder {

  /**
   * @param {string} encodedString - web-safe base64 encoded Transparency and Consent String to decode
   * @return {TCModel} - Returns populated TCModel
   */
  public static decode(encodedString: string) {

    const tcModel = new TCModel();

    // populate it

    return tcModel;

  }

}

export {Decoder};
