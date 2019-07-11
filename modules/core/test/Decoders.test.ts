import * as bool from './decoders/BooleanDecoder.test';
import * as date from './decoders/DateDecoder.test';
import * as fvd from './decoders/FixedVectorDecoder.test';
import * as int from './decoders/IntDecoder.test';
import * as lang from './decoders/LangDecoder.test';
import * as vvd from './decoders/VendorVectorDecoder.test';

describe('Decoders', (): void => {

  bool.run();
  date.run();
  fvd.run();
  int.run();
  lang.run();
  vvd.run();

});
