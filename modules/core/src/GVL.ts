import {Cloneable} from './Cloneable';
import {GVLError} from './errors';
import {Json} from './Json';
import {ConsentLanguages, IntMap} from './model';
import {Declaration, DeclarationMap, Feature, Purpose, Stack, Vendor, VendorList} from './model/gvl';

export type VersionOrVendorList = string | number | VendorList;
type PurposeOrFeature = 'purpose' | 'feature';
type PurposeSubType = 'consent' | 'legInt' | 'flexible';

/**
 * class with utilities for managing the global vendor list.  Will use JSON to
 * fetch the vendor list from specified url and will serialize it into this
 * object and provide accessors.  Provides ways to group vendors on the list by
 * purpose and feature.
 */
export class GVL extends Cloneable<GVL> implements VendorList {

  private static LANGUAGE_CACHE: Map<string, DeclarationMap> = new Map<string, VendorList>();
  private static CACHE: Map<number, DeclarationMap> = new Map<number, DeclarationMap>();
  private static LATEST_CACHE_KEY = 0;

  public static readonly DEFAULT_LANGUAGE: string = 'EN';

  /**
   * Set of available consent languages published by the IAB
   */
  public static readonly consentLanguages: ConsentLanguages = new ConsentLanguages();

  private static baseUrl_: string;

  /**
   * baseUrl - Entities using the vendor-list.json are required by the iab to
   * host their own copy of it to reduce the load on the iab's infrastructure
   * so a 'base' url must be set to be put together with the versioning scheme
   * of the filenames.
   *
   * @static
   * @param {string} url - the base url to load the vendor-list.json from.  This is
   * broken out from the filename because it follows a different scheme for
   * latest file vs versioned files.
   *
   * @throws {GVLError} - If the url is http[s]://vendorlist.consensu.org/...
   * this will throw an error.  IAB Europe requires that that CMPs and Vendors
   * cache their own copies of the GVL to minimize load on their
   * infrastructure.  For more information regarding caching of the
   * vendor-list.json, please see [the TCF documentation on 'Caching the Global
   * Vendor List'
   * ](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#caching-the-global-vendor-list)
   */
  public static set baseUrl(url: string) {

    const notValid = /^https?:\/\/vendorlist\.consensu\.org\//;

    if (notValid.test(url)) {

      throw new GVLError('Invalid baseUrl!  You may not pull directly from vendorlist.consensu.org and must provide your own cache');

    }

    // if a trailing slash was forgotten
    if (url.length > 0 && url[url.length - 1] !== '/') {

      url += '/';

    }

    this.baseUrl_ = url;

  };

  /**
   * baseUrl - Entities using the vendor-list.json are required by the iab to
   * host their own copy of it to reduce the load on the iab's infrastructure
   * so a 'base' url must be set to be put together with the versioning scheme
   * of the filenames.
   *
   * @static
   * @return {string} - returns the previously set baseUrl, the default is
   * `undefined`
   */
  public static get baseUrl(): string {

    return this.baseUrl_;

  }

  /**
   * @static
   * @param {string} - the latest is assumed to be vendor-list.json because
   * that is what the iab uses, but it could be different... if you want
   */
  public static latestFilename = 'vendor-list.json';

  /**
   * @static
   * @param {string} - the versioned name is assumed to be
   * vendor-list-v[VERSION].json where [VERSION] will be replaced with the
   * specified version.  But it could be different... if you want just make
   * sure to include the [VERSION] macro if you have a numbering scheme, it's a
   * simple string substitution.
   *
   * eg.
   * ```javascript
   * GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
   * GVL.versionedFilename = "vendorlist?getVersion=[VERSION]";
   * ```
   */
  public static versionedFilename = 'archives/vendor-list-v[VERSION].json';

  /**
   * @param {string} - Translations of the names and descriptions for Purposes,
   * Special Purposes, Features, and Special Features to non-English languages
   * are contained in a file where attributes containing English content
   * (except vendor declaration information) are translated.  The iab publishes
   * one following the scheme below where the LANG is the iso639-1 language
   * code.  For a list of available translations
   * [please go here](https://register.consensu.org/Translation).
   *
   * eg.
   * ```javascript
   * GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
   * GVL.languageFilename = "purposes?getPurposes=[LANG]";
   * ```
   */
  public static languageFilename = 'purposes-[LANG].json';

