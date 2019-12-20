import {GVL} from '@iabtcf/core';
import {VendorList} from '@iabtcf/core';

export class GVLFactory {

  public static getVersion(version: number): GVL {

    return new GVL( this.getJSONVersion(version));

  }

  public static getJSONVersion(version: number): VendorList {

    return require(`./vendorlist/vendor-list-v${version}.json`);

  }

  public static getLatest(): GVL {

    return new GVL(this.getJSONLatest());

  }

  public static getJSONLatest(): GVL {

    return require('./vendorlist/vendor-list.json');

  }

}
