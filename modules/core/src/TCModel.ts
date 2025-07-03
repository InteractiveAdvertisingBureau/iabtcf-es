import {Cloneable} from './Cloneable.js';
import {TCModelError} from './errors/index.js';
import {GVL} from './GVL.js';
import {ConsentLanguages, IntMap, PurposeRestrictionVector, Vector} from './model/index.js';
import {Purpose} from './model/gvl/index.js';

type StringOrNumber = number | string;
export type TCModelPropType = number | Date | string | boolean | Vector | PurposeRestrictionVector;

export class TCModel extends Cloneable<TCModel> {

  /**
   * Set of available consent languages published by the IAB
   */
  public static readonly consentLanguages: ConsentLanguages = GVL.consentLanguages;

  private isServiceSpecific_ = false;
  private supportOOB_ = true;
  private useNonStandardTexts_ = false;
  private purposeOneTreatment_ = false;
  private publisherCountryCode_ = 'AA';
  private version_ = 2;
  private consentScreen_: StringOrNumber = 0;
  private policyVersion_: StringOrNumber = 5;
  private consentLanguage_ = 'EN';
  private cmpId_: StringOrNumber = 0;
  private cmpVersion_: StringOrNumber = 0;
  private vendorListVersion_: StringOrNumber = 0;
  private numCustomPurposes_ = 0;

  // Member Variable for GVL
  private gvl_: GVL;

  public created: Date;
  public lastUpdated: Date;

  /**
   * The TCF designates certain Features as special, that is, a CMP must afford
   * the user a means to opt in to their use. These Special Features are
   * published and numbered in the GVL separately from normal Features.
   * Provides for up to 12 special features.
   */
  public readonly specialFeatureOptins: Vector = new Vector();

  /**
   * Renamed from `PurposesAllowed` in TCF v1.1
   * The user’s consent value for each Purpose established on the legal basis
   * of consent. Purposes are published in the Global Vendor List (see. [[GVL]]).
   */
  public readonly purposeConsents: Vector = new Vector();

  /**
   * The user’s permission for each Purpose established on the legal basis of
   * legitimate interest. If the user has exercised right-to-object for a
   * purpose.
   */
  public readonly purposeLegitimateInterests: Vector = new Vector();

  /**
   * The user’s consent value for each Purpose established on the legal basis
   * of consent, for the publisher.  Purposes are published in the Global
   * Vendor List.
   */
  public readonly publisherConsents: Vector = new Vector();

  /**
   * The user’s permission for each Purpose established on the legal basis of
   * legitimate interest.  If the user has exercised right-to-object for a
   * purpose.
   */
  public readonly publisherLegitimateInterests: Vector = new Vector();

  /**
   * The user’s consent value for each Purpose established on the legal basis
   * of consent, for the publisher.  Purposes are published in the Global
   * Vendor List.
   */
  public readonly publisherCustomConsents: Vector = new Vector();

  /**
   * The user’s permission for each Purpose established on the legal basis of
   * legitimate interest.  If the user has exercised right-to-object for a
   * purpose that is established in the publisher's custom purposes.
   */
  public readonly publisherCustomLegitimateInterests: Vector = new Vector();

  /**
   * set by a publisher if they wish to collect consent and LI Transparency for
   * purposes outside of the TCF
   */
  public customPurposes: IntMap<Purpose>;

  /**
   * Each [[Vendor]] is keyed by id. Their consent value is true if it is in
   * the Vector
   */
  public readonly vendorConsents: Vector = new Vector();

  /**
   * Each [[Vendor]] is keyed by id. Whether their Legitimate Interests
   * Disclosures have been established is stored as boolean.
   * see: [[Vector]]
   */
  public readonly vendorLegitimateInterests: Vector = new Vector();

  /**
   * The value included for disclosed vendors signals which vendors have been
   * disclosed to the user in the interface surfaced by the CMP. This section
   * content is required when writing a TC string to the global (consensu)
   * scope. When a CMP has read from and is updating a TC string from the
   * global consensu.org storage, the CMP MUST retain the existing disclosure
   * information and only add information for vendors that it has disclosed
   * that had not been disclosed by other CMPs in prior interactions with this
   * device/user agent.
   */
  public readonly vendorsDisclosed: Vector = new Vector();

  /**
   * Signals which vendors the publisher permits to use OOB legal bases.
   */
  public readonly vendorsAllowed: Vector = new Vector();

