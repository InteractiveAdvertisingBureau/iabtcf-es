import {CmpApiModel} from '../src/CmpApiModel';
import {GVL} from '@iabtcf/core';
import * as path from 'path';
import {XMLHttpTestTools, TestCollector} from '@iabtcf/testing';

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

describe('@iabtcf/cmpapi', (): void => {

  beforeEach((): void => {

    CmpApiModel.reset();
    XMLHttpTestTools.beforeEach();
    GVL.emptyCache();

  });

  TestCollector.requireTests(__dirname);
  TestCollector.eslintTests([path.join(__dirname, '../src'), __dirname]);

});
