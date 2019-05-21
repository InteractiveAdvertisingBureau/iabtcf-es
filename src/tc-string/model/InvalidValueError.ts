/**
 * class for invalid values passed.  extends error class
 *
 * @extends {Error}
 */
class InvalidValueError extends Error {
  /**
   * constructor - constructs an InvalidValueError
   *
   * @param {string} fieldName - field name to display in the error message
   * @return {undefined}
   */
  constructor(fieldName) {
    super('Invalid value passed for ' + fieldName);
    this.name = 'InvalidValueError';
  }
}
export {InvalidValueError};
