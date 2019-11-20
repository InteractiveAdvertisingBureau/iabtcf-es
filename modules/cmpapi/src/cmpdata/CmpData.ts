import {TCModel} from '@iabtcf/core';
import {CmpDataReader} from './CmpDataReader';
import {CmpStatus, DisplayStatus, EventStatus} from '../status';
import {TcModelChangeEventHandler} from '../types';
import {ValidationMessages} from '../validation';

/**
 * Class holds shareable data across cmp api and provides change event listener for TcModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export class CmpData implements CmpDataReader {

  private tcModel: TCModel;

  private apiVersion: number;
  private cmpId: number;
  private cmpVersion: number;
  private tcfPolicyVersion: number;
  private gdprApplies: boolean;

  private eventStatus: EventStatus;
  private cmpStatus: CmpStatus;
  private displayStatus: DisplayStatus;

  private tcModelChangeEventCallback: TcModelChangeEventHandler;

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   */
  public constructor(cmpId: number, cmpVersion: number) {

    this.cmpId = cmpId;
    this.cmpVersion = cmpVersion;

    /**
     * Defaults
     * Todo: check these with chris and possibly have a settings/defaults class.
     */
    this.apiVersion = 3;
    this.tcfPolicyVersion = 2;
    this.cmpStatus = CmpStatus.LOADING;
    this.displayStatus = DisplayStatus.HIDDEN;

  }

  /**
   * Register a {TcModelChangeEventHandler} to be evoked when ever TcModel is updated.
   * @param {TcModelChangeEventHandler} tcModelChangeCallback
   * @return {void}
   */
  public registerTcModelChangeEventCallback(tcModelChangeCallback: TcModelChangeEventHandler): void {

    this.tcModelChangeEventCallback = tcModelChangeCallback;

  }

  /**
   * Returns true if the TcModel has been set
   */
  public get tcModelIsSet(): boolean {

    return !!this.tcModel;

  }

  /**
   * Returns the current TcModel
   * @return {TCModel}
   */
  public getTcModel(): TCModel {

    return this.tcModel;

  }

  /**
   * Sets clone of TcModel and EventStatus
   * Todo: I think we might want to force the event status. Ask chris.
   * @param {TCModel} tcModel
   * @param {EventStatus} eventStatus
   * @return {void}
   */
  public setTCModel(tcModel: TCModel, eventStatus?: EventStatus): void {

    if (tcModel.isValid()) {

      this.tcModel = tcModel.clone();
      this.eventStatus = eventStatus || this.eventStatus;

      this.tcModelChangeEventCallback();

    } else {

      throw new Error(ValidationMessages.TC_MODEL_INVALID);

    }

  }

  /**
   * Gets the Api Version
   * @return {number}
   */
  public getApiVersion(): number {

    return this.apiVersion;

  }

  /**
   * Sets the Api Version
   * @param {number} value
   */
  public setApiVersion(value: number): void {

    this.apiVersion = value;

  }

  /**
   * Gets the Cmp ID
   * @return {number}
   */
  public getCmpId(): number {

    return this.cmpId;

  }

  /**
   * Sets the Cmp ID
   * @param {number} value
   */
  public setCmpId(value: number): void {

    this.cmpId = value;

  }

  /**
   * Gets the Cmp Version
   * @return {number}
   */
  public getCmpVersion(): number {

    return this.cmpVersion;

  }

  /**
   * Sets the Cmp Version
   * @param {number} value
   */
  public setCmpVersion(value: number): void {

    this.cmpVersion = value;

  }

  /**
   * Gets the TCF Policy Version
   * @return {number}
   */
  public getTcfPolicyVersion(): number {

    return this.tcfPolicyVersion;

  }

  /**
   * Sets the TCF Policy Version
   * @param {number} value
   */
  public setTcfPolicyVersion(value: number): void {

    this.tcfPolicyVersion = value;

  }

  /**
   * Returns the current value for GDPR Applies
   * @return {boolean}
   */
  public getGdprApplies(): boolean {

    return this.gdprApplies;

  }

  /**
   * Sets the value for GDPR Applies
   * @param {boolean} value
   */
  public setGdprApplies(value: boolean): void {

    this.gdprApplies = value;

  }

  /**
   * Returns the current event status
   * @return {EventStatus}
   */
  public getEventStatus(): EventStatus {

    return this.eventStatus;

  }

  /**
   * Sets the event status
   * @param {EventStatus} value
   */
  public setEventStatus(value: EventStatus): void {

    this.eventStatus = value;

  }

  /**
   * Gets the CMP Status
   * @return {CmpStatus}
   */
  public getCmpStatus(): CmpStatus {

    return this.cmpStatus;

  }

  /**
   * Sets the CMP Status
   * @param {CmpStatus} value
   */
  public setCmpStatus(value: CmpStatus): void {

    this.cmpStatus = value;

  }

  /**
   * Gets the current Display Status
   * @return {DisplayStatus}
   */
  public getDisplayStatus(): DisplayStatus {

    return this.displayStatus;

  }

  /**
   * Sets the current Display Status
   * @param {DisplayStatus} value
   */
  public setDisplayStatus(value: DisplayStatus): void {

    this.displayStatus = value;

  }

}
