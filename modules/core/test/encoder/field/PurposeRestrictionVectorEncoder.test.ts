import {PurposeRestrictionVectorEncoder, IntEncoder} from '../../../src/encoder/field';
import {expect} from 'chai';
import {PurposeRestrictionVector, PurposeRestriction, RestrictionType} from '../../../src/model';
import {BitLength} from '../../../src/encoder';
import {GVL} from '../../../src/GVL';
import {makeRandomInt, sameDataDiffRef, GVLFactory} from '@iabtcf/testing';

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
     * Vendors with IDs 6, 8 and 9 are consecutive
     * and they should be encoded as a single
     * vendor range and consecutive vendors 23 and 37
     * should be encoded as second range
     */
    const vendors: number[] = randomize([6, 8, 9, 23, 37]);
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