  /**
   * @param {Promise} resolved when this GVL object is populated with the data
   * or rejected if there is an error.
   */
  public readyPromise: Promise<void | GVLError>;

  /**
   * @param {number} gvlSpecificationVersion - schema version for the GVL that is used
   */
  public gvlSpecificationVersion: number;

  /**
   * @param {number} incremented with each published file change
   */
  public vendorListVersion: number;

  /**
   * @param {number} tcfPolicyVersion - The TCF MO will increment this value
   * whenever a GVL change (such as adding a new Purpose or Feature or a change
   * in Purpose wording) legally invalidates existing TC Strings and requires
   * CMPs to re-establish transparency and consent from users. If the policy
   * version number in the latest GVL is different from the value in your TC
   * String, then you need to re-establish transparency and consent for that
   * user. A version 1 format TC String is considered to have a version value
   * of 1.
   */
  public tcfPolicyVersion: number;

  /**
   * @param {string | Date} lastUpdated - the date in which the vendor list
   * json file  was last updated.
   */
  public lastUpdated: string | Date;

  /**
   * @param {IntMap<Purpose>} a collection of [[Purpose]]s
   */
  public purposes: IntMap<Purpose>;

  public purposeIds: Set<number>;

  /**
   * @param {IntMap<Purpose>} a collection of [[Purpose]]s
   */
  public specialPurposes: IntMap<Purpose>;

  public specialPurposeIds: Set<number>;

  /**
   * @param {IntMap<Feature>} a collection of [[Feature]]s
   */
  public features: IntMap<Feature>;

  public featureIds: Set<number>;

  /**
   * @param {IntMap<Feature>} a collection of [[Feature]]s
   */
  public specialFeatures: IntMap<Feature>;

  public specialFeatureIds: Set<number>;

  /**
   * @param {IntMap<Stack>} a collection of [[Stack]]s
   */
  public stacks: IntMap<Stack>;

  public stackIds: Set<number>;

  /**
   * @param {boolean} internal reference of when the GVL is ready to be used
   */
  private isReady_ = false;

  /**
   * @param {IntMap<Vendor>} a collection of [[Vendor]]s
   */
  private vendors_: IntMap<Vendor>;

  public vendorIds: Set<number>;

  /**
   * @param {IntMap<Vendor>} a collection of [[Vendor]]. Used as a backup if a whitelist is sets
   */
  private fullVendorList: IntMap<Vendor>;

  // key (feature, purpose, etc) -> purposeId -> vendorId -> vendorObject
  private vendorByDeclarationMap: Map<Declaration, Map<number, Set<number>>>;

  private gvlToVendorDeclaration = new Map<Declaration, Declaration[]>([
    [Declaration.purposes, [Declaration.purposes, Declaration.legIntPurposes, Declaration.flexiblePurposes]],
    [Declaration.features, [Declaration.features]],
    [Declaration.specialPurposes, [Declaration.specialPurposes]],
    [Declaration.specialFeatures, [Declaration.specialFeatures]],
  ]);

  private lang_: string;

  private isLatest = false;

