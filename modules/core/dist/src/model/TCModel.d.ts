import { CMPManifest } from 'CMPManifest';
import { PurposeVector } from 'PurposeVector';
import { VendorVector } from 'VendorVector';
/**
 * Class representing the data contained within the  Transparancy and Consent String as defined by the iab's
 * Transparency and Consent Framework v2.0
 */
declare class TCModel {
    private version;
    private created;
    private lastUpdated;
    private cmpId;
    private cmpVersion;
    private consentScreen;
    private consentLanguage;
    private vendorListVersion;
    private policyVersion;
    private isServiceSpecific;
    private useNonStandardStacks;
    private cmpManifest;
    private purposeConsents;
    private purposeLITransparency;
    private vendorConsents;
    private vendorLegitimateInterest;
    private publisherRestrictions;
    /**
     * getVersion
     *
     * @return {number} version of the consent string encoding
     */
    getVersion(): number;
    /**
     * getCreated
     *
     * @return {Date} when this TC String was created
     */
    getCreated(): Date;
    /**
     * getLastUpdated
     *
     * @return {Date} the last time the string was updated
     */
    getLastUpdated(): Date;
    /**
     * getCmpId - gets the Consent Manager Provider ID that last updated the TC
     * string
     *
     * @return {number} unique ID assigned to a Consent Manager Provider (CMP) by
     * the iab. This ID is encoded in the string. To register as a CMP please go
     * to https://register.consensu.org/CMP
     */
    getCmpId(): number;
    /**
     * getCmpVersion - gets the Consent Manager Provider version. This is a CMP's
     * own internal versioning number.  Each change to an operating CMP should
     * receive a new version number, for logging proof of consent
     *
     * @return {number}
     */
    getCmpVersion(): number;
    /**
     * setConsentScreen - sets the screen number in the CMP where consent was
     * given. The screen number is CMP and CmpVersion specific, and is for logging
     * proof of consent.(For example, a CMP could keep records so that a publisher
     * can request information about the context in which consent was gathered.)
     *
     * @param {number} num - number to set the consent screen to
     * @return {undefined}
     */
    setConsentScreen(num: number): void;
    /**
     * getConsentScreen - gets the screen number in the CMP where consent was
     * given. The screen number is CMP and CmpVersion specific, and is for logging
     * proof of consent.(For example, a CMP could keep records so that a publisher
     * can request information about the context in which consent was gathered.)
     *
     * @return {number}
     */
    getConsentScreen(): number;
    /**
     * setConsentLanguage - sets the Two-letter ISO639-1 language code in which
     * the CMP UI was presented.
     *
     * @param {string} twoLetterLangCode - two letter lowercase language code
     * eg. 'en' or 'fr', etc..
     * @return {undefined}
     */
    setConsentLanguage(twoLetterLangCode: string): void;
    /**
     * getConsentLanguage - gets the Two-letter ISO639-1 language code in which
     * the CMP UI was presented.
     *
     * @return {string} two letter lowercase language code
     * eg. 'en' or 'fr', etc..
     */
    getConsentLanguage(): string;
    /**
     * getVendorListVersion - gets the version of global vendor list used in most
     * recent TC string update. Global vendor list versions will be released
     * periodically.
     *
     * @return {number}
     */
    getVendorListVersion(): number;
    /**
     * getPolicyVersion - gets the value from the corresponding field in the GVL
     * that was used for obtaining consent. A new policy version invalidates
     * existing strings and requires CMPs to re-establish transparency and consent
     * from users. If a TC string’s policy version number is different from the
     * one from the latest GVL, the CMP must re-establish transparency and consent
     *
     * @return {number}
     */
    getPolicyVersion(): number;
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
    setIsServiceSpecific(value: boolean): void;
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
    getIsServiceSpecific(): boolean;
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
    setUseNonStandardStacks(value: boolean): void;
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
    getUseNonStandardStacks(): boolean;
    /**
     * setCMPManifest
     *
     * @param {CMPManifest} cmpManifest
     * @return {void}
     */
    setCMPManifest(cmpManifest: CMPManifest): void;
    /**
     * getCMPManifest
     *
     * @return {CMPManifest}
     */
    getCMPManifest(): CMPManifest;
    /**
     * setPurposeConsents
     *
     * @param {PurposeVector} purposeConsents
     * @return {void}
     */
    setPurposeConsents(purposeConsents: PurposeVector): void;
    /**
     * getPurposeConsents
     *
     * @return {PurposeVector}
     */
    getPurposeConsents(): PurposeVector;
    /**
     * setPurposeLITransparency
     *
     * @param {PurposeVector} purposeLITransparency
     * @return {void}
     */
    setPurposeLITransparency(purposeLITransparency: PurposeVector): void;
    /**
     * getPurposeLITransparency
     *
     * @return {PurposeVector}
     */
    getPurposeLITransparency(): PurposeVector;
    /**
     * setVendorConsents
     *
     * @param {VendorVector} vendorConsents
     * @return {void}
     */
    setVendorConsents(vendorConsents: VendorVector): void;
    /**
     * getVendorConsents
     *
     * @return {VendorVector}
     */
    getVendorConsents(): VendorVector;
    /**
     * setVendorLegitimateInterest
     *
     * @param {VendorVector} vendorLegitimateInterest
     * @return {void}
     */
    setVendorLegitimateInterest(vendorLegitimateInterest: VendorVector): void;
    /**
     * getVendorLegitimateInterest
     *
     * @return {VendorVector}
     */
    getVendorLegitimateInterest(): VendorVector;
    /**
     * setPublisherRestrictions
     *
     * @param {VendorVector} publisherRestrictions
     * @return {void}
     */
    setPublisherRestrictions(publisherRestrictions: VendorVector): void;
    /**
     * getPublisherRestrictions
     *
     * @return {VendorVector}
     */
    getPublisherRestrictions(): VendorVector;
}
export { TCModel };
