// import ConsentData from 'models/ConsentData';
import PingReturn from 'models/PingReturn';
import VendorConsents from 'models/VendorConsents';

const WINDOW_REF = '__tcfapi';

/**
 * CmpApi Creates the on-page CMP API
 * methods:
 * getVendorConsents
 * ping
 * getInAppConsentData
 * getVendorList
 */
class CmpApi {

  /**
   * constructor constructs the API
   *
   * @return {undefined}
   */
  constructor() {

    let consentString;
    let hasGlobalScope;
    let gdprApplies;
    let gdprAppliesGlobally;

    const allAreDefined = (...items) => {

      const len = items.length;
      let retr = true;

      for (let i = 0; i < len && retr; i ++) {

        retr = (items[i] !== undefined && items[i] !== null);

      }

      return retr;

    };
    const waitingForThingsQueue = [];
    const purgeWaitingFor = () => {

      /**
     * capture length as an independent variable because we don't
     * want it to update since this queue will be added to as we
     * process it here
     */
      const len = waitingForThingsQueue.length;

      /**
       * if there's nothing in it, just skip this.  I didn't want it
       * to try and slice the end off a 0 length queue.  Might be ok
       * but I didn't try it
       */
      if (len > 0) {

        for (let i = 0; i < len; i++) {

          /**
         * first paraemeter is the "command", so we'll call that "method" I'm
         * not checking here if we actually have that method because that is
         * checked before being pushed into the queue.  The next parameters
         * we'll pass along, there should also at minimum be a callback since
         * each function checks for it
         */
          const dequeued = waitingForThingsQueue[i];
          const methodName = dequeued[0];

          methods[methodName].fn.apply(null, dequeued.slice(1));

        }

        /**
       * since running these functions might add to the queue again,
       * I'm going remove the queued functions we already ran
       */
        waitingForThingsQueue = waitingForThingsQueue.slice(len);

      }

    };
    const methods = {

      getVendorConsents: {
        /**
         * @param {array} vendorIds -  The vendorIds array contains the vendor
         * ids (as identified in the global vendor list) for which transparency
         * and consent is being requested. If vendorIds is null or empty, the
         * operation will return dataconsent status for all vendors in the
         * vendor list, unless gdprApplies equals false.
         *
         * @param {function} callback - will be called with a VendorConsents
         * object as the parameter. If vendorIds is provided and not empty,
         * then VendorConsents.vendorConsents will only included IDs from
         * vendorIds.  The callback is called: a) immediately and without any
         * asynchronous logic (e.g.  promises) if the TC string is already
         * present for the CMP or b) only after the TC string has been created
         * by the CMP (e.g. due to user interaction that made it possible for
         * the CMP to create a new TC string).
         *
         * The consent and legitimate interest signal will be returned false
         * (“No Consent” and “No Legitimate Interest Established”) for any
         * invalid vendorId. The boolean success parameter passed to the
         * callback indicates whether the call to getVendorConsents() was
         * successful.
         */
        fn(vendorIds, callback) {

          if (allAreDefined(consentString, gdprApplies, hasGlobalScope)) {

            const hollaBack = () => {

              callback(VendorConsents.create({
                consentString: consentString,
                gdprApplies: gdprApplies,
                hasGlobalScope: hasGlobalScope,
                vendors: consentString.vendorList.vendors,
                subset: vendorIds,
              }), true);

            };

            if (consentString.vendorList) {

              hollaBack();

            } else {

              methods.getVendorList(
                consentString.getVendorListVersion(), (gvl) => {

                  consentString.setGlobalVendorList(gvl);
                  hollaBack();

                });

            }

          } else {

            waitingForThingsQueue.push([
              'getVendorConsents',
              vendorIds,
              callback,
            ]);

          }

        },
      },

      getInAppConsentData: {
        /**
         * @param {null} ignored -  no parameter is necessary here, this is
         * just a place holder because fo the format of the TCF CMP API
         *
         * @param {inAppConsentDataCallback} callback
         *
         * @callback inAppConsentDataCallback - Callback executed when the
         * information is available
         * @param {InAppConsentData} inAppConsentData
         *
         * @typedef {InAppConsentData}
         * @property {string} consentData - web-safe base64 encoded consent string
         * @property {boolean} gdprApplies - Whether GDPR applies,
         * @property {VendorConsents} vendorConsents
         * @property {object} vendorLIStatus - tcString.getParsedLIStatus(),
         * @property {string} purposeConsents - tcString.getParsedPurposeConsents(),
         * @property {string} purposeLIStatus - tcString.getParsedLIPurposeStatus(),
         * @property {string} publisherRestrictions - tcString.getPublisherRestrictions(),
         * @property {string} checksum - tcString.getChecksum(),
         * @property {boolean} usesNonStandardStacks - tcString.getUsesNonStandardStacks(),
         *
         * @typedef {VendorConsents}
         * @property {} vendorId - the vendorId
         *
         * @param {boolean} success - whether or not this call succeeded
         */
        fn(ignored, callback) {

          if (allAreDefined(consentString, gdprApplies, hasGlobalScope)) {

            const hollaBack = () => {

              callback(VendorConsents.create({
                consentString: consentString,
                gdprApplies: gdprApplies,
                hasGlobalScope: hasGlobalScope,
                vendors: consentString.vendorList.vendors,
                subset: vendorIds,
              }), true);

            };

            if (consentString.vendorList) {

              hollaBack();

            } else {

              methods.getVendorList(
                consentString.getVendorListVersion(), (gvl) => {

                  consentString.setGlobalVendorList(gvl);
                  hollaBack();

                });

            }

          } else {

            waitingForThingsQueue.push([
              'getVendorConsents',
              vendorIds,
              callback,
            ]);

          }

        },
      },

      getVendorList: {
        /*
         * @param {string} versionId - If the it is null, the vendor list for
         * the VendorListVersion in the current consent string is returned. If
         * no consent string value is currently set, the latest version of the
         * vendor list is returned. If the vendorListVersion value is "LATEST",
         * the latest version available is returned. If the versionId is
         * invalid, the callback function will be called with 'null' as the
         * first argument and false as the success argument. The boolean
         * success parameter passed to the callback indicates whether the call
         * to getVendorList() was successful.
         *
         * @param {function} callback - will be called with the
         * GlobalVendorList parameter being the vendor list object of the
         * requested version.
         */
        fn(versionId, callback) {

          const gvlLoader = new GVLLoader();

          // is a valid versionId
          if (versionId === undefined || versionId === null || versionId > 0) {

            switch (versionId) {

              case undefined:
              case null:

                if (consentString) {

                  if (consentString.vendorList) {

                    callback(consentString.vendorList, true);
                  } else {

                    const version = consentString.getVendorListVersion();

                    gvlLoader.load(version).then((gvl) => {

                      callback(gvl, true);
                    }, (err) => callback(null, false));
                  }
                } else {

                  gvlLoader.load().then((gvl) => {

                    callback(gvl, true);
                  }, (err) => callback(null, false));
                }
                break;
              case 'LATEST':

                gvlLoader.load().then((gvl) => {

                  callback(gvl, true);
                }, (err) => callback(null, false));
                break;
              default:

                gvlLoader.load(versionId).then((gvl) => {

                  callback(gvl, true);
                }, (err) => callback(null, false));

            }

          } else {

            callback(null, false);

          }

        },
      },

      ping: {
        /**
         * @param {null} ignored - Not used for this method but needs a place
         * holder
         *
         * @param {pingCallback} callback - always executed synchronously
         *
         * @callback pingCallback
         * @typedef {object} PingReturn
         * @property {boolean} gdprAppliesGlobally - true if publisher has
         * configured CMP to apply GDPR to all (including non-EU) visitors
         * @property {boolean} cmpLoaded - true if CMP main script is loaded,
         * false if still running stub
         * @property {string} cmpStatus -
         *    "stubCMP" - not yet started to load, the stub is still in place.
         *    "loading" - CMP is loading
         *    "loaded" - CMP finished loading
         *    "error" - CMP detected an error
         */
        fn(ignored, callback) {

          if (allAreDefined(gdprAppliesGlobally)) {

            const pingReturn = new PingReturn({
              apiVersion: '2.0',
              cmpVersion: /* TODO*/'',
              gvlVersion: /* TODO*/1,
              policyVersion: 2, /* TODO*/
            });

            callback(pingReturn.create({
              gdprAppliesGlobally: gdprAppliesGlobally,
              cmpStatus: cmpStatus,
              displayStatus: displayStatus,
            }), true);

          } else {

            waitingForThingsQueue.push(['ping', callback]);

          }

        },
      },
    };

    let oldQueue;
    const api = window[WINDOW_REF];

    if (api !== undefined && Array.isArray(api.a)) {

      oldQueue = api.a;

    }

    window[WINDOW_REF] = (command, param, version, callback) => {

      const method = methods[command];

      // Do we even have a method like that?
      if (method) {

        // do we require a callback and has one been passed?
        if (method.needsCallback && !callback) {

          console.error(new Error(`${command} requires callback`));

        } else {

          methods[command].fn.call(self, param, callback);

        }

      } else {

        console.error(new Error(`${command} is not a supported command`));

      }

    };

    if (oldQueue) {

      oldQueue.forEach((item) => {

        api(...item);

      });

    }

    window.addEventListener('message', cmpMsgHandler, false);


    /**
     * @param {string} name - name of the method @param {string} def -
     * function body to execute Custom methods can be added, however let it be
     * known that you may overwrite the base level methods and also there is
     * not checking of arguments like parenting, sometimes you have to let
     * people make their own mistakes and learn from the consequences...
     * @param {function} def - function definition to call whenever this
     * new method is called
     * @param {boolean} requiresCallback - Boolean of whether or not this
     * function requires a callback to be valid
     */
    this.addMethod = (name, def, requiresCallback=true) => {

      methods[name] = {fn: def, needsCallback: requiresCallback};

    };
    /**
     * @param {boolean} bool - true if the vendor consent data is retrieved from
     * the globally-shared cookie, false if a publisher-specific (or
     * publisher-group-specific) cookie
     */
    this.setHasGlobalScope = (bool) => {

      hasGlobalScope = bool;
      purgeWaitingFor();

    };
    /**
     * @param {boolean} bool - true if the user is determined (by geo-IP lookup)
     * to be in the EU, or the publisher has configured the CMP (via a
     * CMP-specific method not specified by this spec) that they are a EU
     * publisher and thus the CMP UI should be shown for everyone.
     */
    this.setGdprApplies = (bool) => {

      gdprApplies = bool;
      purgeWaitingFor();

    };
    /**
   * @param {boolean} bool - true if publisher has configured CMP to apply GDPR
   * to all (including non-EU) visitors
   */
    this.setGdprAppliesGlobally = (bool) => {

      gdprAppliesGlobally = bool;
      purgeWaitingFor();

    };
    /**
     * @param {tcString} tcStringSDK - instance of the current
     * working tcString object
     */
    this.setTCString = (tcStringSDK) => {

      tcString = tcStringSDK;
      purgeWaitingFor();

    };

  }

};
export {CmpApi};
