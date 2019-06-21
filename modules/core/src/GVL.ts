import {Json} from './Json';
import {GVLError} from './errors/GVLError';
import {
  Feature,
  Purpose,
  Vendor,
  Stack,
  GVLMap,
  GVLSchema,
  ByPurposeVendorMap,
  ByFeatureVendorMap,
  BySpecialFeatureVendorMap,
}
  from './model/GVLSchema';

export type VersionOrObject = string | number | object;
type PurposeOrFeature = 'purpose' | 'feature';
type PORFSubType = 'consent' | 'legInt' | 'flexible' | 'features' | 'specialFeatures';

/**
 * class with utilities for managing the global vendor list.  Will use JSON to
 * fetch the vendor list from specified url and will serialize it into this
 * object and provide accessors.  Provides ways to group vendors on the list by
 * purpose and feature.
 */
class GVL {

  /**
   * @static
   * @param {string} - the base url to load the vendor-list.json from.  This is
   * broken out from the filename because it follows a different scheme for
   * latest file vs versioned files.
   */
  public static baseUrl: string;

  /**
   * @static
   * @param {string} - the latest is assumed to be vendor-list.json because
   * that is what the iab uses, but it could be different... if you want
   */
  public static latestFilename: string = 'vendor-list.json';

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
  public static versionedFilename: string = 'archives/vendor-list-v[VERSION].json';

  /**
   * @param {Promise} resolved when this GVL object is populated with the data
   * from the [[GVLSchema]] or rejected if there is an error
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
   * @param {GVLMap<Purpose>} a collection of [[Purpose]]s
   */
  public purposes: GVLMap<Purpose>;

  /**
   * @param {GVLMap<Purpose>} a collection of [[Purpose]]s
   */
  public specialPurposes: GVLMap<Purpose>;

  /**
   * @param {GVLMap<Feature>} a collection of [[Feature]]s
   */
  public features: GVLMap<Feature>;

  /**
   * @param {GVLMap<Feature>} a collection of [[Feature]]s
   */
  public specialFeatures: GVLMap<Feature>;

  /**
   * @param {GVLMap<Vendor>} a collection of [[Vendor]]s
   */
  private vendors_: GVLMap<Vendor>;

  /**
   * @param {GVLMap<Vendor>} a collection of [[Vendor]]. Used as a backup if a whitelist is sets
   */
  private fullVendorList: GVLMap<Vendor>;

  /**
   * @param {ByPurposeVendorMap} vendors by purpose
   */
  private byPurposeVendorMap: ByPurposeVendorMap;

  /**
   * @param {ByFeatureVendorMap} vendors by feature
   */
  private byFeatureVendorMap: ByFeatureVendorMap;

  /**
   * @param {BySpecialFeatureVendorMap} vendors by special feature
   */
  private bySpecialFeatureVendorMap: BySpecialFeatureVendorMap;

  /**
   * @param {GVLMap<Stack>} a collection of [[Stack]]s
   */
  public stacks: GVLMap<Stack>;

  /**
   * @param {VersionOrObject} [versionOrObject] - can be either the
   * Json object that is the GVL or a version number represented as a string or
   * number to download.  If nothing is passed the latest version of the GVL
   * will be loaded
   */
  public constructor( versionOrObject?: VersionOrObject ) {

    // should have been configured before and instance was created and will persist through the app
    let url = GVL.baseUrl;

    if (typeof versionOrObject === 'object') {

      this.deserialize(versionOrObject as GVLSchema);
      this.readyPromise = new Promise((resolve: Function): void => {

        resolve();

      });

    } else {

      if (!url) {

        throw new GVLError('must specify GVL.baseUrl before loading GVL json');

      }

      // if a trailing slash was forgotten
      if (url[url.length - 1] !== '/') {

        url += '/';

      }

      if (versionOrObject as number > 0) {

        // load version specified
        url += GVL.versionedFilename.replace('[VERSION]', versionOrObject + '');
        this.getGVL(url);

      } else {

        // whatever it is (or isn't)... it doesn't matter we'll just get the latest
        url += GVL.latestFilename;
        this.getGVL(url);

      }

    }

  }

  private getGVL(url: string): void {

    this.readyPromise = new Promise((resolve: Function, reject: Function): void => {

      Json.fetch(url).then((response: object): void => {

        this.deserialize(response as GVLSchema);
        resolve();

      })
        .catch((err: Error): void => {

          reject(new GVLError(err.message));

        });

    });

  }

