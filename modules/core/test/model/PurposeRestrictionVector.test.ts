import {GVL} from '../../src/GVL';
import {PurposeRestrictionVector} from '../../src/model/PurposeRestrictionVector';
import {PurposeRestriction} from '../../src/model/PurposeRestriction';
import {RestrictionType} from '../../src/model/RestrictionType';
import {expect} from 'chai';
import {makeRandomInt} from '@iabtcf/testing';
import {Declaration} from '../../src/model';

describe('PurposeRestrictionVector', (): void => {

  it('should intialize as empty', (): void => {

    const prv: PurposeRestrictionVector = new PurposeRestrictionVector();

    expect(prv.isEmpty()).to.be.true;

  });

  it('should store vendors by purpose restriction in order', (): void => {

    const purposeId = 2;
    const vendors: number[] = [1, 44, 3, 5, 99, 22, 57, 2, 14, 28, 29, 33];
    const purposeRestriction: PurposeRestriction =
        new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

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

    const purposeId = 2;
    const purposeRestriction: PurposeRestriction =
        new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);
    const prVector: PurposeRestrictionVector = new PurposeRestrictionVector();

    expect(prVector.getVendors(purposeRestriction), 'prVector.getVendors(purposeRestriction)').to.be.empty;

  });

  it('should return all purposes restrictions set', (): void => {

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

    const result: string[] = prv.getRestrictions().map((pr: PurposeRestriction): string => {

      return pr.hash;

    }).sort();

    expect(prv.numRestrictions).to.equal(restrictions.size);

    // may not be in the same order
    expect(result).to.deep.equal(Array.from(restrictions).sort());
    expect(result.length).to.equal(restrictions.size);

  });

  it('should return the restriction set on a particular vendor', (): void => {

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
    const targetVendor: number = vendors[Math.floor(Math.random() * vendors.length)];

    expect(prv.getRestrictions(targetVendor)).not.to.be.empty;
    expect(prv.getVendors(purpRestriction)).to.include(targetVendor);

    prv.remove(targetVendor, purpRestriction);

    expect(prv.getRestrictions(targetVendor)).to.be.empty;
    expect(prv.getVendors(purpRestriction)).not.to.include(targetVendor);

  });

  it('should not error when trying to remove a restriction from Vector that is empty', (): void => {

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

    const prv: PurposeRestrictionVector = new PurposeRestrictionVector();
    const purposeId = 2;
    const restrictionType: number = RestrictionType.REQUIRE_CONSENT;
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

  describe('restrictionTypes', (): void => {

    const purposeId = 2;
    let gvl: GVL;
    let prv: PurposeRestrictionVector;
    let flexibleVendorId: number;
    let inflexibleVendorId: number;

    const checkTheThings = (vendorId: number, purposeRestriction: PurposeRestriction): void => {

      if (purposeRestriction.restrictionType === RestrictionType.NOT_ALLOWED) {

        expect(prv.getRestrictions(vendorId)).not.to.be.empty;
        expect(prv.getVendors(purposeRestriction)).to.include(vendorId);
        expect(prv.isEmpty()).to.be.false;

      } else if (vendorId === flexibleVendorId) {

        expect(prv.getRestrictions(vendorId)).not.to.be.empty;
        expect(prv.getVendors(purposeRestriction)).to.include(vendorId);
        expect(prv.isEmpty()).to.be.false;

        if (gvl.vendors[vendorId].purposes.includes(purposeId)) {

          expect(gvl.getVendorIdsByDeclaration(purposeId, Declaration.legIntPurposes).has(vendorId), `vendor id ${vendorId} is in the ${Declaration.legIntPurposes} declaration vendor map`).to.be.true;
          expect(gvl.getVendorIdsByDeclaration(purposeId, Declaration.purposes).has(vendorId), `vendor id ${vendorId} is in the ${Declaration.purposes} declaration vendor map`).to.be.false;

        } else {

          expect(gvl.getVendorIdsByDeclaration(purposeId, Declaration.purposes).has(vendorId), `vendor id ${vendorId} is in the ${Declaration.purposes} declaration vendor map`).to.be.true;
          expect(gvl.getVendorIdsByDeclaration(purposeId, Declaration.legIntPurposes).has(vendorId), `vendor id ${vendorId} is in the ${Declaration.legIntPurposes} declaration vendor map`).to.be.false;

        }

      } else {

        expect(prv.getRestrictions(vendorId)).to.be.empty;
        expect(prv.getVendors(purposeRestriction)).not.to.include(vendorId);
        expect(prv.isEmpty()).to.be.true;

        if (gvl.vendors[vendorId].purposes.includes(purposeId)) {

          expect(gvl.getVendorIdsByDeclaration(purposeId, Declaration.purposes).has(vendorId), `vendor id ${vendorId} is in the ${Declaration.purposes} declaration vendor map`).to.be.true;
          expect(gvl.getVendorIdsByDeclaration(purposeId, Declaration.legIntPurposes).has(vendorId), `vendor id ${vendorId} is in the ${Declaration.legIntPurposes} declaration vendor map`).to.be.false;

        } else {

          expect(gvl.getVendorIdsByDeclaration(purposeId, Declaration.legIntPurposes).has(vendorId), `vendor id ${vendorId} is in the ${Declaration.legIntPurposes} declaration vendor map`).to.be.true;
          expect(gvl.getVendorIdsByDeclaration(purposeId, Declaration.purposes).has(vendorId), `vendor id ${vendorId} is in the ${Declaration.purposes} declaration vendor map`).to.be.false;

        }

      }

    };

    beforeEach((): void => {

      gvl = new GVL(require('@iabtcf/testing/lib/vendorlist/purpose-restriction-vendor-list.json'));

      const flexibleVendorIdSet = gvl.getVendorIdsByDeclaration(purposeId, Declaration.flexiblePurposes);
      const flexibleVendorArray = Array.from(flexibleVendorIdSet);
      const vendorsWithPurpose2 = Array.from(gvl.getVendorIdsByDeclaration(purposeId, Declaration.purposes));

      flexibleVendorId = flexibleVendorArray[Math.floor(Math.random()*flexibleVendorArray.length)];

      let found = false;

      while (!found) {

        inflexibleVendorId = vendorsWithPurpose2[Math.floor(Math.random() * vendorsWithPurpose2.length)];
        found = !flexibleVendorIdSet.has(inflexibleVendorId);

      }

      prv = new PurposeRestrictionVector();

    });

    [0, 1, 2].forEach((restrictionType: number): void => {

      const purposeRestriction = new PurposeRestriction(purposeId, restrictionType);
      let shouldOrNot = '';

      if (restrictionType !== RestrictionType.NOT_ALLOWED) {

        shouldOrNot = 'not ';

      }

      it(`should set restriction type ${restrictionType} on vendor if the vendor is flexible and gvl is set before add`, (): void => {

        prv.gvl = gvl;

        prv.add(flexibleVendorId, purposeRestriction);

        checkTheThings(flexibleVendorId, purposeRestriction);

      });

      it(`should set restriction type ${restrictionType} on vendor if the vendor is flexible and gvl is set after add`, (): void => {

        prv.add(flexibleVendorId, purposeRestriction);

        prv.gvl = gvl;

        checkTheThings(flexibleVendorId, purposeRestriction);

      });

      it(`should ${shouldOrNot}set restriction type ${restrictionType} on vendor if the vendor is not flexible and gvl is set before add`, (): void => {

        prv.gvl = gvl;

        prv.add(inflexibleVendorId, purposeRestriction);

        checkTheThings(inflexibleVendorId, purposeRestriction);

      });

      it(`should ${shouldOrNot}set restriction type ${restrictionType} on vendor if the vendor is not flexible and gvl is set after add`, (): void => {

        prv.add(inflexibleVendorId, purposeRestriction);

        prv.gvl = gvl;

        checkTheThings(inflexibleVendorId, purposeRestriction);

      });

    });

  });

});
