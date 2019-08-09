/**
 * An enum representing all the possible statuses for the cmpStatus returned
 * through the CMP API
 *
 * @readonly
 * @enum {string}
 */
export default Object.freeze({
  STUB: 'stubCMP',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
});
