/**
 * An enum representing all the possible statuses for the displayStatus
 * returned through the CMP API
 *
 * @readonly
 * @enum {string}
 */

export enum DisplayStatus {
  /**
   * User interface is currently displayed
   * @type {string}
   */
  VISIBLE = 'visible',
  /**
   * User interface is not yet or no longer displayed
   * @type {string}
   */
  HIDDEN = 'hidden',
  /**
   * User interface will not show (e.g. GDPR does not apply or TC data is current and does not need renewal)
   * @type {string}
   */
  DISABLED = 'disabled',
}
