import {TCModel} from '@iabtcf/core';
import {CmpDataReader} from './CmpDataReader';
import {CmpStatus, DisplayStatus, EventStatus} from '../status';
import {TcModelChangeEventHandler} from '../types';
import {ValidationMessages} from '../validation';
import {settings} from '../settings';

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
  private disabledByCmp: boolean;

  /**
   * Constructor
   * @param {number} cmpId
   * @param {number} cmpVersion
   */
  public constructor(cmpId: number, cmpVersion: number) {

    this.cmpId = cmpId;
    this.cmpVersion = cmpVersion;

    /**
     * Defaults from settings
     */
    this.apiVersion = settings.apiVersion;
    this.tcfPolicyVersion = settings.tcfPolicyVersion;
    this.cmpStatus = settings.defaults.cmpStatus;
    this.displayStatus = settings.defaults.displayStatus;
    this.eventStatus = settings.defaults.eventStatus || this.eventStatus;

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
   * Sets clone of TcModel
   * @param {TCModel} tcModel
   * @return {void}
   */
  public setTCModel(tcModel: TCModel): void {

    const clonedTcModel = tcModel.clone();

    this.tcModel = clonedTcModel;
    
    if (this.tcModelChangeEventCallback) {
        
        this.tcModelChangeEventCallback();
        
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

  /**
   * Sets disabledByCmp
   * @param {boolean} value
   */
  public setDisabledByCmp(value: boolean): void {

    this.disabledByCmp = value;

  }

  /**
   * Gets the value of disabledByCmp
   * @return {boolean}
   */
  public getDisabledByCmp(): boolean {

    return this.disabledByCmp;

  }

}
