import {TCModel} from '@iabtcf/core';
import {CmpStatus, DisplayStatus, EventStatus} from './status';

/**
 * Class holds shareable data across cmp api and provides change event listener for TcModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export class CmpApiModel {

  public static apiVersion = 2;
  public static tcfPolicyVersion = 2;
  public static cmpStatus: CmpStatus = CmpStatus.LOADING;
  public static displayStatus: DisplayStatus = DisplayStatus.HIDDEN;

  public static cmpId: number;
  public static cmpVersion: number;
  public static gdprApplies: boolean;
  public static eventStatus: EventStatus;

  public static changeEventCallback: () => void;

  private static uiVisible_: boolean;
  private static disabled_: boolean;
  private static tcModel_: TCModel;

  /**
   * Returns true if the TcModel has been set
   */
  public static get tcModelIsSet(): boolean {

    return (this.tcModel_ !== undefined);

  }

  public static get disabled(): boolean {

    return this.disabled_;

  }
  public static set disabled(bool: boolean) {

    if (bool) {

      this.cmpStatus = CmpStatus.ERROR;

    }

    this.disabled_ = bool;

  }

  public static get uiVisible(): boolean {

    return this.uiVisible_;

  }
  public static set uiVisible(bool: boolean) {

    if (bool) {

      this.displayStatus = DisplayStatus.VISIBLE;
      this.eventStatus = EventStatus.CMP_UI_SHOWN;

    } else {

      this.displayStatus = DisplayStatus.DISABLED;
      this.eventStatus = EventStatus.TC_LOADED;

    }

    this.uiVisible_ = bool;

  }

  /**
   * Returns the current TcModel
   * @return {TCModel}
   */
  public static get tcModel(): TCModel | null {

    return this.tcModel_;

  }

  /**
   * Sets clone of TcModel
   * @param {TCModel} model
   * @return {void}
   */
  public static set tcModel(model: TCModel | null) {

    /**
     * if this is a TCModel, then we know that GDPRApplies.  Otherwise if they
     * set explicitly to null then we know that they intend to state that GDPR
     * does not apply.  If it's something else... Then blowup!
     */

    if (model instanceof TCModel) {

      this.gdprApplies = true;
      this.displayStatus = DisplayStatus.HIDDEN;

      if (this.tcModelIsSet) {

        this.eventStatus = EventStatus.USER_ACTION_COMPLETE;

      } else {

        this.eventStatus = EventStatus.TC_LOADED;

      }

    } else if (model === null) {

      this.gdprApplies = false;
      this.displayStatus = DisplayStatus.DISABLED;

    } else {

      this.cmpStatus = CmpStatus.ERROR;
      // awwwww hell no... what did you pass me?
      throw new Error(`Invalid value (${model}) passed for model`);

    }

    this.cmpStatus = CmpStatus.LOADED;
    this.tcModel_ = (model as TCModel).clone();

    if (this.changeEventCallback) {

      this.changeEventCallback();

    }

  }

}
