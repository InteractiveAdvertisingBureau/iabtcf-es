import * as fs from 'fs';
import lint from 'mocha-eslint';
import * as path from 'path';
import {GVL} from '../src/GVL';
import {XMLHttpTestTools} from '@iabtcf/testing';

const walkRequire = (directoryName: string): void => {

  const fileNames = fs.readdirSync(directoryName);

  fileNames.forEach((fileName: string): void => {

    const fullPath = path.join(directoryName, fileName);

    if (fs.statSync(fullPath).isDirectory()) {

      describe(fileName + '/', (): void => {

        walkRequire(fullPath);

      });

    } else if (fullPath.indexOf('.test.ts') === fullPath.length - 8) {

      require(fullPath);

    }

  });

};

describe('@iabtcf/core', (): void => {

  beforeEach((): void => {

    XMLHttpTestTools.beforeEach();
    GVL.emptyCache();
    GVL.emptyLanguageCache();

  });

  walkRequire(__dirname);

  lint([`./src/**/*.{ts}`], {
    alwaysWarn: false,
  });

});
