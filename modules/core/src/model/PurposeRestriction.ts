import {Cloneable} from '../Cloneable';
import {TCModelError} from '../errors';
import {RestrictionType} from './RestrictionType';

export class PurposeRestriction extends Cloneable<PurposeRestriction> {

  public static hashSeparator = '-';

  private purposeId_: number;
  public restrictionType: RestrictionType;

  /**
   * constructor
   *
   * @param {number} purposeId? - may optionally pass the purposeId into the
   * constructor
   * @param {RestrictionType} restrictionType? - may
   * optionally pass the restrictionType into the constructor
   * @return {undefined}
   */
  public constructor(purposeId?: number, restrictionType?: RestrictionType) {

    super();

    if (purposeId !== undefined) {

      this.purposeId = purposeId;

    }

    if (restrictionType !== undefined) {

      this.restrictionType = restrictionType;

    }

  }

  public static unHash(hash: string): PurposeRestriction {

    const splitUp: string[] = hash.split(this.hashSeparator);
    const purpRestriction: PurposeRestriction = new PurposeRestriction();

    if (splitUp.length !== 2) {

      throw new TCModelError('hash', hash);

    }

    purpRestriction.purposeId = parseInt(splitUp[0], 10);
    purpRestriction.restrictionType = parseInt(splitUp[1], 10);

    return purpRestriction;

  }
  public get hash(): string {

    if (!this.isValid()) {

      throw new Error('cannot hash invalid PurposeRestriction');

    }

    return `${this.purposeId}${PurposeRestriction.hashSeparator}${this.restrictionType}`;

  }

  /**
   * @return {number} The purpose Id associated with a publisher
   * purpose-by-vendor restriction that resulted in a different consent or LI
   * status than the consent or LI purposes allowed lists.
   */
  public get purposeId(): number {

    return this.purposeId_;

  }
  /**
   * @param {number} idNum - The purpose Id associated with a publisher
   * purpose-by-vendor restriction that resulted in a different consent or LI
   * status than the consent or LI purposes allowed lists.
   */
  public set purposeId(idNum: number) {

    this.purposeId_ = idNum;

  }

  public isValid(): boolean {

    return (
      Number.isInteger(this.purposeId) &&
      this.purposeId > 0 &&
      (
        this.restrictionType === RestrictionType.NOT_ALLOWED ||
        this.restrictionType === RestrictionType.REQUIRE_CONSENT ||
        this.restrictionType === RestrictionType.REQUIRE_LI
      )
    );

  }
  public isSameAs(otherPR: PurposeRestriction): boolean {

    return (this.purposeId === otherPR.purposeId &&
      this.restrictionType === otherPR.restrictionType);

  }

}
