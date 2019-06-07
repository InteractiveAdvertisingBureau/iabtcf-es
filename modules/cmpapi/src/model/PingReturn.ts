let _apiVersion;
let _cmpVersion;
let _gvlVersion;
let _policyVersion;

/** A class representing the PingReturn object specified by the TCF */
class PingReturn {

  /**
   * varioud versions can be passed into the function in the constructor
   * because they won't change for the lifecycle of the app
   *
   * @param {string} apiVersion - version of the CMP API that is supported
   * @param {string} cmpVersion - CMPs own/internal version that is
   * currently running
   * @param {int} gvlVersion - Version of the GVL currently loaded by the CMP
   * @param {int} policyVersion - Number of the supported TCF version
   */
  constructor({apiVersion, cmpVersion, gvlVersion, policyVersion}) {

    _apiVersion = apiVersion;
    _cmpVersion = cmpVersion;
    _gvlVersion = gvlVersion;
    _policyVersion = policyVersion;

  }

  /**
   * creates the PingReturn object
   * @param {boolean} gdprAppliesGlobally -  true if publisher has configured
   * CMP to apply GDPR to all (including non-EU) visitors
   * @param {string} cmpStatus -
   *    - "stubCMP" - not yet started to load, the stub is still in place.
   *    - "loading" - CMP is loading
   *    - "loaded" - CMP finished loading
   *    - "error" - CMP detected an error
   * @param {string} displayStatus -
   *    - "visible" - User interface is currently displayed
   *    - "hidden" - User interface is not yet/no longer displayed
   *    - "disabled" - User interface will not show (e.g. non-EU
   *                   or consent already exists)
   *
   * @return {object} PingReturn - This object contains information about the
   * loading status and configuration of the CMP.
   */
  create({gdprAppliesGlobally, cmpStatus, displayStatus}) {

    return {
      gdprAppliesGlobally: gdprAppliesGlobally,
      cmpLoaded: true,
      cmpStatus: cmpStatus,
      displayStatus: displayStatus,
      apiVersion: _apiVersion,
      cmpVersion: _cmpVersion,
      gvlVersion: _gvlVersion,
      policyVersion: _policyVersion,
    };

  }

};
export default PingReturn;
