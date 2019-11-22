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
   * Sets the new TCModel and sets various states associated with the model
   * @param {TCModel | null} tcModel
   */
  public setTcModel(tcModel: TCModel | null): void {

    if (tcModel) {

      if (tcModel.isValid()) {

        this.cmpData.setGdprApplies(true);
        this.cmpData.setDisplayStatus(DisplayStatus.HIDDEN);
        this.cmpData.setCmpStatus(CmpStatus.LOADED);

        if (this.cmpData.tcModelIsSet) {

          this.cmpData.setEventStatus(EventStatus.USER_ACTION_COMPLETE);

        } else {

          this.cmpData.setEventStatus(EventStatus.TC_LOADED);

        }

        this.cmpData.setTCModel(tcModel);

      } else {

        throw new Error(ValidationMessages.TC_MODEL_INVALID);

      }

    } else {

      this.cmpData.setGdprApplies(false);
      this.cmpData.setDisplayStatus(DisplayStatus.DISABLED);
      this.cmpData.setCmpStatus(CmpStatus.LOADED);

    }

  }

  /**
   * Sets statuses associated with the Cmp Ui being visible or not
   * @param {boolean} isVisible
   */
  public setUiVisible(isVisible: boolean): void {

    if (isVisible) {

      this.cmpData.setDisplayStatus(DisplayStatus.VISIBLE);
      this.cmpData.setEventStatus(EventStatus.CMP_UI_SHOWN);

    } else {

      this.cmpData.setDisplayStatus(DisplayStatus.DISABLED);
      this.cmpData.setEventStatus(EventStatus.TC_LOADED);

    }

  }

}
