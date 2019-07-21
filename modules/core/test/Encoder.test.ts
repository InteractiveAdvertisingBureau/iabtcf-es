import * as bitLength from './encoder/BitLength.test';
import * as bool from './encoder/BooleanEncoder.test';
import * as date from './encoder/DateEncoder.test';
import * as int from './encoder/IntEncoder.test';
import * as lang from './encoder/LangEncoder.test';
import * as fixedVector from './encoder/FixedVectorEncoder.test';
import * as vendorVector from './encoder/VendorVectorEncoder.test';
import * as purposeRestrictions from './encoder/PurposeRestrictionVectorEncoder.test';
import * as coreFieldSequence from './encoder/CoreFieldSequence.test';

describe('Encoder', (): void => {

  bitLength.run();

  // more primitive types
  bool.run();
  date.run();
  int.run();
  lang.run();

  // vector-based types
  fixedVector.run();
  vendorVector.run();
  purposeRestrictions.run();

  // others
  coreFieldSequence.run();

});
