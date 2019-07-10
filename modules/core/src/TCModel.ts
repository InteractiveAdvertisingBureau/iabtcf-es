import {Vector} from './model/Vector';
import {PurposeRestrictionVector} from './model/PurposeRestrictionVector';
import {GVL} from './GVL';
import {TCModelError} from './errors';
import {GVLMap, GVLMapItem} from './model/GVLBase';

export type TCModelPropType = number | Date | string | boolean | Vector | PurposeRestrictionVector;

export class TCModel {

  private static readonly MAX_ENCODING_VERSION: number = 2;

  // Defaults
  private version_: number = TCModel.MAX_ENCODING_VERSION;
  private consentScreen_: number = 0;
  private policyVersion_: number = 2;
  private isServiceSpecific_: boolean = false;
  private useNonStandardStacks_: boolean = false;
  private purposeOneTreatment_: boolean = false;
  private referenceCountry_: string = 'AA';


  // needs some settin' (no default)
  private cmpId_: number;
  private cmpVersion_: number;
  private consentLanguage_: string;
  private gvl_: GVL;

  // automagically set when created, updated and gvl set
  private created_: Date;
  private lastUpdated_: Date;
  private vendorListVersion_: number;

  /**
   * The TCF designates certain Features as special, that is, a CMP must afford
   * the user a means to opt in to their use. These Special Features are
   * published and numbered in the GVL separately from normal Features.
   * Provides for up to 12 special features.
   */
  public readonly specialFeatureOptIns: Vector = new Vector();

  /**
   * Renamed from `PurposesAllowed` in TCF v1.1
   * The user’s consent value for each Purpose established on the legal basis
   * of consent. Purposes are published in the Global Vendor List (see. [[GVL]]).
   */
  public readonly purposeConsents: Vector = new Vector();

  /**
   * The user’s permission for each Purpose established on the legal basis of
   * legitimate interest. If the user has exercised right-to-object for a
   * purpose, the corresponding bit for that purpose should be set to false.
   */
  public readonly purposeLITransparency: Vector = new Vector();

  /**
   * Each [[Vendor]] is keyed by id. Their consent value is stored as boolean.
   * see: [[Vector]]
   */
  public readonly vendorConsents: Vector = new Vector();

  /**
   * Each [[Vendor]] is keyed by id. Whether their Legitimate Interest
   * Disclosures have been established is stored as boolean.
   * see: [[Vector]]
   */
  public readonly vendorLegitimateInterest: Vector = new Vector();

  public readonly publisherRestrictions: PurposeRestrictionVector = new PurposeRestrictionVector();

  /**
   * Constructs the TCModel. Passing a [[GVL]] is optional when constructing
   * as this TCModel may be constructed from decoding an existing encoded
   * TCString.
   *
   * @param {GVL} [gvl]
   */
  public constructor(gvl?: GVL) {

    if (gvl) {

      this.gvl = gvl;

    }
    this.created = new Date();
    this.updated();

  }

  /**
   * sets the [[GVL]] with side effects of also setting the `vendorListVersion` and `policyVersion`
   * @param {GVL} gvl - may only be set once for this model.
   * @throws {TCModelError} if a gvl is already set on this TCModel
   */
  public set gvl(gvl: GVL) {

    if (this.gvl_ === undefined) {

      this.gvl_ = gvl;
      this.vendorListVersion_ = gvl.vendorListVersion;
      this.policyVersion_ = gvl.tcfPolicyVersion;
      this.consentLanguage = gvl.language;

    } else {

      throw new TCModelError('gvl', gvl, 'can be set only once');

    }

  }

  /**
   * @return {GVL} the gvl instance set on this TCModel instance
   */
  public get gvl(): GVL {

    return this.gvl_;

  }

  /**
   * sets encoded created date.  Will auto convert to deciseconds as the encoding requires
   *
   * @param {Date} date - in case the created date is different than when this
   * TCModel was constructed.  This is auto set for the encoding when this
   * object is created.
   */
  public set created(date: Date) {

    this.created_ = date;

  }

  /**
   * @return {Date} - date this TCModel was created and/or the string that this
   * TCModel was decoded from.
   */
  public get created(): Date {

    return this.created_;

  }

  /**
   * sets encoded last updated date.  Will auto convert to deciseconds as the encoding requires
   *
   * @param {Date} date - this is automatically updated on encoding
   * */
  public set lastUpdated(date: Date) {

    this.lastUpdated_ = date;

  }

  /**
   * @return {Date} - date this TCModel was last updated  and/or the string
   * that this TCModel was decoded from.
   */
  public get lastUpdated(): Date {

    return this.lastUpdated_;

  }

