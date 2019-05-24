/** A class representing the InAppConsentData object */
declare class InAppConsentData {
    /**
     * creates the InAppConsentData object specified by the TCF
     *
     * @param {tcString} tcString - latest working instance of the tcString
     * object that is a part of this SDK
     * @param {boolean} gdprApplies - true if the user is determined (by geo-IP
     * lookup) to be in the EU, or the publisher has configured the CMP (via a
     * CMP-specific method not specified by this spec) that they are a EU
     * publisher and thus the CMP UI should be shown for everyone.
     *
     * @return {object} InAppConsentData - This object contains the parsed binary
     * string representations (“1010101”) of the follow vectors:
     *    - Vendor Consents
     *    - Vendor Legitimate Interest Status
     *    - Purpose Consents
     *    - Purpose Legitimate Interest Status
     * As well as passing the gdprApplies flag and the whole TC String back.
     */
    create({ tcString, gdprApplies }: {
        tcString: any;
        gdprApplies: any;
    }): {
        consentData: any;
        gdprApplies: any;
        vendorConsents: any;
        vendorLIStatus: any;
        purposeConsents: any;
        purposeLIStatus: any;
        publisherRestrictions: any;
        checksum: any;
        usesNonStandardStacks: any;
    };
}
export default InAppConsentData;
