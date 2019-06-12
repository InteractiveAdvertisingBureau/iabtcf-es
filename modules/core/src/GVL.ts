import {Json} from './Json';
import {GVLError} from './errors/GVLError';
import {GVLSchema, Purposes, Features, Vendors, SpecialPurposes, SpecialFeatures, Stacks} from './GVLSchema';

type VersionOrObject = string | number | object;

/**
 * TODO: consider alternate url schemes
 */

class GVL implements GVLSchema {

  /**
   * @static
   * @param {string} baseUrl - base path (everything except the file name)
   */
  public static baseUrl: string;
  /**
   * @static
   * @param {string} filename - filename assumed to be vendorlist.json, but it could be different... if you want
   */
  public static filename: string = 'vendorlist.json';


  /**
   * @param {Promise} readyPromise - resolved when this object is populated or rejected if there is an error
   */
  public readyPromise: Promise<void | GVLError>;

  /**
   * @param {number} gvlSpecificationVersion - schema version for the GVL that is used
   */
  public gvlSpecificationVersion: number;

  /**
   * @param {number} vendorListVersion - incremented with each published file change
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
   * @param {number} vendorListVersion - incremented with each published file change
   */
  public lastUpdated: string | Date;

  public purposes: Purposes;
  public specialPurposes: SpecialPurposes;
  public features: Features;
  public speciaLFeatures: SpecialFeatures;
  public vendors: Vendors;
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

    } else if (versionOrObject as number > 0) {

      if (!url) {

        throw new GVLError('must specify GVL.baseUrl before loading GVL json');

      }

      // load version specified
      url += 'v-' + versionOrObject + '/' + GVL.filename;
      this.getGVL(url);

    } else {

      if (!url) {

        throw new GVLError('must specify GVL.baseUrl before loading GVL json');

      }

      // whatever it is (or isn't)... it doesn't matter we'll just get the latest
      url += GVL.filename;
      this.getGVL(url);

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
    this.speciaLFeatures = gvlObject.speciaLFeatures;
    this.vendors = gvlObject.vendors;
    this.stacks = gvlObject.stacks;

  }


}

export {GVL};
