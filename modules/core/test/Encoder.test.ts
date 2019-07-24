import * as bitLength from './encoder/BitLength.test';
import * as bool from './encoder/BooleanEncoder.test';
import * as date from './encoder/DateEncoder.test';
import * as int from './encoder/IntEncoder.test';
import * as lang from './encoder/LangEncoder.test';
import * as fixedVector from './encoder/FixedVectorEncoder.test';
import * as vendorVector from './encoder/VendorVectorEncoder.test';
import * as purposeRestrictions from './encoder/PurposeRestrictionVectorEncoder.test';
import * as coreFieldSequence from './encoder/CoreFieldSequence.test';
import * as base64 from './encoder/Base64Url.test';
import * as coreTC from './encoder/CoreTCStringEncoder.test';
import * as vendorsDisclosed from './encoder/VendorsDisclosedEncoder.test';
import * as vendorsAllowed from './encoder/VendorsAllowedEncoder.test';

describe('Encoder', (): void => {

  bitLength.run();

  // more primitive types
  describe('Typed Encoders', (): void => {

    bool.run();
    date.run();
    int.run();
    lang.run();

  });

  // vector-based types
  describe('Vector Encoders', (): void => {

    fixedVector.run();
    vendorVector.run();
    purposeRestrictions.run();

  });
  describe('Segment Encoders', (): void => {

    coreTC.run();
    vendorsDisclosed.run();
    vendorsAllowed.run();

  });


  // others
  coreFieldSequence.run();
  base64.run();

});