  /**
   * @param {VersionOrVendorList} [versionOrVendorList] - can be either a
   * [[VendorList]] object or a version number represented as a string or
   * number to download.  If nothing is passed the latest version of the GVL
   * will be loaded
   */
  public constructor(versionOrVendorList?: VersionOrVendorList) {

    super();

    /**
     * should have been configured before and instance was created and will
     * persist through the app
     */
    let url = GVL.baseUrl;

    this.lang_ = GVL.DEFAULT_LANGUAGE;

    if (this.isVendorList(versionOrVendorList as GVL)) {

      this.populate(versionOrVendorList as DeclarationMap);
      this.readyPromise = Promise.resolve();

    } else {

      if (!url) {

        throw new GVLError('must specify GVL.baseUrl before loading GVL json');

      }

      if (versionOrVendorList as number > 0) {

        const version = versionOrVendorList as number;

        if (GVL.CACHE.has(version)) {

          this.populate(GVL.CACHE.get(version));
          this.readyPromise = Promise.resolve();

        } else {

          // load version specified
          url += GVL.versionedFilename.replace('[VERSION]', version + '');
          this.readyPromise = this.fetchJson(url);

        }

      } else {

        /**
         * whatever it is (or isn't)... it doesn't matter we'll just get the
         * latest. In this case we may have cached the latest version at key 0.
         * If we have then we'll just use that instead of making a request.
         * Otherwise we'll have to load it (and then we'll cache it for next
         * time)
         */

        this.isLatest = true;

        if (GVL.CACHE.has(GVL.LATEST_CACHE_KEY)) {

          this.populate(GVL.CACHE.get(GVL.LATEST_CACHE_KEY));
          this.readyPromise = Promise.resolve();

        } else {

          this.readyPromise = this.fetchJson(url + GVL.latestFilename);

        }

      }

    }

  }

  /**
   * emptyLanguageCache
   *
   * @param {string} [lang] - Optional ISO 639-1 langauge code to remove from
   * the cache.  Should be one of the languages in GVL.consentLanguages set.
   * If not then the whole cache will be deleted.
   * @return {boolean} - true if anything was deleted from the cache
   */
  public static emptyLanguageCache(lang?: string): boolean {

    let retr = false;

    if (lang === undefined && GVL.LANGUAGE_CACHE.size > 0) {

      GVL.LANGUAGE_CACHE = new Map<string, DeclarationMap>();
      retr = true;

    } else if (typeof lang === 'string' && this.consentLanguages.has(lang.toUpperCase())) {

      GVL.LANGUAGE_CACHE.delete(lang.toUpperCase());
      retr = true;

    }

    return retr;

  }

  /**
   * emptyCache
   *
   * @param {number} [vendorListVersion] - version of the vendor list to delete
   * from the cache.  If none is specified then the whole cache is deleted.
   * @return {boolean} - true if anything was deleted from the cache
   */
  public static emptyCache(vendorListVersion?: number): boolean {

    let retr = false;

    if (Number.isInteger(vendorListVersion) && vendorListVersion >= 0) {

      GVL.CACHE.delete(vendorListVersion);
      retr = true;

    } else if (vendorListVersion === undefined) {

      GVL.CACHE = new Map<number, VendorList>();
      retr = true;

    }

    return retr;

  }

  private cacheLanguage(): void {

    if (!GVL.LANGUAGE_CACHE.has(this.lang_)) {

      GVL.LANGUAGE_CACHE.set(this.lang_, {
        purposes: this.purposes,
        specialPurposes: this.specialPurposes,
        features: this.features,
        specialFeatures: this.specialFeatures,
        stacks: this.stacks,
      });

    }

  }

  private async fetchJson(url: string): Promise<void | Error> {

    try {

      this.populate(await Json.fetch(url) as VendorList);

    } catch (err) {

      throw new GVLError(err.message);

    }

  }

  /**
   * getJson - Method for getting the JSON that was downloaded to created this
   * `GVL` object
   *
   * @return {VendorList} - The basic JSON structure without the extra
   * functionality and methods of this class.
   */
  public getJson(): VendorList {

    return JSON.parse(JSON.stringify({
      gvlSpecificationVersion: this.gvlSpecificationVersion,
      vendorListVersion: this.vendorListVersion,
      tcfPolicyVersion: this.tcfPolicyVersion,
      lastUpdated: this.lastUpdated,
      purposes: this.purposes,
      specialPurposes: this.specialPurposes,
      features: this.features,
      specialFeatures: this.specialFeatures,
      stacks: this.stacks,
      vendors: this.fullVendorList,
    }));

  }

