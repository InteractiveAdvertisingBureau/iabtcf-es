/**
 * class for decoding errors
 *
 * @extends {Error}
 */
class TCModelError extends Error {

  /**
   * constructor - constructs an TCModelError
   *
   * @param {string} fieldName - the errored field
   * @param {string} passedValue - what was passed
   * @return {undefined}
   */

  public constructor(fieldName: string, passedValue: any, msg: string = '') { // eslint-disable-line 

    super(`invalid value ${passedValue} passed for ${fieldName} ${msg}`);
    this.name = 'TCModelError';

  }

}

export {TCModelError};
