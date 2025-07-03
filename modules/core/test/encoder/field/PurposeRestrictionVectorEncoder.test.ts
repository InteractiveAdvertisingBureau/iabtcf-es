import {PurposeRestrictionVectorEncoder, IntEncoder} from '../../../src/encoder/field';
import {expect} from 'chai';
import {PurposeRestrictionVector, PurposeRestriction, RestrictionType} from '../../../src/model';
import {BitLength} from '../../../src/encoder';
import {GVL} from '../../../src/GVL';
import {makeRandomInt, sameDataDiffRef, GVLFactory} from '@iabtechlabtcf/testing';
import {BooleanEncoder} from '../../../lib/mjs';

const randomize = (ar: number[]): number[] => {

  for (let i = ar.length - 1; i >= 0; i --) {

    const randIndex = Math.floor(Math.random() * i);
    const swap = ar[i];
    ar[i] = ar[randIndex];
    ar[randIndex] = swap;

  }

  return ar;

};

describe('encoder/field->PurposeRestrictionVectorEncoder', (): void => {

  it(`should return ${BitLength.numRestrictions} 0's for an empty PurposeRestrictionVector`, (): void => {

    const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();
    const encoded: string = PurposeRestrictionVectorEncoder.encode(prVector);

    expect(encoded).to.equal('0'.repeat(BitLength.numRestrictions));

  });

  it('should create one restriction group and two vendor ranges', (): void => {

    const purposeId = 2;
    /**
     * Vendors with IDs 6, 8 are consecutive
     * and they should be encoded as a single
     * vendor range and consecutive vendor 686
     * should be encoded as a separate section
     */
    const vendors: number[] = randomize([6, 8, 686]);
    const purposeRestriction: PurposeRestriction =
      new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

    const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

    prVector.gvl = GVLFactory.getVersion(23) as unknown as GVL;

    for (let i = 0; i < vendors.length; i++) {

      prVector.add(vendors[i], purposeRestriction);

    }

    /**
       * ORDER:
       * num pub restrictions
       * purposeId
       * restrictionType
       * numEntries
       * ----
       * singleOrRange
       * startVendorId
       * endVendorId (may not be there)
       */
    const encoded: string = PurposeRestrictionVectorEncoder.encode(prVector);
    let index = 0;

    expect(encoded, 'encoded string').not.to.be.empty;

    // num restrictions
    const numRestrictions: number = IntEncoder.decode(encoded.substr(index, BitLength.numRestrictions), BitLength.numRestrictions);

    expect(numRestrictions, 'numRestrictions').to.equal(prVector.numRestrictions);
    index += BitLength.numRestrictions;

    // purposeId
    const purpId: number = IntEncoder.decode(encoded.substr(index, BitLength.purposeId), BitLength.purposeId);

    expect(purpId, 'purpId').to.equal(purposeId);
    index += BitLength.purposeId;

    // restrictionType
    const restrictionType: number = IntEncoder.decode(encoded.substr(index, BitLength.restrictionType), BitLength.restrictionType);

    expect(restrictionType, 'restrictionType').to.equal(RestrictionType.NOT_ALLOWED);
    index += BitLength.restrictionType;

    // numEntries
    const numEntries: number = IntEncoder.decode(encoded.substr(index, BitLength.numEntries), BitLength.numEntries);

    expect(numEntries, 'numEntries').to.equal(2);
    index += BitLength.numEntries;

  });

  it('should create one restriction group and one vendor range if only consecutive vendors from the GVL are used', (): void => {

    const purposeId = 2;
    /**
     * Vendors with IDs 12, 15, 18 and 23 are consecutive
     * vendor IDs in the vendor list and they should be
     * encoded as a single range
     */
    const vendors: number[] = randomize([12, 15, 18, 23]);
    const purposeRestriction: PurposeRestriction =
        new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

    const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

    prVector.gvl = GVLFactory.getVersion(23) as unknown as GVL;

    for (let i = 0; i < vendors.length; i++) {

      prVector.add(vendors[i], purposeRestriction);

    }

    /**
       * ORDER:
       * num pub restrictions
       * purposeId
       * restrictionType
       * numEntries
       * ----
       * singleOrRange
       * startVendorId
       * endVendorId (may not be there)
       */
    const encoded: string = PurposeRestrictionVectorEncoder.encode(prVector);
    let index = 0;

    expect(encoded, 'encoded string').not.to.be.empty;

    // num restrictions
    const numRestrictions: number = IntEncoder.decode(encoded.substr(index, BitLength.numRestrictions), BitLength.numRestrictions);

    expect(numRestrictions, 'numRestrictions').to.equal(prVector.numRestrictions);
    index += BitLength.numRestrictions;

    // purposeId
    const purpId: number = IntEncoder.decode(encoded.substr(index, BitLength.purposeId), BitLength.purposeId);

    expect(purpId, 'purpId').to.equal(purposeId);
    index += BitLength.purposeId;

    // restrictionType
    const restrictionType: number = IntEncoder.decode(encoded.substr(index, BitLength.restrictionType), BitLength.restrictionType);

    expect(restrictionType, 'restrictionType').to.equal(RestrictionType.NOT_ALLOWED);
    index += BitLength.restrictionType;

    // numEntries
    const numEntries: number = IntEncoder.decode(encoded.substr(index, BitLength.numEntries), BitLength.numEntries);

    expect(numEntries, 'numEntries').to.equal(1);
    index += BitLength.numEntries;

  });

  it('should create restriction groups and all with vendor range if only consecutive vendors from the GVL with narrowed vendors', (): void => {

    const narrowVendors: number[] = randomize([
      173, 1204, 458, 855, 1228, 788, 1189, 885, 136, 251, 178, 1060, 667, 138, 157,
      517, 1020, 1025, 686, 737, 438, 1145, 956, 1126, 1122, 1003, 459, 948, 92, 58,
      40, 830, 767, 649, 57, 953, 37, 377, 539, 1019, 50, 790, 39, 14, 93, 22, 81,
      264, 565, 384, 224, 6, 66, 507, 410, 195, 27, 259, 785, 793, 148, 23, 780,
      733, 354, 797, 394, 783, 561, 598, 956, 46, 907, 647, 983, 771, 801, 12, 508,
      30, 87, 212, 462, 128, 185, 86, 625, 94, 163, 422, 792, 329, 945, 315, 810,
      243, 285, 416, 77, 56, 591, 630, 868, 91, 1026, 875, 938, 440, 209, 707, 1029,
      735, 852, 126, 1075, 434, 584, 110, 796, 168, 929, 8, 213, 183, 24, 1050, 312,
      1, 120, 795, 100, 78, 323, 159, 119, 262, 870, 731, 328, 845, 758, 536, 967,
      580, 755, 657, 98, 295, 1031, 881, 856, 431, 316, 131, 921, 606, 253, 10, 730,
      946, 333, 452, 150, 278, 436, 991, 252, 294, 62, 747, 528, 63, 544, 424, 871,
      67, 804, 254, 97, 109, 95, 511, 846, 153, 1081, 52, 102, 599, 228, 142, 475,
      152, 703, 101, 230, 302, 898, 72, 34, 982, 521, 129, 468, 812, 373, 31, 509,
      241, 883, 602, 69, 488, 385, 772, 559, 164, 139, 361, 766, 903, 140, 177, 297,
      887, 952, 226, 76, 808, 835, 11, 60, 290, 192, 800, 787, 922, 759, 232, 71, 4,
      16, 506, 350, 371, 84, 80, 111, 276, 261, 68, 82, 161, 45, 115, 531, 246, 134,
      937, 61, 857, 104, 590, 13, 1077, 655, 165, 114, 484, 275, 42, 89, 786, 132,
      44, 345, 577, 382, 21, 819, 423, 28, 242, 1015, 829, 831, 36, 162, 25, 512, 7,
      744, 190, 380, 1009, 774, 284, 282, 281, 32, 70, 154, 210, 301,
    ]);

    const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

    prVector.gvl = GVLFactory.getVersion(17, 'v2.2') as unknown as GVL;

    prVector.gvl.narrowVendorsTo(narrowVendors);

    const restrictedPurposeIds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    restrictedPurposeIds.forEach((el) => {

      prVector.restrictPurposeToLegalBasis(
        new PurposeRestriction(el, RestrictionType.REQUIRE_CONSENT),
      );

    });

    /**
   * ORDER:
   * num pub restrictions
   * purposeId
   * restrictionType
   * numEntries
   * ----
   * singleOrRange
   * startVendorId
   * endVendorId (may not be there)
   */
    const encoded: string = PurposeRestrictionVectorEncoder.encode(prVector);
    let index = 0;

    expect(encoded, 'encoded string').not.to.be.empty;

    // num restrictions
    const numRestrictions: number = IntEncoder.decode(encoded.substr(index, BitLength.numRestrictions), BitLength.numRestrictions);

    expect(numRestrictions, 'numRestrictions').to.equal(10);
    index += BitLength.numRestrictions;

    restrictedPurposeIds.forEach((purposeId) => {

      // purposeId
      const purpId: number = IntEncoder.decode(encoded.substr(index, BitLength.purposeId), BitLength.purposeId);

      expect(purpId, 'purpId').to.equal(purposeId);
      index += BitLength.purposeId;
      // restrictionType
      const restrictionType: number = IntEncoder.decode(encoded.substr(index, BitLength.restrictionType), BitLength.restrictionType);

      expect(restrictionType, 'restrictionType').to.equal(RestrictionType.REQUIRE_CONSENT);
      index += BitLength.restrictionType;

      // numEntries
      const numEntries: number = IntEncoder.decode(encoded.substr(index, BitLength.numEntries), BitLength.numEntries);
      expect(numEntries, 'numEntries').to.equal(1);

      index += BitLength.numEntries;

      const isARange: boolean = BooleanEncoder.decode(encoded.substr(index, BitLength.anyBoolean));
      expect(isARange, 'isARange').to.equal(true);
      index += BitLength.anyBoolean;

      const startVendorId: number = IntEncoder.decode(encoded.substr(index, BitLength.vendorId), BitLength.vendorId);
      expect(startVendorId).to.equal(1);
      index += BitLength.vendorId;

      const endVendorId: number = IntEncoder.decode(encoded.substr(index, BitLength.vendorId), BitLength.vendorId);
      expect(typeof endVendorId).to.equal('number');
      index += BitLength.vendorId;

    });

  });

  it('should create one restriction group and one vendor range', (): void => {

    const purposeId = 2;
    const purposeRestriction: PurposeRestriction =
        new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

    const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

    prVector.gvl = GVLFactory.getVersion(23) as unknown as GVL;

    prVector.restrictPurposeToLegalBasis(purposeRestriction);

    /**
       * ORDER:
       * num pub restrictions
       * purposeId
       * restrictionType
       * numEntries
       * ----
       * singleOrRange
       * startVendorId
       * endVendorId (may not be there)
       */
    const encoded: string = PurposeRestrictionVectorEncoder.encode(prVector);
    let index = 0;

    expect(encoded, 'encoded string').not.to.be.empty;

    // num restrictions
    const numRestrictions: number = IntEncoder.decode(encoded.substr(index, BitLength.numRestrictions), BitLength.numRestrictions);

    expect(numRestrictions, 'numRestrictions').to.equal(prVector.numRestrictions);
    index += BitLength.numRestrictions;

    // purposeId
    const purpId: number = IntEncoder.decode(encoded.substr(index, BitLength.purposeId), BitLength.purposeId);

    expect(purpId, 'purpId').to.equal(purposeId);
    index += BitLength.purposeId;

    // restrictionType
    const restrictionType: number = IntEncoder.decode(encoded.substr(index, BitLength.restrictionType), BitLength.restrictionType);

    expect(restrictionType, 'restrictionType').to.equal(RestrictionType.NOT_ALLOWED);
    index += BitLength.restrictionType;

    // numEntries
    const numEntries: number = IntEncoder.decode(encoded.substr(index, BitLength.numEntries), BitLength.numEntries);

    expect(numEntries, 'numEntries').to.equal(1);
    index += BitLength.numEntries;

  });

  it('should encode and decode and have the same output', (): void => {

    const vendorLength = 80;
    const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

    prVector.gvl = GVLFactory.getLatest() as unknown as GVL;

    for (let i =1; i <= vendorLength; i++) {

      prVector.add(i, new PurposeRestriction(makeRandomInt(1, 10), makeRandomInt(0, 2)));

    }

    const encoded: string = PurposeRestrictionVectorEncoder.encode(prVector);
    prVector.bitLength = encoded.length;
    const decodedPRV: PurposeRestrictionVector = PurposeRestrictionVectorEncoder.decode(encoded);

    sameDataDiffRef(prVector, decodedPRV, 'purposeRestrictionVector');

  });

});
