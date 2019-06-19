/*
import {expect} from 'chai';
import {PublisherRestrictionsEncoder} from '../src/tcstring/encoder/PublisherRestrictionsEncoder';
import {PurposeRestriction} from '../src/model/PurposeRestriction';
import {Vector} from '../src/model/Vector';
import {BitLength} from '../src/model/BitLength';

describe('PublisherRestrictionsEncoder', (): void => {

  const pad = (value: string, numBits: number): string => {

    return '0'.repeat(numBits - value.length) + value;

  };

  const checkRangeEntry = (
    rangeEntry: string,
    ids: number[],
    purpRestriction: PurposeRestriction
  ): number => {

    let index = 0;

    // number of entries
    expect(rangeEntry.substr(index, 1))
      .to.equal(+(ids.length > 1) + '');

    index += 1;

    //
    expect(rangeEntry.substr(index, BitLength.vendorId))
      .to.equal(pad(ids[0].toString(2), BitLength.vendorId));

    index += BitLength.vendorId;

    if (ids.length > 1) {

      expect(rangeEntry.substr(index, BitLength.vendorId))
        .to.equal(pad(ids[1].toString(2), BitLength.vendorId));

      index += BitLength.vendorId;

    }
    // first purpose restriciton purpose ID
    expect(rangeEntry.substr(index, BitLength.purposeRestrictionId))
      .to.equal(pad((purpRestriction.purposeId).toString(2), BitLength.purposeRestrictionId));

    index += BitLength.purposeRestrictionId;

    expect(rangeEntry.substr(index, BitLength.purposeRestrictionType))
      .to.equal(pad((purpRestriction.restrictionType).toString(2), BitLength.purposeRestrictionType));

    index += BitLength.purposeRestrictionType;

    return index;

  };

  afterEach((): void => {

    PurposeRestriction.availablePurposeIds = new Set<number>();

  });

  it('should properly encode a vector of different restrictions into different ranges', (): void => {

    const numEntries = 3;
    const prEnc: PublisherRestrictionsEncoder = new PublisherRestrictionsEncoder();

    const vector: Vector<PurposeRestriction> = new Vector<PurposeRestriction>();
    const purposes: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    PurposeRestriction.availablePurposeIds = new Set<number>(purposes);

    for (let i = 1; i <= numEntries; i++) {

      const pr: PurposeRestriction = new PurposeRestriction();

      pr.purposeId = purposes[i+1];
      pr.restrictionType = Math.round(Math.random()* 2);

      vector.set(i, pr);

    }

    const result: string = prEnc.encode(vector);

    let index = 0;

    expect(result.substr(index, BitLength.rangeEncodingNumEntries))
      .to.equal(pad(numEntries.toString(2), BitLength.rangeEncodingNumEntries));

    index += BitLength.rangeEncodingNumEntries;

    for (let i = 1; i <= numEntries; i ++) {

      index += checkRangeEntry(result.substr(index), [i], vector.get(i) as PurposeRestriction);

    }

  });

  // This encoding may need to be revisited... I will write more tests in the future


});
*/