  private deserialize(gvlObject: GVLSchema): void {

    this.gvlSpecificationVersion = gvlObject.gvlSpecificationVersion;
    this.vendorListVersion = gvlObject.vendorListVersion;
    this.tcfPolicyVersion = gvlObject.tcfPolicyVersion;
    this.lastUpdated = gvlObject.lastUpdated;
    if (typeof this.lastUpdated === 'string') {

      this.lastUpdated = new Date(this.lastUpdated);

    }
    this.purposes = gvlObject.purposes;
    this.specialPurposes = gvlObject.specialPurposes;
    this.features = gvlObject.features;
    this.specialFeatures = gvlObject.specialFeatures;
    this.vendors_ = gvlObject.vendors;
    this.fullVendorList = gvlObject.vendors;
    this.mapVendors();
    this.stacks = gvlObject.stacks;

  }

  private mapVendors(): void {

    // create new instances of the maps
    this.byPurposeVendorMap = {};
    this.byFeatureVendorMap = {};
    this.bySpecialFeatureVendorMap = {};

    // initializes data structure for purpose map
    Object.keys(this.purposes).forEach((purposeId: string): void => {

      this.byPurposeVendorMap[purposeId] = {
        legInt: new Set<number>(),
        consent: new Set<number>(),
        flexible: new Set<number>(),
      };

    });

    // initializes data structure for feature map
    Object.keys(this.features).forEach((featureId: string): void => {

      this.byFeatureVendorMap[featureId] = {
        features: new Set<number>(),
      };

    });

    // initializes data structure for feature map
    Object.keys(this.specialFeatures).forEach((featureId: string): void => {

      this.bySpecialFeatureVendorMap[featureId] = {
        features: new Set<number>(),
      };

    });

    // assigns vendor ids to their respective maps
    Object.keys(this.vendors_).forEach((vendorId: string): void => {

      const vendor: Vendor = this.vendors_[vendorId];
      const numVendorId: number = parseInt(vendorId, 10);

      vendor.purposeIds.forEach((purposeId: number): void => {

        const purpGroup = this.byPurposeVendorMap[purposeId + ''];

        purpGroup.consent.add(numVendorId);

      });

      vendor.legIntPurposeIds.forEach((purposeId: number): void => {

        this.byPurposeVendorMap[purposeId + ''].legInt.add(numVendorId);

      });

      // could not be there
      if (vendor.flexiblePurposeIds) {

        vendor.flexiblePurposeIds.forEach((purposeId: number): void => {

          this.byPurposeVendorMap[purposeId + ''].flexible.add(numVendorId);

        });

      }

      vendor.featureIds.forEach((featureId: number): void => {

        this.byFeatureVendorMap[featureId + ''].features.add(numVendorId);

      });

      vendor.specialFeatureIds.forEach((featureId: number): void => {

        this.bySpecialFeatureVendorMap[featureId + ''].features.add(numVendorId);

      });

    });

  }

  private getFilteredVendors(purposeOrFeature: PurposeOrFeature, id: number, subType: PORFSubType): GVLMap<Vendor> {

    const properPurposeOrFeature: string = purposeOrFeature.charAt(0).toUpperCase() + purposeOrFeature.slice(1);
    const mySet: Set<number> = this['by' + properPurposeOrFeature + 'VendorMap'][id + ''][subType];
    const retr: GVLMap<Vendor> = {};

    mySet.forEach((vendorId: number): void => {

      retr[vendorId + ''] = this.vendors[vendorId + ''];

    });

    return retr;

  }

  public getVendorsWithConsentPurpose(purposeId: number): GVLMap<Vendor> {

    return this.getFilteredVendors('purpose', purposeId, 'consent');

  }
  public getVendorsWithLegIntPurpose(purposeId: number): GVLMap<Vendor> {

    return this.getFilteredVendors('purpose', purposeId, 'legInt');

  }
  public getVendorsWithFlexiblePurpose(purposeId: number): GVLMap<Vendor> {

    return this.getFilteredVendors('purpose', purposeId, 'flexible');

  }
  public getVendorsWithFeature(featureId: number): GVLMap<Vendor> {

    return this.getFilteredVendors('feature', featureId, 'features');

  }
  public getVendorsWithSpecialFeature(featureId: number): GVLMap<Vendor> {

    return this.getFilteredVendors('feature', featureId, 'specialFeatures');

  }

  public get vendors(): GVLMap<Vendor> {

    return this.vendors_;

  }

  public setWhiteList(ids: number[]): void {

    this.vendors_ = {};
    ids.forEach((id: number): void => {

      const strId = id + '';

      if (this.fullVendorList[strId]) {

        this.vendors[strId] = this.fullVendorList[strId];

      }

    });
    this.mapVendors();

  }


}

export {GVL};
