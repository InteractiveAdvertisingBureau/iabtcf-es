import {expect} from 'chai';

import {IntDecoder} from '../../src/decoders/IntDecoder';
import {PurposeRestrictionsEncoder} from '../../src/encoders/PurposeRestrictionsEncoder';
import {PurposeRestrictionVector} from '../../src/model/structures/PurposeRestrictionVector';
import {PurposeRestriction} from '../../src/model/structures/PurposeRestriction';
import {RestrictionType} from '../../src/model/RestrictionType';
import {BitLength} from '../../src/model/BitLength';

const makePurposesAvailable = (purposes: number[]): void => {

  purposes.forEach((purposeId: number): void => {

    PurposeRestriction.availablePurposeIds.add(purposeId);

  });

};

export function run(): void {

  describe('PurposeRestrictionsEncoder', (): void => {

    it('should return an empty string for an empty PurposeRestrictionsVector', (): void => {

      const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();
      const pre: PurposeRestrictionsEncoder = new PurposeRestrictionsEncoder();
      const encoded: string = pre.encode(prVector);

      expect(encoded).to.equal('');

    });

    it('should create one restriction group and two vendor ranges', (): void => {

      makePurposesAvailable([1, 2, 3]);
      const purposeId = 2;
      const vendors: number[] = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
      const purposeRestriction: PurposeRestriction
        = new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

      const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

      for (let i = 0; i < vendors.length; i++) {

        prVector.add(vendors[i], purposeRestriction);

      }

      const pre: PurposeRestrictionsEncoder = new PurposeRestrictionsEncoder();
      const encoded: string = pre.encode(prVector);
      const intDec: IntDecoder = new IntDecoder();
      let index = 0;

      expect(encoded).not.to.be.empty;

      const numEntries: number = intDec.decode(encoded.substr(index, BitLength.numRestrictions));

      index += BitLength.numRestrictions;

      expect(numEntries).to.equal(prVector.numRestrictions);

      const purpId: number = intDec.decode(encoded.substr(index, BitLength.purposeId));

    });

  });

}
