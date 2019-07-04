import {TCModelError} from '../errors';
import {PurposeRestrictionTypeEnum} from './enum/PurposeRestrictionTypeEnum';

export class PurposeRestriction {

  public static availablePurposeIds: Set<number> = new Set();
  private purposeId_: number;
  public restrictionType: PurposeRestrictionTypeEnum;

  /**
   * constructor
   *
   * @param {number} purposeId? - may optionally pass the purposeId into the
   * constructor
   * @param {PurposeRestrictionTypeEnum} restrictionType? - may
   * optionally pass the restrictionType into the constructor
   * @return {undefined}
   */
  public constructor(purposeId?: number, restrictionType?: PurposeRestrictionTypeEnum) {

    if (purposeId !== undefined) {

      this.purposeId = purposeId;

    }
    if (restrictionType !== undefined) {

      this.restrictionType = restrictionType;

    }

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

    if (idNum !== 1 && PurposeRestriction.availablePurposeIds.has(idNum)) {

      this.purposeId_ = idNum;

    } else {

      throw new TCModelError('purposeId', idNum);

    }

  }

  public isValid(): boolean {

    return !!(this.purposeId && this.restrictionType !== undefined);

  }
  public isSameAs(otherPR: PurposeRestriction): boolean {

    return (this.purposeId === otherPR.purposeId
      && this.restrictionType === otherPR.restrictionType);

  }

}
