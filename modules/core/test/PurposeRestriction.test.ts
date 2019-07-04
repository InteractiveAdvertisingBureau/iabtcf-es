import {expect} from 'chai';
import {PurposeRestriction} from '../src/model/PurposeRestriction';
import {PurposeRestrictionTypeEnum} from '../src/model/enum/PurposeRestrictionTypeEnum';

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
  afterEach((): void => {

    PurposeRestriction.availablePurposeIds = new Set<number>();

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

    purposeRestriction.restrictionType = PurposeRestrictionTypeEnum.NOT_ALLOWED;
    expect(purposeRestriction.restrictionType).to.equal(PurposeRestrictionTypeEnum.NOT_ALLOWED);

    purposeRestriction.restrictionType = PurposeRestrictionTypeEnum.REQUIRE_CONSENT;
    expect(purposeRestriction.restrictionType).to.equal(PurposeRestrictionTypeEnum.REQUIRE_CONSENT);

    purposeRestriction.restrictionType = PurposeRestrictionTypeEnum.REQUIRE_LI;
    expect(purposeRestriction.restrictionType).to.equal(PurposeRestrictionTypeEnum.REQUIRE_LI);

  });

});
runDescribe('constructor', (): void => {


  it('should set and get a restrictionType and purposeId through the constructor', (): void => {

    const purposeId = 2;

    PurposeRestriction.availablePurposeIds.add(purposeId);

    const purposeRestriction = new PurposeRestriction(purposeId, PurposeRestrictionTypeEnum.NOT_ALLOWED);

    expect(purposeRestriction.isValid()).to.be.true;
    expect(purposeRestriction.purposeId).to.equal(purposeId);
    expect(purposeRestriction.restrictionType).to.equal(PurposeRestrictionTypeEnum.NOT_ALLOWED);

  });

});