  /**
   * @param {number} integer - A unique ID will be assigned to each Consent
   * Manager Provider (CMP) from the iab.
   *
   * @throws {TCModelError} if the id is not an integer greater than 1 as those are not valid.
   */
  public set cmpId(integer: number) {

    if (this.isIntAbove(integer, 1)) {


      this.cmpId_ = integer;

    } else {

      throw new TCModelError('cmpId', integer);

    }

  }

  /**
   * @return {number} - A unique ID will be assigned to each Consent Manager
   * Provider (CMP) from the iab.
   */
  public get cmpId(): number {

    return this.cmpId_;

  }
  /**
   * @param {number} integer - Each change to an operating CMP should receive a
   * new version number, for logging proof of consent. CmpVersion defined by
   * each CMP.
   */
  public set cmpVersion(integer: number) {

    if (this.isIntAbove(integer, -1)) {

      this.cmpVersion_ = integer;

    } else {

      throw new TCModelError('cmpVersion', integer);

    }

  }

  /**
   * @return {number} - Each change to an operating CMP should receive a new
   * version number, for logging proof of consent. CmpVersion defined by each
   * CMP.
   */
  public get cmpVersion(): number {

    return this.cmpVersion_;

  }

  /**
   * @param {number} integer - The screen number is CMP and CmpVersion
   * specific, and is for logging proof of consent.(For example, a CMP could
   * keep records so that a publisher can request information about the context
   * in which consent was gathered.)
   * @return {undefined}
   */
  public set consentScreen(integer: number) {

    if (this.isIntAbove(integer, -1)) {

      this.consentScreen_ = integer;

    } else {

      throw new TCModelError('consentScreen', integer);

    }

  }

  /**
   * @return {number} - The screen number is CMP and CmpVersion specific, and
   * is for logging proof of consent.(For example, a CMP could keep records so
   * that a publisher can request information about the context in which
   * consent was gathered.)
   */
  public get consentScreen(): number {

    return this.consentScreen_;

  }

  /**
   * @param {string} lang - [two-letter ISO 639-1 language
   * code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which
   * the CMP UI was presented
   * @return {undefined}
   */
  public set consentLanguage(lang: string) {

    if (/^([A-z]){2}$/.test(lang)) {

      this.consentLanguage_ = lang.toUpperCase();

    } else {

      throw new TCModelError('consentLanguage', lang);

    }

  }

  /**
   * @return {string} -  [two-letter ISO 639-1 language
   * code](http://www.loc.gov/standards/iso639-2/php/code_list.php) in which
   * the CMP UI was presented
   */
  public get consentLanguage(): string {

    return this.consentLanguage_;

  }

  /**
   * @return {string} - [two-letter ISO 3166-1 alpha-2 country
   * code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the publisher,
   * determined by the CMP-settings of the publisher.
   */
  public get referenceCountry(): string {

    return this.referenceCountry_;

  }

  /**
   * @param {string} countryCode - [two-letter ISO 3166-1 alpha-2 country
   * code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the publisher,
   * determined by the CMP-settings of the publisher.
   * @return {undefined}
   */
  public set referenceCountry(countryCode: string) {

    if (/^([A-z]){2}$/.test(countryCode)) {

      this.referenceCountry_ = countryCode.toUpperCase();

    } else {

      throw new TCModelError('referenceCountry', countryCode);

    }

  }

  /**
   * @param {number} num - Version of the GVL used to create this TCModel. Global
   * Vendor List versions will be released periodically.
   */
  public set vendorListVersion(num: number) {

    if (this.isIntAbove(num, 0)) {

      this.vendorListVersion_ = num;

    } else {

      throw new TCModelError('vendorListVersion', num);

    }

  }

  /**
   * @return {number} - Version of the GVL used to create this TCModel. Global
   * Vendor List versions will be released periodically.
   */
  public get vendorListVersion(): number {

    return this.vendorListVersion_;

  }

  /**
   * @param {number} num - You do not need to set this.  This comes
   * directly from the [[GVL]].  From the corresponding field in the GVL that
   * was used for obtaining consent. A new policy version invalidates existing
   * strings and requires CMPs to re-establish transparency and consent from
   * users.
   *
   * If a TCF policy version number is different from the one from the latest
   * GVL, the CMP must re-establish transparency and consent.
   */
  public set policyVersion(num: number) {

    if (this.isIntAbove(num, 1)) {

      this.policyVersion_ = num;

    } else {

      throw new TCModelError('policyVersion', num);

    }

  }

  /**
   * @return {number} - From the corresponding field in the GVL that was
   * used for obtaining consent. A new policy version invalidates existing
   * strings and requires CMPs to re-establish transparency and consent from
   * users.
   *
   * If a TCF policy version number is different from the one from the latest
   * GVL, the CMP must re-establish transparency and consent.

   */
  public get policyVersion(): number {

    return this.policyVersion_;

  }

