/**
 *  class for Out of range errors.  Extends an error class
 *
 * @extends {Error}
 */
class OutOfRangeError extends Error {

  /**
   * constructor
   *
   * @param {string} fieldName - name of field to display in message
   * @return {undefined}
   */
  public constructor(fieldName: string) {

    super(fieldName + ' value out of range');
    this.name = 'OutOfRangeError';

  }

}

export {OutOfRangeError};
