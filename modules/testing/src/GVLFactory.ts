import {GVL} from '@iabtcf/core';

export class GVLFactory {

  public static getVersion(version: number): GVL {

    return new GVL(require(`./vendorlist/vendor-list-v${version}.json`));

  }

  public static getLatest(): GVL {

    return new GVL(require('./vendorlist/vendor-list.json'));

  }

}
