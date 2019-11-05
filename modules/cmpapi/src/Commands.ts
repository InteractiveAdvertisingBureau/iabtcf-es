/**
 * An enum representing all mandatory commands the CMP API must provide
 *
 * @readonly
 * @enum {string}
 */
export enum Commands {
  PING = 'ping',
  GET_TC_DATA = 'getTCData',
  ADD_EVENT_LISTENER = 'addEventListener',
  REMOVE_EVENT_LISTENER = 'removeEventListener',
}
