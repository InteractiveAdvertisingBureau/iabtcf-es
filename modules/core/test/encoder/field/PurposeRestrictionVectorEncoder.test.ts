import {PurposeRestrictionVectorEncoder, IntEncoder} from '../../../src/encoder/field';
import {expect} from 'chai';
import {PurposeRestrictionVector, PurposeRestriction, RestrictionType} from '../../../src/model';
import {BitLength} from '../../../src/encoder';
import {makeRandomInt, sameDataDiffRef} from '@iabtcf/testing';

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
    // No 6
    const vendors: number[] = randomize([1, 2, 3, 4, 5, 7, 8, 9, 10, 11]);
    const purposeRestriction: PurposeRestriction =
        new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

    const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

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

    expect(encoded).not.to.be.empty;

    // num restrictions
    const numRestrictions: number = IntEncoder.decode(encoded.substr(index, BitLength.numRestrictions));

    expect(numRestrictions).to.equal(prVector.numRestrictions);
    index += BitLength.numRestrictions;

    // purposeId
    const purpId: number = IntEncoder.decode(encoded.substr(index, BitLength.purposeId));

    expect(purpId).to.equal(purposeId);
    index += BitLength.purposeId;

    // restrictionType
    const restrictionType: number = IntEncoder.decode(encoded.substr(index, BitLength.restrictionType));

    expect(restrictionType).to.equal(RestrictionType.NOT_ALLOWED);
    index += BitLength.restrictionType;

    // numEntries
    const numEntries: number = IntEncoder.decode(encoded.substr(index, BitLength.numEntries));

    expect(numEntries).to.equal(2);
    index += BitLength.numEntries;

  });

  it('should encode and decode and have the same output', (): void => {

    const vendorLength = 80;
    const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

    for (let i =1; i <= vendorLength; i++) {

      prVector.add(i, new PurposeRestriction(makeRandomInt(1, 10), makeRandomInt(0, 2)));

    }

    const encoded: string = PurposeRestrictionVectorEncoder.encode(prVector);
    prVector.bitLength = encoded.length;
    const decodedPRV: PurposeRestrictionVector = PurposeRestrictionVectorEncoder.decode(encoded);

    sameDataDiffRef(prVector, decodedPRV, 'purposeRestrictionVector');

  });

});
