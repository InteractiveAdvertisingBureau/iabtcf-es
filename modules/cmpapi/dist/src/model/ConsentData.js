/** A class representing the ConsentData object */
class ConsentData {
    /**
     * creates the ConsentData object specified by the TCF
     *
     * @param {tcString} tcString - latest working instance of the tcString
     * object that is a part of this SDK
     * @param {boolean} gdprApplies - true if the user is determined (by geo-IP
     * lookup) to be in the EU, or the publisher has configured the CMP (via a
     * CMP-specific method not specified by this spec) that they are a EU
     * publisher and thus the CMP UI should be shown for everyone.
     * @param {boolean} hasGlobalScope - true if using a global TC string false if
     * from a using a service-specific or publisher-specific TC string
     *
     * @return {object} ConsentData - This object contains the entire
     * base64url-encoded TC string
     */
    create({ tcString, gdprApplies, hasGlobalScope }) {
        return {
            consentData: tcString.getString(),
            gdprApplies: gdprApplies,
            hasGlobalScope: hasGlobalScope,
        };
    }
}
export default ConsentData;
