import {CmpApiModel} from '../src/CmpApiModel';
import {GVL} from '@cookiehub/iabtcf-core';
import * as path from 'path';
import {XMLHttpTestTools, TestCollector} from '@cookiehub/iabtcf-testing';
import {fileURLToPath} from 'url';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-var-requires */
declare global {
  interface Window {
    __tcfapi: (
      command: any,
      version: any,
      callback: (...params: any) => void,
      ...param: any
    ) => void;

  }
}

GVL.baseUrl = 'http://sweetcmp.mgr.consensu.org';

describe('@cookiehub/iabtcf-cmpapi', (): void => {

  beforeEach((): void => {

    CmpApiModel.reset();
    XMLHttpTestTools.beforeEach();
    GVL.emptyCache();

  });

  TestCollector.requireTests(__dirname);
  TestCollector.eslintTests([path.join(__dirname, '../src'), __dirname]);

});
