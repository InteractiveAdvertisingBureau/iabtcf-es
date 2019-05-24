/**
 * Class representing the data contained within the  Transparancy and Consent String as defined by the iab's
 * Transparency and Consent Framework v2.0
 */
class TCModel {
    /**
     * getVersion
     *
     * @return {number} version of the consent string encoding
     */
    getVersion() {
        return this.version;
    }
    /**
     * getCreated
     *
     * @return {Date} when this TC String was created
     */
    getCreated() {
        return this.created;
    }
    /**
     * getLastUpdated
     *
     * @return {Date} the last time the string was updated
     */
    getLastUpdated() {
        return this.lastUpdated;
    }
    /**
     * getCmpId - gets the Consent Manager Provider ID that last updated the TC
     * string
     *
     * @return {number} unique ID assigned to a Consent Manager Provider (CMP) by
     * the iab. This ID is encoded in the string. To register as a CMP please go
     * to https://register.consensu.org/CMP
     */
    getCmpId() {
        return this.cmpId;
    }
    /**
     * getCmpVersion - gets the Consent Manager Provider version. This is a CMP's
     * own internal versioning number.  Each change to an operating CMP should
     * receive a new version number, for logging proof of consent
     *
     * @return {number}
     */
    getCmpVersion() {
        return this.cmpVersion;
    }
    /**
     * setConsentScreen - sets the screen number in the CMP where consent was
     * given. The screen number is CMP and CmpVersion specific, and is for logging
     * proof of consent.(For example, a CMP could keep records so that a publisher
     * can request information about the context in which consent was gathered.)
     *
     * @param {number} num - number to set the consent screen to
     * @return {undefined}
     */
    setConsentScreen(num) {
        this.consentScreen = num;
    }
    /**
     * getConsentScreen - gets the screen number in the CMP where consent was
     * given. The screen number is CMP and CmpVersion specific, and is for logging
     * proof of consent.(For example, a CMP could keep records so that a publisher
     * can request information about the context in which consent was gathered.)
     *
     * @return {number}
     */
    getConsentScreen() {
        return this.consentScreen;
    }
    /**
     * setConsentLanguage - sets the Two-letter ISO639-1 language code in which
     * the CMP UI was presented.
     *
     * @param {string} twoLetterLangCode - two letter lowercase language code
     * eg. 'en' or 'fr', etc..
     * @return {undefined}
     */
    setConsentLanguage(twoLetterLangCode) {
        if (twoLetterLangCode.length === 2) {
            this.consentLanguage = twoLetterLangCode.toLowerCase();
        }
        else {
            throw new Error('Invalid ConsentLanguage');
        }
    }
    /**
     * getConsentLanguage - gets the Two-letter ISO639-1 language code in which
     * the CMP UI was presented.
     *
     * @return {string} two letter lowercase language code
     * eg. 'en' or 'fr', etc..
     */
    getConsentLanguage() {
        return this.consentLanguage;
    }
    /**
     * getVendorListVersion - gets the version of global vendor list used in most
     * recent TC string update. Global vendor list versions will be released
     * periodically.
     *
     * @return {number}
     */
    getVendorListVersion() {
        return this.vendorListVersion;
    }
    /**
     * getPolicyVersion - gets the value from the corresponding field in the GVL
     * that was used for obtaining consent. A new policy version invalidates
     * existing strings and requires CMPs to re-establish transparency and consent
     * from users. If a TC string’s policy version number is different from the
     * one from the latest GVL, the CMP must re-establish transparency and consent
     *
     * @return {number}
     */
    getPolicyVersion() {
        return this.policyVersion;
    }
    /**
     * setIsServiceSpecific - sets whether the signals encoded in this TC String
     * were from site-specific storage (True) versus ‘global’ consensu.org shared
     * storage (False).
     *
     * A string intended to be stored in global/shared scope but the CMP is unable
     * to store due to a user agent not accepting third-party cookies would be
     * considered site-specific (True).
     *
     * @param {boolean} value - value to set whether this sting will be stored in a
     * service-specific mannor or whether it will be stored in the global consensu
     * domain space
     * @return {undefined}
     */
    setIsServiceSpecific(value) {
        this.isServiceSpecific = value;
    }
    /**
     * getIsServiceSpecific - gets whether the signals encoded in this TC String
     * were from site-specific storage (True) versus ‘global’ consensu.org shared
     * storage (False).
     *
     * A string intended to be stored in global/shared scope but the CMP is unable
     * to store due to a user agent not accepting third-party cookies would be
     * considered site-specific (True).
     *
     * @return {boolean}
     */
    getIsServiceSpecific() {
        return this.isServiceSpecific;
    }
    /**
     * setUseNonStandardStacks - Non-standard stacks means that a CMP is using
     * publisher-customized stack descriptions.
     *
     * Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are
     * titles. Descriptions are pre-set, but publishers can customize them. If
     * they do, they need to set this bit to indicate that they've customized
     * descriptions
     *
     * @param {boolean} value - true if CMP used non-standard stacks during consent
     * gathering; false if IAB standard stacks were used.
     * @return {undefined}
     */
    setUseNonStandardStacks(value) {
        this.useNonStandardStacks = value;
    }
    /**
     * getUseNonStandardStacks - Non-standard stacks means that a CMP is using
     * publisher-customized stack descriptions.
     *
     * Stacks (in terms of purposes in a stack) are pre-set by the IAB. As are
     * titles. Descriptions are pre-set, but publishers can customize them. If
     * they do, they need to set this bit to indicate that they've customized
     * descriptions
     *
     *
     * @return {boolean} - true if CMP used non-standard stacks during consent
     * gathering; false if IAB standard stacks were used.
     */
    getUseNonStandardStacks() {
        return this.useNonStandardStacks;
    }
    /**
     * setCMPManifest
     *
     * @param {CMPManifest} cmpManifest
     * @return {void}
     */
    setCMPManifest(cmpManifest) {
        this.cmpManifest = cmpManifest;
    }
    /**
     * getCMPManifest
     *
     * @return {CMPManifest}
     */
    getCMPManifest() {
        return this.cmpManifest;
    }
    /**
     * setPurposeConsents
     *
     * @param {PurposeVector} purposeConsents
     * @return {void}
     */
    setPurposeConsents(purposeConsents) {
        this.purposeConsents = purposeConsents;
    }
    ;
    /**
     * getPurposeConsents
     *
     * @return {PurposeVector}
     */
    getPurposeConsents() {
        return this.purposeConsents;
    }
    ;
    /**
     * setPurposeLITransparency
     *
     * @param {PurposeVector} purposeLITransparency
     * @return {void}
     */
    setPurposeLITransparency(purposeLITransparency) {
        this.purposeLITransparency = purposeLITransparency;
    }
    ;
    /**
     * getPurposeLITransparency
     *
     * @return {PurposeVector}
     */
    getPurposeLITransparency() {
        return this.purposeLITransparency;
    }
    ;
    /**
     * setVendorConsents
     *
     * @param {VendorVector} vendorConsents
     * @return {void}
     */
    setVendorConsents(vendorConsents) {
        this.vendorConsents = vendorConsents;
    }
    ;
    /**
     * getVendorConsents
     *
     * @return {VendorVector}
     */
    getVendorConsents() {
        return this.vendorConsents;
    }
    ;
    /**
     * setVendorLegitimateInterest
     *
     * @param {VendorVector} vendorLegitimateInterest
     * @return {void}
     */
    setVendorLegitimateInterest(vendorLegitimateInterest) {
        this.vendorLegitimateInterest = vendorLegitimateInterest;
    }
    ;
    /**
     * getVendorLegitimateInterest
     *
     * @return {VendorVector}
     */
    getVendorLegitimateInterest() {
        return this.vendorLegitimateInterest;
    }
    ;
    /**
     * setPublisherRestrictions
     *
     * @param {VendorVector} publisherRestrictions
     * @return {void}
     */
    setPublisherRestrictions(publisherRestrictions) {
        this.publisherRestrictions = publisherRestrictions;
    }
    ;
    /**
     * getPublisherRestrictions
     *
     * @return {VendorVector}
     */
    getPublisherRestrictions() {
        return this.publisherRestrictions;
    }
    ;
}
export { TCModel };
