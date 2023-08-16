import {GVL} from '@didomi/iabtcf-core';

export class GVLFactory {

  public static getVersion(version: number, schema = 'v2'): GVL {

    return new GVL(require(`./vendorlist/${schema}/vendor-list-v${version}.json`));

  }

  public static getLatest(schema = 'v2'): GVL {

    return new GVL(require(`./vendorlist/${schema}/vendor-list.json`));

  }

}