  /**
   * @param {number} num - Incremented when TC String format changes. Indicates
   * what encoding format the TCString will follow v1 or v2.  v1 fields will
   * omit fields.   
   */
  public set version(num: number) {

    if (this.isIntAbove(num, 0) && num <= TCModel.MAX_ENCODING_VERSION) {

      this.version_ = num;

    } else {

      throw new TCModelError('version', num, `max version is ${TCModel.MAX_ENCODING_VERSION}, can't be higher`);

    }

  }

  /**
   * @return {number} - Incremented when TC String format changes. Indicates
   * what encoding format the TCString will follow v1 or v2.  v1 fields will
   * omit fields.
   */
  public get version(): number {

    return this.version_;

  }


  /**
   * Whether the signals encoded in this TC String were from site-specific
   * storage (True) versus ‘global’ consensu.org shared storage (False). A
   * string intended to be stored in global/shared scope but the CMP is unable
   * to store due to a user agent not accepting third-party cookies would be
   * considered site-specific (True).
   * @param {boolean} bool - value to set. Some changes to other fields in this
   * model will automatically change this value like adding publisher
   * restrictions.
   */
  public set isServiceSpecific(bool: boolean) {

    this.isServiceSpecific_ = bool;

  };

  /**
   * Whether the signals encoded in this TC String were from site-specific
   * storage (True) versus ‘global’ consensu.org shared storage (False). A
   * string intended to be stored in global/shared scope but the CMP is unable
   * to store due to a user agent not accepting third-party cookies would be
   * considered site-specific (True).
   * @return {boolean} bool - value that was set
   */
  public get isServiceSpecific(): boolean {

    return this.isServiceSpecific_;

  };

  /**
   * Non-standard stacks means that a CMP is using publisher-customized stack
   * descriptions. Stacks (in terms of purposes in a stack) are pre-set by the
   * IAB. As are titles. Descriptions are pre-set, but publishers can customize
   * them. If they do, they need to set this bit to indicate that they've
   * customized descriptions.
   * @param {boolean} bool - value to set
   */
  public set useNonStandardStacks(bool: boolean) {

    this.useNonStandardStacks_ = bool;

  };

  /**
   * Non-standard stacks means that a CMP is using publisher-customized stack
   * descriptions. Stacks (in terms of purposes in a stack) are pre-set by the
   * IAB. As are titles. Descriptions are pre-set, but publishers can customize
   * them. If they do, they need to set this bit to indicate that they've
   * customized descriptions.
   * @return {boolean} bool - value that was set
   */
  public get useNonStandardStacks(): boolean {

    return this.useNonStandardStacks_;

  };

  /**
   * @param {boolean} bool - `false` There is no special Purpose 1 status.
   * Purpose 1 was disclosed normally (consent) as expected by Policy.  `true`
   * Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the
   * publisher’s country of establishment to help Vendors determine whether the
   * vendor requires Purpose 1 consent. In global scope TC strings, this field
   * must always have a value of `false`. When a CMP encounters a global scope
   * string with `purposeOneTreatment=true` then that string should be
   * considered invalid and the CMP must re-establish transparency and consent.
   */
  public set purposeOneTreatment(bool: boolean) {

    this.purposeOneTreatment_ = bool;

  };

  /**
   * @return {boolean} bool - `false` There is no special Purpose 1 status.
   * Purpose 1 was disclosed normally (consent) as expected by Policy.  `true`
   * Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate the
   * publisher’s country of establishment to help Vendors determine whether the
   * vendor requires Purpose 1 consent. In global scope TC strings, this field
   * must always have a value of `false`. When a CMP encounters a global scope
   * string with `purposeOneTreatment=true` then that string should be
   * considered invalid and the CMP must re-establish transparency and consent.
   */
  public get purposeOneTreatment(): boolean {

    return this.purposeOneTreatment_;

  };

  /**
   * sets all items on the vector
   *
   * @param {GVLMap} gvlMap - this will be one of the maps defined in the [[GVLMap]]
   * @param {Vector)} vector - vector to affect
   * @return {void}
   */
  private setAllOnVector<T>(gvlMap: GVLMap<T>, vector: Vector): void {

    if (!this.gvl) {

      throw new TCModelError('setAll', '' + this.gvl, 'No GVL!');

    }
    for (const id in gvlMap) {

      if (gvlMap.hasOwnProperty(id)) {

        const pathItem = gvlMap[id];

        if (this.isGVLMapItem(pathItem)) {

          vector.set(pathItem.id);

        }

      }

    }

  }