  /**
   * changeLanguage - retrieves the purpose language translation and sets the
   * internal language variable
   *
   * @param {string} lang - ISO 639-1 langauge code to change language to
   * @return {Promise<void | GVLError>} - returns the `readyPromise` and
   * resolves when this GVL is populated with the data from the language file.
   */
  public async changeLanguage(lang: string): Promise<void | GVLError> {

    const langUpper = lang.toUpperCase();

    if (GVL.consentLanguages.has(langUpper)) {

      if (langUpper !== this.lang_) {

        this.lang_ = langUpper;

        if (GVL.LANGUAGE_CACHE.has(langUpper)) {

          const cached: DeclarationMap = GVL.LANGUAGE_CACHE.get(langUpper) as DeclarationMap;

          for (const prop in cached) {

            if (cached.hasOwnProperty(prop)) {

              this[prop] = cached[prop];

            }

          }

        } else {

          // load Language specified
          const url = GVL.baseUrl + GVL.languageFilename.replace('[LANG]', lang);

          try {

            await this.fetchJson(url);

            this.cacheLanguage();

          } catch (err) {

            throw new GVLError('unable to load language: ' + err.message);

          }

        }

      }

    } else {

      throw new GVLError(`unsupported language ${lang}`);

    }

  }

  public get language(): string {

    return this.lang_;

  }

  private isVendorList(gvlObject: object): gvlObject is VendorList {

    return gvlObject !== undefined && (gvlObject as VendorList).vendors !== undefined;

  }

  private populate(gvlObject: DeclarationMap | VendorList): void {

    /**
     * these are populated regardless of whether it's a DeclarationMap file or
     * a VendorList
     */
    this.purposes = gvlObject.purposes;
    this.purposeIds =
      new Set<number>(Object.values(this.purposes).map((purpose: Purpose): number => purpose.id ));
    this.specialPurposes = gvlObject.specialPurposes;
    this.specialPurposeIds =
      new Set<number>(Object.values(this.specialPurposes).map((purpose: Purpose): number => purpose.id));
    this.features = gvlObject.features;
    this.featureIds =
      new Set<number>(Object.values(this.features).map((feature: Feature): number => feature.id));
    this.specialFeatures = gvlObject.specialFeatures;
    this.specialFeatureIds =
      new Set<number>(Object.values(this.specialFeatures).map((feature: Feature): number => feature.id ));
    this.stacks = gvlObject.stacks;
    this.stackIds =
      new Set<number>(Object.values(this.stacks).map((stack: Stack): number => stack.id ));

    if (this.isVendorList(gvlObject)) {

      this.gvlSpecificationVersion = gvlObject.gvlSpecificationVersion;
      this.tcfPolicyVersion = gvlObject.tcfPolicyVersion;
      this.vendorListVersion = gvlObject.vendorListVersion;
      this.lastUpdated = gvlObject.lastUpdated;

      if (typeof this.lastUpdated === 'string') {

        this.lastUpdated = new Date(this.lastUpdated);

      }

      this.fullVendorList = gvlObject.vendors;

      if (this.vendorIds === undefined || this.vendorIds.size === 0) {

        this.vendorIds = new Set(Object.keys(gvlObject.vendors).map((strId: string): number => +strId));

      }

      this.mapVendors();
      this.isReady_ = true;

      if (this.isLatest) {

        /**
         * If the "LATEST" was requested then this flag will be set to true.
         * In that case we'll cache the GVL at the special key
         */

        GVL.CACHE.set(GVL.LATEST_CACHE_KEY, this.getJson());

      }

      /**
       * Whether or not it's the "LATEST" we'll cache the gvl at the version it
       * is declared to be (if it's not already). to avoid downloading it again
       * in the future.
       */
      if (!GVL.CACHE.has(this.vendorListVersion)) {

        GVL.CACHE.set(this.vendorListVersion, this.getJson());

      }

    }

    this.cacheLanguage();

  }

