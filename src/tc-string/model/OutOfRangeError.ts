/**
 *  class for Out of range errors.  Extends an error class
 *
 * @extends {Error}
 */
export default class extends Error {
  /**
   * constructor
   *
   * @param {string} fieldName - name of field to display in message
   * @return {undefined}
   */
  constructor(fieldName) {
    super(fieldName + ' value out of range');
    this.name = 'OutOfRangeError';
  }
}
