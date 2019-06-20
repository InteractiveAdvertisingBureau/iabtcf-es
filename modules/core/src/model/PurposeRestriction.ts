import {TCModelError} from '../errors/TCModelError';
import {PurposeRestrictionTypeEnum} from './enum/PurposeRestrictionTypeEnum';

class PurposeRestriction {

  public static availablePurposeIds: Set<number> = new Set();
  private purposeId_: number;
  public restrictionType: PurposeRestrictionTypeEnum;

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
export {PurposeRestriction};
