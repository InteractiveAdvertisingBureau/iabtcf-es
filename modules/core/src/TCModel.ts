import {CMPManifest} from 'CMPManifest';
import {PurposeVector} from 'PurposeVector';
import {VendorVector} from 'VendorVector';


/**
 * Class representing the data contained within the  Transparancy and Consent String as defined by the iab's
 * Transparency and Consent Framework v2.0
 */
class TCModel {

  private version: number;
  private created: Date;
  private lastUpdated: Date;
  private cmpId: number;
  private cmpVersion: number;
  private consentScreen: number;
  private consentLanguage: string;
  private vendorListVersion: number;
  private policyVersion: number;
  private isServiceSpecific: boolean;
  private useNonStandardStacks: boolean;
  private cmpManifest: CMPManifest;
  // private specialFeatureOptIns
  private purposeConsents: PurposeVector;
  private purposeLITransparency: PurposeVector;
  private vendorConsents: VendorVector;
  private vendorLegitimateInterest: VendorVector;
  private publisherRestrictions: VendorVector;

  /**
   * getVersion
   *
   * @return {number} - TCString Encoding Version
   */
  public getVersion(): number {

    return this.version;

  }

  /**
   * setVersion
   * @param {number} version - TCString Encoding Version
   *
   * @return {void}
   */
  public setVersion(version: number): void {

    this.version = version; ;

  }

  /**
   * getCreated
   *
   * @return {Date} when this TC String was created
   */
  public getCreated(): Date {

    return this.created;

  }

  /**
   * getLastUpdated
   *
   * @return {Date} the last time the string was updated
   */
  public getLastUpdated(): Date {

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
  public getCmpId(): number {

    return this.cmpId;

  }

  /**
   * getCmpVersion - gets the Consent Manager Provider version. This is a CMP's
   * own internal versioning number.  Each change to an operating CMP should
   * receive a new version number, for logging proof of consent
   *
   * @return {number}
   */
  public getCmpVersion(): number {

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
  public setConsentScreen(num: number): void {

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
  public getConsentScreen(): number {

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
  public setConsentLanguage(twoLetterLangCode: string): void {

    if (twoLetterLangCode.length === 2) {

      this.consentLanguage = twoLetterLangCode.toLowerCase();

    } else {

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
  public getConsentLanguage(): string {

    return this.consentLanguage;

  }

  /**
   * getVendorListVersion - gets the version of global vendor list used in most
   * recent TC string update. Global vendor list versions will be released
   * periodically.
   *
   * @return {number}
   */
  public getVendorListVersion(): number {

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
  public getPolicyVersion(): number {

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
  public setIsServiceSpecific(value: boolean): void {

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
  public getIsServiceSpecific(): boolean {

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
  public setUseNonStandardStacks(value: boolean): void {

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
  public getUseNonStandardStacks(): boolean {

    return this.useNonStandardStacks;

  }

  /**
   * setCMPManifest
   *
   * @param {CMPManifest} cmpManifest
   * @return {void}
   */
  public setCMPManifest(cmpManifest: CMPManifest): void {

    this.cmpManifest = cmpManifest;

  }

  /**
   * getCMPManifest
   *
   * @return {CMPManifest}
   */
  public getCMPManifest(): CMPManifest {

    return this.cmpManifest;

  }

  /**
   * setPurposeConsents
   *
   * @param {PurposeVector} purposeConsents
   * @return {void}
   */
  public setPurposeConsents(purposeConsents: PurposeVector): void {

    this.purposeConsents = purposeConsents;

  };

  /**
   * getPurposeConsents
   *
   * @return {PurposeVector}
   */
  public getPurposeConsents(): PurposeVector {

    return this.purposeConsents;

  };

  /**
   * setPurposeLITransparency
   *
   * @param {PurposeVector} purposeLITransparency
   * @return {void}
   */
  public setPurposeLITransparency(purposeLITransparency: PurposeVector): void {

    this.purposeLITransparency = purposeLITransparency;

  };

  /**
   * getPurposeLITransparency
   *
   * @return {PurposeVector}
   */
  public getPurposeLITransparency(): PurposeVector {

    return this.purposeLITransparency;

  };

  /**
   * setVendorConsents
   *
   * @param {VendorVector} vendorConsents
   * @return {void}
   */
  public setVendorConsents(vendorConsents: VendorVector): void {

    this.vendorConsents = vendorConsents;

  };

  /**
   * getVendorConsents
   *
   * @return {VendorVector}
   */
  public getVendorConsents(): VendorVector {

    return this.vendorConsents;

  };

  /**
   * setVendorLegitimateInterest
   *
   * @param {VendorVector} vendorLegitimateInterest
   * @return {void}
   */
  public setVendorLegitimateInterest(vendorLegitimateInterest: VendorVector): void {

    this.vendorLegitimateInterest = vendorLegitimateInterest;

  };

  /**
   * getVendorLegitimateInterest
   *
   * @return {VendorVector}
   */
  public getVendorLegitimateInterest(): VendorVector {

    return this.vendorLegitimateInterest;

  };

  /**
   * setPublisherRestrictions
   *
   * @param {VendorVector} publisherRestrictions
   * @return {void}
   */
  public setPublisherRestrictions(publisherRestrictions: VendorVector): void {

    this.publisherRestrictions = publisherRestrictions;

  };

  /**
   * getPublisherRestrictions
   *
   * @return {VendorVector}
   */
  public getPublisherRestrictions(): VendorVector {

    return this.publisherRestrictions;

  };

}

export {TCModel};
