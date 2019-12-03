/**
 * An enum representing all the possible statuses for the cmpStatus returned
 * through the CMP API
 *
 * @readonly
 * @enum {string}
 */

export enum CmpStatus{
  /**
   * CMP not yet loaded – stub still in place
   * @type {string}
   */
  STUB = 'stubCMP',
  /**
   * CMP is loading
   * @type {string}
   */
  LOADING = 'loading',
  /**
   * CMP is finished loading
   * @type {string}
   */
  LOADED = 'loaded',
  /**
   * CMP is in an error state. A CMP shall not respond to any other API requests if this cmpStatus is present.
   * A CMP may set this status if, for any reason, it is unable to perform the operations in compliance with the TCF.
   * @type {string}
   */
  ERROR = 'error',
};