  /**
   * setAllVendorConsents - sets all vendors on the GVL Consent (true)
   *
   * @return {void}
   */
  public setAllVendorConsents(): void {

    this.vendorConsents.empty();
    this.setAllOnVector(this.gvl.vendors, this.vendorConsents);

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
   * setAllVendorLegitimateInterest - sets all vendors on the GVL LegitimateInterest (true)
   *
   * @return {void}
   */
  public setAllVendorLegitimateInterest(): void {

    this.vendorLegitimateInterest.empty();
    this.setAllOnVector(this.gvl.vendors, this.vendorLegitimateInterest);

  }

  /**
   * unsetAllVendorLegitimateInterest - unsets all vendors on the GVL LegitimateInterest (false)
   *
   * @return {void}
   */
  public unsetAllVendorLegitimateInterest(): void {

    this.vendorLegitimateInterest.empty();

  }

  /**
   * setAllPurposeConsents - sets all purposes on the GVL Consent (true)
   *
   * @return {void}
   */
  public setAllPurposeConsents(): void {

    this.purposeConsents.empty();
    this.setAllOnVector(this.gvl.purposes, this.purposeConsents);

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
   * setAllPurposeLITransparency - sets all purposes on the GVL LI Transparency (true)
   *
   * @return {void}
   */
  public setAllPurposeLITransparency(): void {

    this.purposeLITransparency.empty();
    this.setAllOnVector(this.gvl.purposes, this.purposeLITransparency);

  }

  /**
   * unsetAllPurposeLITransparency - unsets all purposes on the GVL LI Transparency (false)
   *
   * @return {void}
   */
  public unsetAllPurposeLITransparency(): void {

    this.purposeLITransparency.empty();

  }

  /**
   * setAllSpecialFeatureOptIns - sets all special featuresOptins on the GVL (true)
   *
   * @return {void}
   */
  public setAllSpecialFeatureOptIns(): void {

    this.specialFeatureOptIns.empty();
    this.setAllOnVector(this.gvl.specialFeatures, this.specialFeatureOptIns);

  }

  /**
   * unsetAllSpecialFeatureOptIns - unsets all special featuresOptins on the GVL (true)
   *
   * @return {void}
   */
  public unsetAllSpecialFeatureOptIns(): void {

    this.specialFeatureOptIns.empty();

  }

  /**
   * setAll - calls:
   * ```
    setAllVendorConsents();
    setAllPurposeLITransparency();
    setAllSpecialFeatureOptIns();
    setAllPurposeConsents();
    setAllVendorLegitimateInterest();
   * ```
   * @return {void}
   */
  public setAll(): void {

    this.unsetAll();

    this.setAllVendorConsents();
    this.setAllPurposeLITransparency();
    this.setAllSpecialFeatureOptIns();
    this.setAllPurposeConsents();
    this.setAllVendorLegitimateInterest();

  }

  /**
   * unsetAll - calls:
   * ```
    unsetAllVendorConsents();
    unsetAllPurposeLITransparency();
    unsetAllSpecialFeatureOptIns();
    unsetAllPurposeConsents();
    unsetAllVendorLegitimateInterest();
   * ```
   * @return {void}
   */
  public unsetAll(): void {

    this.unsetAllVendorConsents();
    this.unsetAllPurposeLITransparency();
    this.unsetAllSpecialFeatureOptIns();
    this.unsetAllPurposeConsents();
    this.unsetAllVendorLegitimateInterest();

  }

  /**
   * isIntAbove - private method for validating that a passed in value is both
   * an int and above a certain number
   *
   * @param {number} possibleInt - value to check
   * @param {number} above - the lower limit
   * @return{boolean} - wehther or not `possibleInt` is both an int and above `above` number
   */
  private isIntAbove(possibleInt: number, above: number): boolean {

    return (Number.isInteger(possibleInt) && possibleInt > above);

  }

  // This is a type check I need it to be an 'any'
  // eslint-disable-next-line
  private isGVLMapItem(obj: any): obj is GVLMapItem {

    return typeof obj.id === 'number' && typeof obj.name === 'string';

  }

  /**
   * updated - updates the lastUpdatedDate with a 'now' timestamp
   *
   * @return {void}
   */
  public updated(): void {

    this.lastUpdated = new Date();

  }

  /**
   * isValid - returns whether all fields have a value
   *
   * @return {boolean}
   */
  public isValid(): boolean {

    return (this.isServiceSpecific !== undefined
      && this.useNonStandardStacks !== undefined
      && this.cmpId !== undefined
      && this.cmpVersion !== undefined
      && this.consentLanguage !== undefined
      && this.referenceCountry !== undefined
      && this.purposeOneTreatment !== undefined
      && this.consentScreen !== undefined
      && this.created !== undefined
      && this.gvl !== undefined
      && this.lastUpdated !== undefined
      && this.policyVersion !== undefined
      && this.vendorListVersion !== undefined
      && this.version !== undefined);

  }


}
