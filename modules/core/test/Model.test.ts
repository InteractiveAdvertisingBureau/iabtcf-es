import * as bst from './model/BinarySearchTree.test';
import * as pr from './model/PurposeRestriction.test';
import * as prv from './model/PurposeRestrictionVector.test';
import * as vect from './model/Vector.test';

describe('Model', (): void => {

  bst.run();
  pr.run();
  prv.run();
  vect.run();

});
