/**
 * class for General GVL Errors
 *
 * @extends {Error}
 */
class GVLError extends Error {

  /**
   * constructor - constructs a GVLError
   *
   * @param {string} msg - Error message to display
   * @return {undefined}
   */
  public constructor(msg: string) {

    super(msg);
    this.name = 'GVLError';

  }

}

export {GVLError};
