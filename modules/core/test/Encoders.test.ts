import * as bool from './encoder/BooleanEncoder.test';
import * as date from './encoder/DateEncoder.test';
import * as fvd from './encoder/FixedVectorEncoder.test';
import * as int from './encoder/IntEncoder.test';
import * as lang from './encoder/LangEncoder.test';
import * as vve from './encoder/VendorVectorEncoder.test';
import * as pre from './encoder/PurposeRestrictionsEncoder.test';

describe('Encoders', (): void => {

  bool.run();
  date.run();
  fvd.run();
  int.run();
  lang.run();
  vve.run();
  pre.run();

});