  private mapVendors(): void {

    // key (feature, purpose, etc) -> purposeId -> vendorId -> vendorObject
    this.vendorByDeclarationMap = new Map<Declaration, Map<number, Set<number>>>();

    this.gvlToVendorDeclaration.forEach((vendorDeclarations: Declaration[], gvlKey: string): void => {

      vendorDeclarations.forEach((vendorDeclaration: Declaration): void => {

        // purposes, features, special[etc...] map
        const declarationMap = new Map();
        this.vendorByDeclarationMap.set(vendorDeclaration, declarationMap );
        Object.keys(this[gvlKey]).forEach((id: string): void => {

          // will be the set of vendors
          declarationMap.set(+id, new Set());

        });

      });

    });

    this.vendors_ = {};

    this.vendorIds.forEach((id: number): void => {

      const vendor = this.fullVendorList[id];

      if (vendor && vendor.deletedDate === undefined) {

        this.gvlToVendorDeclaration.forEach((vendordeclarations: Declaration[]): void => {

          vendordeclarations.forEach((vendorDeclaration: Declaration): void => {

            vendor[vendorDeclaration].forEach((id: number): void => {

              this.vendorByDeclarationMap.get(vendorDeclaration).get(id).add(vendor.id);

            });

          });

        });

        this.vendors_[vendor.id] = vendor;

      } else {

        this.vendorIds.delete(id);

      }

    });

  }

  public vendorUsePreferredLegalBasis(vendorId: number, purposeId: number): void {

    /**
     * Is this vendor flexible?
     */
    if (this.vendorByDeclarationMap.get(Declaration.flexiblePurposes).get(purposeId).has(vendorId)) {

      const vendor = this.vendors[vendorId];

      if (vendor.purposes.includes(purposeId) &&
        this.vendorByDeclarationMap.get(Declaration.legIntPurposes).get(purposeId).has(vendorId)) {

        /**
         * ie. is their preferred basis consent and they're in the legInt map?
         * Then take them out of the legInt map and put them in the consent map
         */

        this.vendorByDeclarationMap.get(Declaration.legIntPurposes).get(purposeId).delete(vendorId);
        this.vendorByDeclarationMap.get(Declaration.purposes).get(purposeId).add(vendorId);

      } else if (vendor.legIntPurposes.includes(purposeId) &&
        this.vendorByDeclarationMap.get(Declaration.purposes).get(purposeId).has(vendorId)) {

        /**
         * ie. is their preferred basis legInt and they're in the consent map?
         * Then take them out of the consent map and put them in the legInt map
         */

        this.vendorByDeclarationMap.get(Declaration.purposes).get(purposeId).delete(vendorId);
        this.vendorByDeclarationMap.get(Declaration.legIntPurposes).get(purposeId).add(vendorId);

      }

    }

  }

  public vendorUseAltLegalBasis(vendorId: number, purposeId: number): void {

    /**
     * Is this vendor flexible?
     */
    if (this.vendorByDeclarationMap.get(Declaration.flexiblePurposes).get(purposeId).has(vendorId)) {

      const vendor = this.vendors[vendorId];

      if (vendor.purposes.includes(purposeId) &&
        this.vendorByDeclarationMap.get(Declaration.purposes).get(purposeId).has(vendorId)) {

        /**
         * ie. is their preferred basis consent and they're in the map for it?
         * Then take them out of the consent map and put them in the legint map
         */

        this.vendorByDeclarationMap.get(Declaration.purposes).get(purposeId).delete(vendorId);
        this.vendorByDeclarationMap.get(Declaration.legIntPurposes).get(purposeId).add(vendorId);

      } else if (vendor.legIntPurposes.includes(purposeId) &&
        this.vendorByDeclarationMap.get(Declaration.legIntPurposes).get(purposeId).has(vendorId)) {

        /**
         * ie. is their preferred basis legInt and they're in the map for it?
         * Then take them out of the legInt map and put them in the consent map
         */

        this.vendorByDeclarationMap.get(Declaration.legIntPurposes).get(purposeId).delete(vendorId);
        this.vendorByDeclarationMap.get(Declaration.purposes).get(purposeId).add(vendorId);

      }

    }

  }

  private filterIntMap<T>(fromIntMap: IntMap<T>, filter: number[]): IntMap<T> {

    const result = {};

    filter.forEach((id: number): void => {

      result[id] = fromIntMap[id];

    });

    return result;

  }

  /**
   * getVendorIdsByDeclaration
   *
   * @param {number} purposeId
   * @param {Declaration} declaration
   * @return {Set<number>} - Set of vendor ids by a given declaration
   */
  public getVendorIdsByDeclaration(purposeId: number, declaration: Declaration): Set<number> {

    return this.vendorByDeclarationMap.get(declaration).get(purposeId);

  }

