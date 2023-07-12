import {GVL} from '@iabtechlabtcf/core';
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class GVLFactory {

  public static getVersion(version: number): GVL {

    const json = JSON.parse(fs.readFileSync(__dirname + `/vendorlist/vendor-list-v${version}.json`).toString());
    return new GVL(json);

  }

  public static getLatest(): GVL {

    const json = JSON.parse(fs.readFileSync(__dirname + '/vendorlist/vendor-list.json').toString());
    return new GVL(json);

  }

}
