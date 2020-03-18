import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {EventListenerQueue} from './EventListenerQueue';
import {TCModel, TCString, Vector, PurposeRestrictionVector} from '@iabtcf/core';

/**
 * Class holds shareable data across cmp api and provides change event listener for TcModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export class CmpApiModel {

  public static apiVersion = '2';
  public static tcfPolicyVersion = 2;
  public static eventStatus: EventStatus;
  public static cmpStatus: CmpStatus = CmpStatus.LOADING;
  public static displayStatus: DisplayStatus = DisplayStatus.HIDDEN;

  public static cmpId: number;
  public static cmpVersion: number;
  public static gdprApplies: boolean;
  public static eventQueue = new EventListenerQueue();

  private static disabled_ = false;
  private static tcModel_: TCModel;
  private static tcString_: string;

  /**
   * Returns true if the TcModel has been set
   */
  public static get disabled(): boolean {

    return this.disabled_;

  }
  public static set disabled(bool: boolean) {

    if (bool) {

      this.cmpStatus = CmpStatus.ERROR;

    }

    this.disabled_ = bool;

  }

  public static set uiVisible(bool: boolean) {

    if (bool) {

      this.displayStatus = DisplayStatus.VISIBLE;

    } else {

      this.displayStatus = DisplayStatus.DISABLED;

    }

  }

  public static cacheTCString(encodedStr: string): void {

    this.tcString_ = encodedStr;

  }

  public static set tcString(encodedStr: string) {

    this.tcModel = TCString.decode(encodedStr);
    this.cacheTCString(encodedStr);

  }

  public static get tcString(): string {

    return this.tcString_;

  }

  /**
   * Returns the current TcModel
   * @return {TCModel}
   */
  public static get tcModel(): TCModel | null {

    return this.tcModel_;

  }

  /**
   * @param {TCModel | null} model
   * @return {void}
   */
  public static set tcModel(model: TCModel | null) {

    /**
     * if this is a TCModel, then we know that GDPRApplies.  Otherwise if they
     * set explicitly to null then we know that they intend to state that GDPR
     * does not apply.  If it's something else... Then blowup!
     */

    if (model === null) {

      this.gdprApplies = false;
      this.displayStatus = DisplayStatus.DISABLED;
      this.tcModel_ = null;

    } else if (this.isTCModel(model)) {

      this.gdprApplies = true;

      switch (this.eventStatus) {

        case undefined:
          this.eventStatus = EventStatus.TC_LOADED;
          this.displayStatus = DisplayStatus.HIDDEN;
          break;
        case EventStatus.TC_LOADED:
          this.eventStatus = EventStatus.CMP_UI_SHOWN;
          this.displayStatus = DisplayStatus.VISIBLE;
          break;
        case EventStatus.CMP_UI_SHOWN:
          this.eventStatus = EventStatus.USER_ACTION_COMPLETE;
          this.displayStatus = DisplayStatus.HIDDEN;
          break;

      }

      this.tcModel_ = model.clone();
      this.tcString_ = '';

    } else {

      this.cmpStatus = CmpStatus.ERROR;
      throw new Error(`Invalid value (${model}) passed for tcModel`);

    }

    this.cmpStatus = CmpStatus.LOADED;
    this.eventQueue.exec();

  }

  private static isPurposeRestrictionVector(potentialVector: unknown): potentialVector is PurposeRestrictionVector {

    let retr = false;
    const subject = potentialVector as PurposeRestrictionVector;

    retr = (typeof subject.add === 'function');
    retr = (retr && typeof subject.getVendors === 'function');
    retr = (retr && typeof subject.getRestrictionType === 'function');
    retr = (retr && typeof subject.vendorHasRestriction === 'function');
    retr = (retr && typeof subject.getMaxVendorId === 'function');
    retr = (retr && typeof subject.getRestrictions === 'function');
    retr = (retr && typeof subject.getPurposes === 'function');
    retr = (retr && typeof subject.isEmpty === 'function');
    retr = (retr && typeof subject.isEncodable === 'function');

    return retr;

  }

  private static isVector(potentialVector: unknown): potentialVector is Vector {

    let retr = false;
    const subject = potentialVector as Vector;

    retr = (typeof subject.maxId === 'number');
    retr = (retr && typeof subject.has === 'function');
    retr = (retr && typeof subject.set === 'function');
    retr = (retr && typeof subject.empty === 'function');
    retr = (retr && typeof subject.forEach === 'function');
    retr = (retr && typeof subject.size === 'number');
    retr = (retr && typeof subject.setAll === 'function');

    return retr;

  }

  private static isTCModel(potentialTCModel: unknown): potentialTCModel is TCModel {

    let retr = false;
    const subject = potentialTCModel as TCModel;
    retr = (typeof subject.isServiceSpecific === 'boolean');
    retr = (retr && typeof subject.useNonStandardStacks === 'boolean');
    retr = (retr && typeof subject.purposeOneTreatment === 'boolean');
    retr = (retr && typeof subject.publisherCountryCode === 'string');
    retr = (retr && this.isVector(subject.vendorsAllowed));
    retr = (retr && this.isVector(subject.vendorsDisclosed));
    retr = (retr && this.isVector(subject.purposeConsents));
    retr = (retr && this.isVector(subject.purposeLegitimateInterests));
    retr = (retr && this.isVector(subject.vendorConsents));
    retr = (retr && this.isVector(subject.vendorLegitimateInterests));
    retr = (retr && this.isVector(subject.specialFeatureOptins));
    retr = (retr && this.isVector(subject.publisherConsents));
    retr = (retr && this.isVector(subject.publisherLegitimateInterests));
    retr = (retr && this.isVector(subject.publisherCustomConsents));
    retr = (retr && this.isVector(subject.publisherCustomLegitimateInterests));
    retr = (retr && this.isPurposeRestrictionVector(subject.publisherRestrictions));

    return retr;

  }

  public static reset(): void {

    delete this.tcModel_;
    delete this.tcString_;
    delete this.cmpId;
    delete this.cmpVersion;
    delete this.gdprApplies;
    delete this.eventStatus;

    this.disabled_ = false;
    this.cmpStatus = CmpStatus.LOADING;
    this.displayStatus = DisplayStatus.HIDDEN;
    this.eventQueue.clear();

  }

}
