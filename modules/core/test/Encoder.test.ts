import * as bitLength from './encoder/BitLength.test';
import * as bool from './encoder/BooleanEncoder.test';
import * as date from './encoder/DateEncoder.test';
import * as int from './encoder/IntEncoder.test';
import * as lang from './encoder/LangEncoder.test';
import * as fixedVector from './encoder/FixedVectorEncoder.test';
import * as vendorVector from './encoder/VendorVectorEncoder.test';
import * as purposeRestrictions from './encoder/PurposeRestrictionVectorEncoder.test';
import * as coreFieldSequence from './encoder/CoreFieldSequence.test';
import * as segmentEncoderMap from './encoder/SegmentEncoderMap.test';
import * as base64 from './encoder/Base64Url.test';
import * as coreTC from './encoder/CoreTCEncoder.test';
import * as oobVendorsEncoder from './encoder/OOBVendorsEncoder.test';
import * as publisherTC from './encoder/PublisherTCEncoder.test';

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
    purposeRestrictions.run();

  });
  describe('Segment Encoders', (): void => {

    coreTC.run();
    oobVendorsEncoder.run();
    publisherTC.run();

  });

  // others
  coreFieldSequence.run();
  segmentEncoderMap.run();

});
