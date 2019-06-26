/**
 * class for decoding errors
 *
 * @extends {Error}
 */
class DecodingError extends Error {

  /**
   * constructor - constructs an DecodingError
   *
   * @param {string} msg - Decoding Error Message
   * @return {undefined}
   */
  public constructor(msg: string) {

    super(msg);
    this.name = 'DecodingError';

  }

}

export {DecodingError};
