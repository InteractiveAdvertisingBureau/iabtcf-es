import {TCModel} from '@iabtcf/core';
import {CmpData} from '../cmpdata';
import {CmpStatus, DisplayStatus, EventStatus} from '../status';
import {ValidationMessages} from '../validation';

/**
 * Cmp service handles the actions requested by the cmp
 */
export class CmpService {

  private readonly cmpData: CmpData;

  /**
   * Constructor
   * @param {CmpData} cmpData
   */
  public constructor(cmpData: CmpData) {

    this.cmpData = cmpData;

  }

  /**
   * Sets the new TCModel with side-effects: 
   *    - sets gdprApplies to `true` or `false` depending on whether a
   *      `TCModel` or `null` is passed.
   *    - CMP Status set to 'loaded' if anything is set 
   *    - Display Status set to 'disabled' or 'hidden' depending on whether a 
   *      `TCModel` or `null` is passed.
   *    - Event Status set to 'useractionscomplete' or 'tcloaded' only when a
   *      `TCModel` is set.  Which one is determined by whether this is the
   *      first or nth time a `TCModel` is set.
   * @param {TCModel | null} tcModel - if null: gdprApplies = false and display
   * status is 'disabled'. If a valid `TCModel` is set gdprApplies = true and
   * display status is 'hidden'.  If this is the first time the valid `TCModel`
   * is set Event is fired and EventStatus is 'tcloaded', subsequent sets event
   * is fired and 'useractioncomplete' is the EventStatus 
   * @return {void | never} - returns nothing, but throws an error if something
   * other than `null` or a valid `TCModel` is set
   */
  public setTcModel(tcModel: TCModel | null): void | never {

    this.throwIfCmpApiIsDisabled();

    /**
     * if this is a TCModel, then we know that GDPRApplies.  Otherwise if they
     * set explicitly to null then we know that they intend to state that GDPR
     * does not apply.  If it's something else... Then blowup!
     */
    this.cmpData.setCmpStatus(CmpStatus.LOADED);
    if (tcModel instanceof TCModel) {

        this.cmpData.setGdprApplies(true);
        this.cmpData.setDisplayStatus(DisplayStatus.HIDDEN);

        if (this.cmpData.tcModelIsSet) {

          this.cmpData.setEventStatus(EventStatus.USER_ACTION_COMPLETE);

        } else {

          this.cmpData.setEventStatus(EventStatus.TC_LOADED);

        }

        this.cmpData.setTCModel(tcModel);

    } else if(tcModel === null) {

      this.cmpData.setGdprApplies(false);
      this.cmpData.setDisplayStatus(DisplayStatus.DISABLED);

    } else {

      // awwwww hell no... what did you pass me?
      throw new Error(`Invalid value (${tcModel}) passed for tcModel`);
    }

  }

  /**
   * Sets statuses associated with the Cmp Ui being visible or not
   * @param {boolean} isVisible
   */
  public setUiVisible(isVisible: boolean): void {

    this.throwIfCmpApiIsDisabled();

    if (isVisible) {

      this.cmpData.setDisplayStatus(DisplayStatus.VISIBLE);
      this.cmpData.setEventStatus(EventStatus.CMP_UI_SHOWN);

    } else {

      this.cmpData.setDisplayStatus(DisplayStatus.DISABLED);
      this.cmpData.setEventStatus(EventStatus.TC_LOADED);

    }

  }

  /**
   * Disables the CmpApi from serving anything but ping and custom commands by
   * setting cmp status to error This can not be undone
   */
  public disable(): void {

    this.cmpData.setDisabledByCmp(true);
    this.cmpData.setCmpStatus(CmpStatus.ERROR);

  }

  /**
   * Throws an error if the Cmp has disabled the CmpApi
   */
  private throwIfCmpApiIsDisabled(): void {

    if (this.cmpData.getDisabledByCmp()) {

      /**
       * If the CMP set the disabled state, throw an error.
       */

      throw new Error(ValidationMessages.CMP_API_IN_DISABLED_STATE);

    }

  }

}
