import {expect} from 'chai';
import {PurposeRestriction} from '../src/PurposeRestriction';
import {PurposeRestrictionTypes} from '../src/PurposeRestrictionTypes';

const runDescribe = (fieldName: string, handler: () => void): void => {

  describe(`PurposeRestriction->${fieldName}`, handler);

};

runDescribe('purposeId', (): void => {

  const skip = 5;
  const max = 12;

  beforeEach((): void => {

    for (let i = 1; i <= max; i++) {

      if ( i !== skip) {

        PurposeRestriction.availablePurposeIds.add(i);

      }

    }

  });
  const shouldBeOk: (value: number) => void = (value: number): void => {

    it(`should be ok with ${value}`, (): void => {

      const purposeRestriction = new PurposeRestriction();

      expect((): void => {

        purposeRestriction.purposeId = value;

      }).not.to.throw();

      expect(purposeRestriction.purposeId).to.equal(value);

    });

  };
  const shouldBeNotOk: (value: number) => void = (value: number): void => {

    it(`should not be ok with ${value}`, (): void => {

      const purposeRestriction = new PurposeRestriction();

      expect((): void => {

        purposeRestriction.purposeId = value;

      }).to.throw();

      expect(purposeRestriction.purposeId).to.be.undefined;

    });

  };

  shouldBeOk(2);
  shouldBeNotOk(1);
  shouldBeNotOk(0);
  shouldBeNotOk(skip);
  shouldBeNotOk(max + 1);
  shouldBeNotOk(1.1);

});
runDescribe('restrictionType', (): void => {

  it('should set and get a restrictionType', (): void => {

    const purposeRestriction = new PurposeRestriction();

    purposeRestriction.restrictionType = PurposeRestrictionTypes.NOT_ALLOWED;
    expect(purposeRestriction.restrictionType).to.equal(PurposeRestrictionTypes.NOT_ALLOWED);

    purposeRestriction.restrictionType = PurposeRestrictionTypes.REQUIRE_CONSENT;
    expect(purposeRestriction.restrictionType).to.equal(PurposeRestrictionTypes.REQUIRE_CONSENT);

    purposeRestriction.restrictionType = PurposeRestrictionTypes.REQUIRE_LI;
    expect(purposeRestriction.restrictionType).to.equal(PurposeRestrictionTypes.REQUIRE_LI);

  });

});
