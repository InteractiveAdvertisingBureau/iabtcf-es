import * as bool from './decoder/BooleanDecoder.test';
import * as date from './decoder/DateDecoder.test';
import * as fvd from './decoder/FixedVectorDecoder.test';
import * as int from './decoder/IntDecoder.test';
import * as lang from './decoder/LangDecoder.test';
import * as vvd from './decoder/VendorVectorDecoder.test';

describe('Decoders', (): void => {

  bool.run();
  date.run();
  fvd.run();
  int.run();
  lang.run();
  vvd.run();

});
