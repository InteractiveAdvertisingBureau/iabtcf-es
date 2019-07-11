import * as bool from './encoders/BooleanEncoder.test';
import * as date from './encoders/DateEncoder.test';
import * as fvd from './encoders/FixedVectorEncoder.test';
import * as int from './encoders/IntEncoder.test';
import * as lang from './encoders/LangEncoder.test';
import * as vve from './encoders/VendorVectorEncoder.test';
import * as pre from './encoders/PurposeRestrictionsEncoder.test';

describe('Encoders', (): void => {

  bool.run();
  date.run();
  fvd.run();
  int.run();
  lang.run();
  vve.run();
  pre.run();

});
