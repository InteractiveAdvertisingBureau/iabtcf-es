import {expect} from 'chai';
import {PublisherRestrictionsEncoder} from '../src/tcstring/encoder/PublisherRestrictionsEncoder';
import {PurposeRestriction} from '../src/model/PurposeRestriction';
import {Vector} from '../src/model/Vector';
import {BitLength} from '../src/model/BitLength';

describe('PublisherRestrictionsEncoder', (): void => {

  const pad = (value: string, numBits: number): string => {

    return '0'.repeat(numBits - value.length) + value;

  };

  const getVector = (maxId: number): Vector<PurposeRestriction> => {

    const vector: Vector<PurposeRestriction> = new Vector<PurposeRestriction>();
    const purposes: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    PurposeRestriction.availablePurposeIds = new Set<number>(purposes);

    for (let i = 1; i <= maxId; i++) {

      const pr: PurposeRestriction = new PurposeRestriction();

      pr.purposeId = purposes[Math.floor(Math.random() * purposes.length)];
      pr.restrictionType = Math.round(Math.random()* 2);

      vector.set(i, pr);

    }
    return vector;

  };

  const checkRangeEntry = (rangeEntry: string, isMoreThanOne: boolean, vector: Vector<PurposeRestriction>): void => {

    let index = 0;

    expect(rangeEntry.substr(index, 1))
      .to.equal(+isMoreThanOne + '');

    index += 1;

    expect(rangeEntry.substr(index, BitLength.vendorId))
      .to.equal(pad('1', BitLength.vendorId));

    index += BitLength.vendorId;

    expect(rangeEntry.substr(index, BitLength.vendorId))
      .to.equal(pad(vector.maxId.toString(2), BitLength.vendorId));

    index += BitLength.vendorId;

    for (let i =1; i <= vector.maxId; i ++) {

      const vendor: PurposeRestriction = vector.get(i) as PurposeRestriction;
      const msg1 = `purposeId: ${vendor.purposeId} should be set on vendor ${i}`;

      // first purpose restriciton purpose ID
      expect(rangeEntry.substr(index, BitLength.purposeRestrictionId), msg1)
        .to.equal(pad((vendor.purposeId).toString(2), BitLength.purposeRestrictionId));

      index += BitLength.purposeRestrictionId;

      expect(rangeEntry.substr(index, BitLength.purposeRestrictionType))
        .to.equal(pad((vendor.restrictionType).toString(2), BitLength.purposeRestrictionType));

      index += BitLength.purposeRestrictionType;

    }

  };

  afterEach((): void => {

    PurposeRestriction.availablePurposeIds = new Set<number>();

  });

  it('should properly encode a vector of publisher restrictions into one range', (): void => {

    const numEntries = 3;
    const prEnc: PublisherRestrictionsEncoder = new PublisherRestrictionsEncoder();
    const vector: Vector<PurposeRestriction> = getVector(numEntries);

    const result: string = prEnc.encode(vector);

    let index = 0;

    expect(result.substr(index, BitLength.rangeEncodingNumEntries))
      .to.equal(pad('1', BitLength.rangeEncodingNumEntries));

    index += BitLength.rangeEncodingNumEntries;
    checkRangeEntry(result.substr(index), true, vector);

  });


});
