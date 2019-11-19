import {TCModel} from '@iabtcf/core';
import {CmpStatus, DisplayStatus, EventStatus} from '../status';
import {Constants} from '../utilities';
import {CmpDataReader} from '.';
import {TcModelChangeEventHandler} from '../types';

/**
 * Class holds shareable data across cmp api and provides change event listener for TcModel
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

  public constructor(cmpId: number, cmpVersion: number) {

    this.cmpId = cmpId;
    this.cmpVersion = cmpVersion;

    /**
     * Defaults
     * Todo: check these with chris
     */
    this.apiVersion = 3;
    this.tcfPolicyVersion = 2;
    this.cmpStatus = CmpStatus.LOADING;
    this.displayStatus = DisplayStatus.HIDDEN;

  }

  public registerTcModelChangeEventCallback(tcModelChangeCallback: TcModelChangeEventHandler) {

    this.tcModelChangeEventCallback = tcModelChangeCallback;

  }

  public get tcModelIsSet(): boolean {

    return !!this.tcModel;

  }

  public getTcModel(): TCModel {

    return this.tcModel;

  }

  /**
   * Set TcModel and EventStatus
   * Todo: I think we might want to force the event status. Ask chris.
   * @param {TCModel} tcm
   * @param {EventStatus} eventStatus
   * @return {void}
   */
  public setTCModel(tcm: TCModel, eventStatus?: EventStatus): void {

    if (tcm.isValid()) {

      this.tcModel = tcm;
      this.eventStatus = eventStatus || this.eventStatus;

      this.tcModelChangeEventCallback();

    } else {

      throw new Error(Constants.TC_MODEL_INVALID);

    }

  }

  public getApiVersion(): number {

    return this.apiVersion;

  }

  public setApiVersion(value: number): void {

    this.apiVersion = value;

  }

  public getCmpId(): number {

    return this.cmpId;

  }

  public setCmpId(value: number): void {

    this.cmpId = value;

  }

  public getCmpVersion(): number {

    return this.cmpVersion;

  }

  public setCmpVersion(value: number): void {

    this.cmpVersion = value;

  }

  public getTcfPolicyVersion(): number {

    return this.tcfPolicyVersion;

  }

  public setTcfPolicyVersion(value: number): void {

    this.tcfPolicyVersion = value;

  }

  public getGdprApplies(): boolean {

    return this.gdprApplies;

  }

  public setGdprApplies(value: boolean): void {

    this.gdprApplies = value;

  }

  public getEventStatus(): EventStatus {

    return this.eventStatus;

  }

  public setEventStatus(value: EventStatus): void {

    this.eventStatus = value;

  }

  public getCmpStatus(): CmpStatus {

    return this.cmpStatus;

  }

  public setCmpStatus(value: CmpStatus): void {

    this.cmpStatus = value;

  }

  public getDisplayStatus(): DisplayStatus {

    return this.displayStatus;

  }

  public setDisplayStatus(value: DisplayStatus): void {

    this.displayStatus = value;

  }

}
