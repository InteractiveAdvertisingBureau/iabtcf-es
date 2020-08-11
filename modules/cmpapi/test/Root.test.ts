import {CmpApiModel} from '../src/CmpApiModel';
import {GVL} from '@iabtcf/core';
import {XMLHttpTestTools} from '@iabtcf/testing';

GVL.baseUrl = 'http://sweetcmp.mgr.consensu.org';
beforeEach((): void => {

  CmpApiModel.reset();
  XMLHttpTestTools.beforeEach();
  GVL.emptyCache();

});
