import * as bst from './model/BinarySearchTree.test';
import * as bl from './model/BitLength.test';
import * as pr from './model/PurposeRestriction.test';
import * as prv from './model/PurposeRestrictionVector.test';
import * as vect from './model/Vector.test';

describe('Models', (): void => {

  bst.run();
  bl.run();
  pr.run();
  prv.run();
  vect.run();

});
