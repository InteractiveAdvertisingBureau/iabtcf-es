import {expect} from 'chai';
import {PurposeRestriction} from '../../src/model/PurposeRestriction';
import {RestrictionType} from '../../src/model/RestrictionType';

describe('PurposeRestriction', (): void => {

  describe('purposeId', (): void => {

    it(`should be ok with 2`, (): void => {

      const purposeRestriction = new PurposeRestriction();

      expect((): void => {

        purposeRestriction.purposeId = 2;

      }).not.to.throw();

      expect(purposeRestriction.purposeId).to.equal(2);

    });

  });
  describe('restrictionType', (): void => {

    it('should set and get a restrictionType', (): void => {

      const purposeRestriction = new PurposeRestriction();

      purposeRestriction.restrictionType = RestrictionType.NOT_ALLOWED;
      expect(purposeRestriction.restrictionType).to.equal(RestrictionType.NOT_ALLOWED);

      purposeRestriction.restrictionType = RestrictionType.REQUIRE_CONSENT;
      expect(purposeRestriction.restrictionType).to.equal(RestrictionType.REQUIRE_CONSENT);

      purposeRestriction.restrictionType = RestrictionType.REQUIRE_LI;
      expect(purposeRestriction.restrictionType).to.equal(RestrictionType.REQUIRE_LI);

    });

  });
  describe('constructor', (): void => {

    it('should set and get a restrictionType and purposeId through the constructor', (): void => {

      const purposeId = 2;
      const purposeRestriction = new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

      expect(purposeRestriction.isValid()).to.be.true;
      expect(purposeRestriction.purposeId).to.equal(purposeId);
      expect(purposeRestriction.restrictionType).to.equal(RestrictionType.NOT_ALLOWED);

    });

  });

  describe('hashing', (): void => {

    it('should produce a hash', (): void => {

      const purposeId = 2;
      const purposeRestriction = new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);
      const expected = `${purposeId}${PurposeRestriction.hashSeparator}${RestrictionType.NOT_ALLOWED}`;

      expect(purposeRestriction.hash).to.equal(expected);

    });

    it('should unHash properly', (): void => {

      const purposeId = 2;
      const purposeRestriction = new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);
      const hash = `${purposeId}${PurposeRestriction.hashSeparator}${RestrictionType.NOT_ALLOWED}`;

      expect(purposeRestriction.isSameAs(PurposeRestriction.unHash(hash))).to.be.true;

    });

    it('unHash should throw an error with an improper hash', (): void => {

      const purposeId = 2;
      const hash = `${purposeId}${RestrictionType.NOT_ALLOWED}`;

      expect((): void => {

        // eslint-disable-next-line
          const unhashed: PurposeRestriction = PurposeRestriction.unHash(hash);

      }).to.throw();

    });

  });

});
