import * as bitLength from './encoder/BitLength.test';
import * as bool from './encoder/BooleanEncoder.test';
import * as date from './encoder/DateEncoder.test';
import * as int from './encoder/IntEncoder.test';
import * as lang from './encoder/LangEncoder.test';
import * as fixedVector from './encoder/FixedVectorEncoder.test';
import * as vendorVector from './encoder/VendorVectorEncoder.test';
import * as segmentEncoder from './encoder/SegmentEncoder.test';
import * as segmentSequence from './encoder/SegmentSequence.test';
// import * as purposeRestrictions from './encoder/PurposeRestrictionVectorEncoder.test';
import * as base64 from './encoder/Base64Url.test';

describe('Encoder', (): void => {

  base64.run();

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
    //  purposeRestrictions.run();

  });
  describe('Sequence', (): void => {

    segmentSequence.run();

  });
  describe('Segment Encoder', (): void => {

    segmentEncoder.run();

  });

});