  /**
   * getVendorsWithConsentPurpose
   *
   * @param {number} purposeId
   * @return {IntMap<Vendor>} - list of vendors that have declared the consent purpose id
   */
  public getVendorsWithConsentPurpose(purposeId: number): IntMap<Vendor> {

    return this.filterIntMap(this.vendors, Array.from(this.getVendorIdsByDeclaration(purposeId, Declaration.purposes)));

  }

  /**
   * getVendorsWithLegIntPurpose
   *
   * @param {number} purposeId
   * @return {IntMap<Vendor>} - list of vendors that have declared the legInt (Legitimate Interest) purpose id
   */
  public getVendorsWithLegIntPurpose(purposeId: number): IntMap<Vendor> {

    return this.filterIntMap(this.vendors, Array.from(this.getVendorIdsByDeclaration(purposeId, Declaration.legIntPurposes)));

  }

  /**
   * getVendorsWithFlexiblePurpose
   *
   * @param {number} purposeId
   * @return {IntMap<Vendor>} - list of vendors that have declared the flexible purpose id
   */
  public getVendorsWithFlexiblePurpose(purposeId: number): IntMap<Vendor> {

    return this.filterIntMap(this.vendors, Array.from(this.getVendorIdsByDeclaration(purposeId, Declaration.flexiblePurposes)));

  }

  /**
   * getVendorsWithSpecialPurpose
   *
   * @param {number} specialPurposeId
   * @return {IntMap<Vendor>} - list of vendors that have declared the special purpose id
   */
  public getVendorsWithSpecialPurpose(specialPurposeId: number): IntMap<Vendor> {

    return this.filterIntMap(this.vendors, Array.from(this.getVendorIdsByDeclaration(specialPurposeId, Declaration.specialPurposes)));

  }

  /**
   * getVendorsWithFeature
   *
   * @param {number} featureId
   * @return {IntMap<Vendor>} - list of vendors that have declared the feature id
   */
  public getVendorsWithFeature(featureId: number): IntMap<Vendor> {

    return this.filterIntMap(this.vendors, Array.from(this.getVendorIdsByDeclaration(featureId, Declaration.features)));

  }

  /**
   * getVendorsWithSpecialFeature
   *
   * @param {number} specialFeatureId
   * @return {IntMap<Vendor>} - list of vendors that have declared the special feature id
   */
  public getVendorsWithSpecialFeature(specialFeatureId: number): IntMap<Vendor> {

    return this.filterIntMap(this.vendors, Array.from(this.getVendorIdsByDeclaration(specialFeatureId, Declaration.specialFeatures)));

  }

  /**
   * vendors
   *
   * @return {IntMap<Vendor>} - the list of vendors as it would on the JSON file
   * except if `narrowVendorsTo` was called, it would be that narrowed list
   */
  public get vendors(): IntMap<Vendor> {

    return this.vendors_;

  }

  /**
   * narrowVendorsTo - narrows vendors represented in this GVL to the list of ids passed in
   *
   * @param {number[] | Set<number>} vendorIds - list of ids to narrow this GVL to
   * @return {void}
   */
  public narrowVendorsTo(vendorIds: number[] | Set<number>): void {

    if (Array.isArray(vendorIds)) {

      this.vendorIds = new Set(vendorIds);

    } else {

      this.vendorIds = vendorIds;

    }

    this.mapVendors();

  }

  /**
   * isReady - Whether or not this instance is ready to be used.  This will be
   * immediately and synchronously true if a vendorlist object is passed into
   * the constructor or once the JSON vendorllist is retrieved.
   *
   * @return {boolean} whether or not the instance is ready to be interacted
   * with and all the data is populated
   */
  public get isReady(): boolean {

    return this.isReady_;

  }

  /**
   * clone - overrides base `clone()` method since GVL is a special class that
   * represents a JSON structure with some additional functionality
   *
   * @return {GVL}
   */
  public clone(): GVL {

    return new GVL(this.getJson());

  }

  public static isInstanceOf(questionableInstance: unknown): questionableInstance is GVL {

    const isSo = typeof questionableInstance === 'object';
    return (isSo && typeof (questionableInstance as GVL).narrowVendorsTo === 'function');

  }

}
