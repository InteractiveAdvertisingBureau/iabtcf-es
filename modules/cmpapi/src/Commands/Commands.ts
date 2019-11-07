/**
 * An enum representing all mandatory commands the CMP API must provide
 *
 * @readonly
 * @enum {string}
 */
export enum Commands {
  PING = 'ping',
  GET_TC_DATA = 'getTCData',
  GET_IN_APP_TC_DATA = 'getInAppTCData',
  GET_VENDOR_LIST = 'getVendorList',
  ADD_EVENT_LISTENER = 'addEventListener',
  REMOVE_EVENT_LISTENER = 'removeEventListener',
}
