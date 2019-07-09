import {expect} from 'chai';
import {PurposeRestriction} from '../../src/model/PurposeRestriction';
import {RestrictionType} from '../../src/model/RestrictionType';
import {PurposeRestrictionVector} from '../../src/model/PurposeRestrictionVector';
import {makeRandomInt} from '../support/makeRandomInt';

export function run(): void {

  describe('PurposeRestrictionVector', (): void => {

    const makePurposesAvailable = (purposes: number[]): void => {

      purposes.forEach((purposeId: number): void => {

        PurposeRestriction.availablePurposeIds.add(purposeId);

      });

    };

    afterEach((): void => {

      PurposeRestriction.availablePurposeIds = new Set<number>();

    });

    it('should intialize as empty', (): void => {

      const prv: PurposeRestrictionVector = new PurposeRestrictionVector();

      expect(prv.isEmpty()).to.be.true;

    });
    it('should store vendors by purpose restriction in order', (): void => {

      makePurposesAvailable([1, 2, 3]);
      const purposeId = 2;
      const vendors: number[] = [1, 44, 3, 5, 99, 22, 57, 2, 14, 28, 29, 33];
      const purposeRestriction: PurposeRestriction
        = new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

      const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

      for (let i = 0; i < vendors.length; i++) {

        prVector.add(vendors[i], purposeRestriction);

      }

      const expected: number[] = vendors.sort((a: number, b: number): number => {

        return a - b;

      });
      const actual: number[] = prVector.getVendors(purposeRestriction);

      expect(actual).to.deep.equal(expected);

    });

    it('should return an empty array if a purpose restriction hasen\'t been defined for a vendor', (): void => {

      makePurposesAvailable([1, 2, 3]);
      const purposeId = 2;
      const purposeRestriction: PurposeRestriction
        = new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);
      const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

      expect(prVector.getVendors(purposeRestriction)).to.be.empty;

    });

    it('should return all purposes restrictions set', (): void => {

      makePurposesAvailable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      const numItems = 10;
      const vendors: number[] = [];
      const restrictions: Set<string> = new Set<string>();
      const prv: PurposeRestrictionVector = new PurposeRestrictionVector();

      for (let i = 0; i < numItems; i ++) {

        const vendorId: number = makeRandomInt(1, 100);
        const purposeId: number = makeRandomInt(2, 12);
        const restrictionType: number = makeRandomInt(0, 2) as RestrictionType;
        const purpRestriction = new PurposeRestriction(purposeId, restrictionType);

        restrictions.add(purpRestriction.hash);
        vendors.push(vendorId);
        prv.add(vendorId, purpRestriction);

      }

      const result: string[] = prv.getAllRestrictions().map((pr: PurposeRestriction): string => {

        return pr.hash;

      }).sort();

      expect(prv.numRestrictions).to.equal(restrictions.size);

      // may not be in the same order
      expect(result).to.deep.equal(Array.from(restrictions).sort());
      expect(result.length).to.equal(restrictions.size);


    });

    it('should return the restriction set on a particular vendor', (): void => {

      makePurposesAvailable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

      const prv: PurposeRestrictionVector = new PurposeRestrictionVector();
      const vendorId: number = makeRandomInt(1, 100);
      const purposeId: number = makeRandomInt(2, 12);
      const restrictionType: number = makeRandomInt(0, 2) as RestrictionType;
      const purpRestriction = new PurposeRestriction(purposeId, restrictionType);

      prv.add(vendorId, purpRestriction);

      const prvRestrictions: PurposeRestriction[] = prv.getRestrictions(vendorId);

      expect(purpRestriction.isSameAs(prvRestrictions[0])).to.be.true;


    });

    it('should remove a restriction', (): void => {

      makePurposesAvailable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

      const numItems = 10;
      const vendors: number[] = [];
      const restrictions: Set<string> = new Set<string>();
      const prv: PurposeRestrictionVector = new PurposeRestrictionVector();
      const purposeId = 2;
      const restrictionType: number = 1 as RestrictionType;
      const purpRestriction = new PurposeRestriction(purposeId, restrictionType);

      for (let i = 0; i < numItems; i ++) {

        const vendorId: number = makeRandomInt(1, 100);

        restrictions.add(purpRestriction.hash);
        vendors.push(vendorId);
        prv.add(vendorId, purpRestriction);

      }

      // select random one
      const targetVendor: number = vendors[Math.floor(Math.random() * vendors.length - 1)];

      expect(prv.getRestrictions(targetVendor)).not.to.be.empty;
      expect(prv.getVendors(purpRestriction)).to.include(targetVendor);

      prv.remove(targetVendor, purpRestriction);

      expect(prv.getRestrictions(targetVendor)).to.be.empty;
      expect(prv.getVendors(purpRestriction)).not.to.include(targetVendor);

    });

    it('should not error when trying to remove a restriction from Vector that is empty', (): void => {

      makePurposesAvailable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

      const prv: PurposeRestrictionVector = new PurposeRestrictionVector();
      const purposeId = 2;
      const restrictionType: number = 1 as RestrictionType;
      const purpRestriction = new PurposeRestriction(purposeId, restrictionType);
      const vendorId: number = makeRandomInt(1, 100);

      expect((): void => {

        prv.remove(vendorId, purpRestriction);

      }).to.not.throw();

    });

    it('should remove a restriction if one vendor', (): void => {

      makePurposesAvailable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

      const prv: PurposeRestrictionVector = new PurposeRestrictionVector();
      const purposeId = 2;
      const restrictionType: number = 1 as RestrictionType;
      const purpRestriction = new PurposeRestriction(purposeId, restrictionType);
      const vendorId: number = makeRandomInt(1, 100);

      prv.add(vendorId, purpRestriction);

      expect(prv.getRestrictions(vendorId)).not.to.be.empty;
      expect(prv.getVendors(purpRestriction)).to.include(vendorId);
      expect(prv.isEmpty()).to.be.false;

      prv.remove(vendorId, purpRestriction);

      expect(prv.getRestrictions(vendorId)).to.be.empty;
      expect(prv.getVendors(purpRestriction)).not.to.include(vendorId);
      expect(prv.isEmpty()).to.be.true;

    });

  });

}
