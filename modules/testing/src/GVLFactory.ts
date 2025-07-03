import {GVL} from '@iabtechlabtcf/core';
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class GVLFactory {

  public static getVersion(version: number, schema = 'v2'): GVL {

    const json = JSON.parse(fs.readFileSync(__dirname + `/vendorlist/${schema}/vendor-list-v${version}.json`).toString());
    return new GVL(json);

  }

  public static getLatest(schema = 'v2'): GVL {

    const json = JSON.parse(fs.readFileSync(__dirname + `/vendorlist/${schema}/vendor-list.json`).toString());
    return new GVL(json);

  }

}
