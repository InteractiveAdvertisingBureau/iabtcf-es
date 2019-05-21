import isAFunction from '../../utils/IsAType';
import CmpApiModel from '../model/CmpApiModel';

/**
 * @classdesc Abstract class for CMP API methods
 * @class
 */
class Method {
  /**
   * @constructor
   *
   * @param {function} callback - method to be invoked when Method completes
   * its work
   * @typedef CmpApiModel
   * @param {CmpApiModel} model
   * @return {undefined}
   */
  constructor(callback, model) {
    if (isAFunction(callback)) {
      throw new Error('Invalid (or undefined) Callback!');
    }
    this._cb = callback;
  }

  /**
   * allAreDefined
   *
   * @protected
   * @param {any} [...items] - items to check
   * @return {boolean}
   */
  allAreDefined(...items) {
    const len = items.length;
    let retr = true;

    for (let i = 0; i < len && retr; i ++) {
      retr = (items[i] !== undefined && items[i] !== null);
    }

    return retr;
  }
}
export {Method};