  public readonly publisherRestrictions: PurposeRestrictionVector = new PurposeRestrictionVector();

  /**
   * Constructs the TCModel. Passing a [[GVL]] is optional when constructing
   * as this TCModel may be constructed from decoding an existing encoded
   * TCString.
   *
   * @param {GVL} [gvl]
   */
  public constructor(gvl?: GVL) {

    super();

    if (gvl) {

      this.gvl = gvl;

    }

    this.updated();

  }

  /**
   * sets the [[GVL]] with side effects of also setting the `vendorListVersion`, `policyVersion`, and `consentLanguage`
   * @param {GVL} gvl
   */
  public set gvl(gvl: GVL) {

    /**
     * set the reference, but make sure it's our GVL wrapper class.
     */

    if (!(GVL.isInstanceOf(gvl))) {

      gvl = new GVL(gvl);

    }

    this.gvl_ = gvl;
    this.publisherRestrictions.gvl = gvl;

  }

  /**
   * @return {GVL} the gvl instance set on this TCModel instance
   */
  public get gvl(): GVL {

    return this.gvl_;

  }

  /**
   * @param {number} integer - A unique ID will be assigned to each Consent
   * Manager Provider (CMP) from the iab.
   *
   * @throws {TCModelError} if the value is not an integer greater than 1 as those are not valid.
   */
  public set cmpId(integer: StringOrNumber) {

    integer = Number(integer);

    if (Number.isInteger(integer) && integer > 1) {

      this.cmpId_ = integer;

    } else {

      throw new TCModelError('cmpId', integer);

    }

  }

  public get cmpId(): StringOrNumber {

    return this.cmpId_;

  }

  /**
   * Each change to an operating CMP should receive a
   * new version number, for logging proof of consent. CmpVersion defined by
   * each CMP.
   *
   * @param {number} integer
   *
   * @throws {TCModelError} if the value is not an integer greater than 1 as those are not valid.
   */
  public set cmpVersion(integer: StringOrNumber) {

    integer = Number(integer);

    if (Number.isInteger(integer) && integer > -1) {

      this.cmpVersion_ = integer;

    } else {

      throw new TCModelError('cmpVersion', integer);

    }

  }
  public get cmpVersion(): StringOrNumber {

    return this.cmpVersion_;

  }

  /**
   * The screen number is CMP and CmpVersion
   * specific, and is for logging proof of consent.(For example, a CMP could
   * keep records so that a publisher can request information about the context
   * in which consent was gathered.)
   *
   * @param {number} integer
   *
   * @throws {TCModelError} if the value is not an integer greater than 0 as those are not valid.
   */
  public set consentScreen(integer: StringOrNumber) {

    integer = Number(integer);

    if (Number.isInteger(integer) && integer > -1) {

      this.consentScreen_ = integer;

    } else {

      throw new TCModelError('consentScreen', integer);

    }

  }
  public get consentScreen(): StringOrNumber {

    return this.consentScreen_;

  }

  /**
   * @param {string} lang - [two-letter ISO 639-1 language
   * code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which
   * the CMP UI was presented
   *
   * @throws {TCModelError} if the value is not a length-2 string of alpha characters
   */
  public set consentLanguage(lang: string) {

    this.consentLanguage_ = lang;

  }

  public get consentLanguage(): string {

    return this.consentLanguage_;

  }

  /**
   * @param {string} countryCode - [two-letter ISO 3166-1 alpha-2 country
   * code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the publisher,
   * determined by the CMP-settings of the publisher.
   *
   * @throws {TCModelError} if the value is not a length-2 string of alpha characters
   */
  public set publisherCountryCode(countryCode: string) {

    if (/^([A-z]){2}$/.test(countryCode)) {

      this.publisherCountryCode_ = countryCode.toUpperCase();

    } else {

      throw new TCModelError('publisherCountryCode', countryCode);

    }

  }

  public get publisherCountryCode(): string {

    return this.publisherCountryCode_;

  }

  /**
   * Version of the GVL used to create this TCModel. Global
   * Vendor List versions will be released periodically.
   *
   * @param {number} integer
   *
   * @throws {TCModelError} if the value is not an integer greater than 0 as those are not valid.
   */
  public set vendorListVersion(integer: StringOrNumber) {

    /**
     * first coerce to a number via leading '+' then take the integer value by
     * bitshifting to the right.  This works on all types in JavaScript and if
     * it's not valid then value will be 0.
     */
    integer = Number(integer)>>0;

    if (integer < 0) {

      throw new TCModelError('vendorListVersion', integer);

    } else {

      this.vendorListVersion_ = integer;

    }

  }

