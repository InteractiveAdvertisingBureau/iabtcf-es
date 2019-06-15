import {Json} from './Json';
import {GVLError} from './errors/GVLError';
import {GVLSchema, Purposes, Features, Vendors, SpecialPurposes, SpecialFeatures, Stacks} from './model/GVLSchema';

type VersionOrObject = string | number | object;

/**
 * TODO: consider alternate url schemes
 */

class GVL implements GVLSchema {

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

  public lastUpdated: string | Date;

  /**
   * @param {Purposes} a collection of [[Purpose]]s
   */
  public purposes: Purposes;

  /**
   * @param {Purposes} a collection of [[Purpose]]s
   */
  public specialPurposes: SpecialPurposes;

  /**
   * @param {Features} a collection of [[Feature]]s
   */
  public features: Features;

  /**
   * @param {Features} a collection of [[Feature]]s
   */
  public specialFeatures: SpecialFeatures;

  /**
   * @param {Features} a collection of [[Vendor]]s
   */
  public vendors: Vendors;

  /**
   * @param {Features} a collection of [[Stack]]s
   */
  public stacks: Stacks;

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
    this.vendors = gvlObject.vendors;
    this.stacks = gvlObject.stacks;

  }


}

export {GVL};
