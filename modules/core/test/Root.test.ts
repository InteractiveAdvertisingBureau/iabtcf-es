import {XMLHttpTestTools} from '@iabtcf/testing';
import {GVL} from '../src/GVL';

beforeEach((): void => {

  XMLHttpTestTools.beforeEach();
  GVL.emptyCache();
  GVL.emptyLanguageCache();

});