  public get vendorListVersion(): StringOrNumber {

    if (this.gvl) {

      return this.gvl.vendorListVersion;

    } else {

      return this.vendorListVersion_;

    }

  }

  /**
   * From the corresponding field in the GVL that was
   * used for obtaining consent. A new policy version invalidates existing
   * strings and requires CMPs to re-establish transparency and consent from
   * users.
   *
   * If a TCF policy version number is different from the one from the latest
   * GVL, the CMP must re-establish transparency and consent.
   *
   * @param {number} num - You do not need to set this.  This comes
   * directly from the [[GVL]].
   *
   */
  public set policyVersion(num: StringOrNumber) {

    this.policyVersion_ = parseInt(num as string, 10);

    if (this.policyVersion_ < 0) {

      throw new TCModelError('policyVersion', num);

    }

  }

  public get policyVersion(): StringOrNumber {

    if (this.gvl) {

      return this.gvl.tcfPolicyVersion;

    } else {

      return this.policyVersion_;

    }

  }

  public set version(num: StringOrNumber) {

    this.version_ = parseInt(num as string, 10);

  }

  public get version(): StringOrNumber {

    return this.version_;

  }

  /**
   * Whether the signals encoded in this TC String were from site-specific
   * storage `true` versus ‘global’ consensu.org shared storage `false`. A
   * string intended to be stored in global/shared scope but the CMP is unable
   * to store due to a user agent not accepting third-party cookies would be
   * considered site-specific `true`.
   *
   * @param {boolean} bool - value to set. Some changes to other fields in this
   * model will automatically change this value like adding publisher
   * restrictions.
   */
  public set isServiceSpecific(bool: boolean) {

    this.isServiceSpecific_ = bool;

  }

  public get isServiceSpecific(): boolean {

    return this.isServiceSpecific_;

  }

  /**
   * Non-standard stacks means that a CMP is using publisher-customized stack
   * descriptions. Stacks (in terms of purposes in a stack) are pre-set by the
   * IAB. As are titles. Descriptions are pre-set, but publishers can customize
   * them. If they do, they need to set this bit to indicate that they've
   * customized descriptions.
   *
   * @param {boolean} bool - value to set
   */
  public set useNonStandardTexts(bool: boolean) {

    this.useNonStandardTexts_ = bool;

  }

  public get useNonStandardTexts(): boolean {

    return this.useNonStandardTexts_;

  }

  /**
   * Whether or not this publisher supports OOB signaling.  On Global TC String
   * OOB Vendors Disclosed will be included if the publish wishes to no allow
   * these vendors they should set this to false.
   * @param {boolean} bool - value to set
   */
  public set supportOOB(bool: boolean) {

    this.supportOOB_ = bool;

  }

  public get supportOOB(): boolean {

    return this.supportOOB_;

  }

  /**
   * `false` There is no special Purpose 1 status.
   * Purpose 1 was disclosed normally (consent) as expected by Policy.  `true`
   * Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the
   * publisher’s country of establishment to help Vendors determine whether the
   * vendor requires Purpose 1 consent. In global scope TC strings, this field
   * must always have a value of `false`. When a CMP encounters a global scope
   * string with `purposeOneTreatment=true` then that string should be
   * considered invalid and the CMP must re-establish transparency and consent.
   *
   * @param {boolean} bool
   */
  public set purposeOneTreatment(bool: boolean) {

    this.purposeOneTreatment_ = bool;

  }

  public get purposeOneTreatment(): boolean {

    return this.purposeOneTreatment_;

  }

  /**
   * setAllVendorConsents - sets all vendors on the GVL Consent (true)
   *
   * @return {void}
   */
  public setAllVendorConsents(): void {

    this.vendorConsents.set(this.gvl.vendors);

  }

  /**
   * unsetAllVendorConsents - unsets all vendors on the GVL Consent (false)
   *
   * @return {void}
   */
  public unsetAllVendorConsents(): void {

    this.vendorConsents.empty();

  }

  /**
   * setAllVendorsDisclosed - sets all vendors on the GVL Vendors Disclosed (true)
   *
   * @return {void}
   */
  public setAllVendorsDisclosed(): void {

    this.vendorsDisclosed.set(this.gvl.vendors);

  }

