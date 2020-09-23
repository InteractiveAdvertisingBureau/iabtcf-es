import {XMLHttpTestTools, TestCollector} from '@iabtcf/testing';
import * as path from 'path';
import {GVL} from '../src/GVL';

describe('@iabtcf/core', (): void => {

  beforeEach((): void => {

    XMLHttpTestTools.beforeEach();
    GVL.emptyCache();
    GVL.emptyLanguageCache();

  });

  afterEach((): void => {

    /**
     * remove anything added to the body
     */

    for (let i = 0; i < document.body.children.length; i++) {

      const ele = document.body.children.item(i);

      ele.parentNode.removeChild(ele);

    }

  });

  TestCollector.requireTests(__dirname);
  TestCollector.eslintTests([path.join(__dirname, '../src'), __dirname]);

});
