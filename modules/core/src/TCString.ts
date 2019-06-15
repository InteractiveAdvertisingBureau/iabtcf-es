import {Encoder} from './tcstring/Encoder';
import {Decoder} from './tcstring/Decoder';
import {TCModel} from './TCModel';

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

    const encoder: Encoder = new Encoder();

    return encoder.encode(tcModel);

  }

  /**
   * Decodes a string into a TCModel
   *
   * @param {string} encodedString - web-safe base64 encoded Transparency and Consent String to decode
   * @return {TCModel}
   */
  public static decode(encodedString: string) {

    return Decoder.decode(encodedString);

  }

}

export {TCString};