  /**
   * unsetAllVendorsDisclosed - unsets all vendors on the GVL Consent (false)
   *
   * @return {void}
   */
  public unsetAllVendorsDisclosed(): void {

    this.vendorsDisclosed.empty();

  }

  /**
   * setAllVendorsAllowed - sets all vendors on the GVL Consent (true)
   *
   * @return {void}
   */
  public setAllVendorsAllowed(): void {

    this.vendorsAllowed.set(this.gvl.vendors);

  }

  /**
   * unsetAllVendorsAllowed - unsets all vendors on the GVL Consent (false)
   *
   * @return {void}
   */
  public unsetAllVendorsAllowed(): void {

    this.vendorsAllowed.empty();

  }

  /**
   * setAllVendorLegitimateInterests - sets all vendors on the GVL LegitimateInterests (true)
   *
   * @return {void}
   */
  public setAllVendorLegitimateInterests(): void {

    this.vendorLegitimateInterests.set(this.gvl.vendors);

  }

  /**
   * unsetAllVendorLegitimateInterests - unsets all vendors on the GVL LegitimateInterests (false)
   *
   * @return {void}
   */
  public unsetAllVendorLegitimateInterests(): void {

    this.vendorLegitimateInterests.empty();

  }

  /**
   * setAllPurposeConsents - sets all purposes on the GVL Consent (true)
   *
   * @return {void}
   */
  public setAllPurposeConsents(): void {

    this.purposeConsents.set(this.gvl.purposes);

  }

  /**
   * unsetAllPurposeConsents - unsets all purposes on the GVL Consent (false)
   *
   * @return {void}
   */
  public unsetAllPurposeConsents(): void {

    this.purposeConsents.empty();

  }

  /**
   * setAllPurposeLegitimateInterests - sets all purposes on the GVL LI Transparency (true)
   *
   * @return {void}
   */
  public setAllPurposeLegitimateInterests(): void {

    this.purposeLegitimateInterests.set(this.gvl.purposes);

  }

  /**
   * unsetAllPurposeLegitimateInterests - unsets all purposes on the GVL LI Transparency (false)
   *
   * @return {void}
   */
  public unsetAllPurposeLegitimateInterests(): void {

    this.purposeLegitimateInterests.empty();

  }

  /**
   * setAllSpecialFeatureOptins - sets all special featuresOptins on the GVL (true)
   *
   * @return {void}
   */
  public setAllSpecialFeatureOptins(): void {

    this.specialFeatureOptins.set(this.gvl.specialFeatures);

  }

  /**
   * unsetAllSpecialFeatureOptins - unsets all special featuresOptins on the GVL (true)
   *
   * @return {void}
   */
  public unsetAllSpecialFeatureOptins(): void {

    this.specialFeatureOptins.empty();

  }

  public setAll(): void {

    this.setAllVendorConsents();
    this.setAllPurposeLegitimateInterests();
    this.setAllSpecialFeatureOptins();
    this.setAllPurposeConsents();
    this.setAllVendorLegitimateInterests();

  }

  public unsetAll(): void {

    this.unsetAllVendorConsents();
    this.unsetAllPurposeLegitimateInterests();
    this.unsetAllSpecialFeatureOptins();
    this.unsetAllPurposeConsents();
    this.unsetAllVendorLegitimateInterests();

  }

  public get numCustomPurposes(): StringOrNumber {

    let len = this.numCustomPurposes_;

    if (typeof this.customPurposes === 'object') {

      /**
       * Keys are not guaranteed to be in order and likewise there is no
       * requirement that the customPurposes be non-sparse.  So we have to sort
       * and take the highest value.  Even if the set only contains 3 purposes
       * but goes to ID 6 we need to set the number to 6 for the encoding to
       * work properly since it's positional.
       */
      const purposeIds: string[] = Object.keys(this.customPurposes)
        .sort((a: string, b: string): number => Number(a) - Number(b));

      len = parseInt(purposeIds.pop(), 10);

    }

    return len;

  }

  public set numCustomPurposes(num: StringOrNumber) {

    this.numCustomPurposes_ = parseInt(num as string, 10);

    if (this.numCustomPurposes_ < 0) {

      throw new TCModelError('numCustomPurposes', num);

    }

  }

  /**
   * updated - updates the created and lastUpdated dates with a 'now' day-level UTC timestamp
   *
   * @return {void}
   */
  public updated(): void {

    const date = new Date();
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    this.created = utcDate;
    this.lastUpdated = utcDate;

  }

}
