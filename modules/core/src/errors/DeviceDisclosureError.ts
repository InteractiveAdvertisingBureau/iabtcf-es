/**
 * class for DeviceDisclosure fetching Errors
 * @extends {Error}
 */
export class DeviceDisclosureError extends Error {

  /**
   * @param {string} msg - Error message to display
   */
  public constructor(msg: string) {

    super(msg);
    this.name = 'DeviceDisclosureError';

  }

}
