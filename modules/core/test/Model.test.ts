import * as b64 from './model/Base64Url.test';
import * as bst from './model/BinarySearchTree.test';
import * as bl from './model/BitLength.test';
import * as pr from './model/PurposeRestriction.test';
import * as prv from './model/PurposeRestrictionVector.test';
import * as vect from './model/Vector.test';

describe('Models', (): void => {

  b64.run();
  bst.run();
  bl.run();
  pr.run();
  prv.run();
  vect.run();

});
