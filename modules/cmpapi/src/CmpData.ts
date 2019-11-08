import {TCModel} from '@iabtcf/core';
import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {Constants} from './utilities';

/**
 * Class holds shareable data across cmp api
 */
export class CmpData {

  private _tcModel: TCModel;

  private _apiVersion: number;
  private _cmpId: number;
  private _cmpVersion: number;
  private _tcfPolicyVersion: number;
  private _gdprApplies: boolean;

  private _eventStatus: EventStatus;
  private _cmpStatus: CmpStatus;
  private _displayStatus: DisplayStatus;

  public constructor(cmpId: number, cmpVersion: number) {

    this._cmpId = cmpId;
    this._cmpVersion = cmpVersion;

    /**
     * Defaults
     * Todo: check these with chris
     */
    this._apiVersion = 3;
    this._tcfPolicyVersion = 2;
    this._cmpStatus = CmpStatus.LOADING;
    this._displayStatus = DisplayStatus.HIDDEN;

  }

  public get tcModelIsSet(): boolean {

    return !!this._tcModel;

  }

  public get tcModel(): TCModel {

    return this._tcModel;

  }

  /**
   * Sets the tc model and throws an error if its not valid
   * @throws {Error}
   * @param {TCModel} value
   */
  public set tcModel(value: TCModel) {

    if (value.isValid()) {

      this._tcModel = value;

    } else {

      throw new Error(Constants.TC_MODEL_INVALID);

    }

  }

  public get apiVersion(): number {

    return this._apiVersion;

  }

  public set apiVersion(value: number) {

    this._apiVersion = value;

  }

  public get cmpId(): number {

    return this._cmpId;

  }

  public set cmpId(value: number) {

    this._cmpId = value;

  }

  public get cmpVersion(): number {

    return this._cmpVersion;

  }

  public set cmpVersion(value: number) {

    this._cmpVersion = value;

  }

  public get tcfPolicyVersion(): number {

    return this._tcfPolicyVersion;

  }

  public set tcfPolicyVersion(value: number) {

    this._tcfPolicyVersion = value;

  }

  public get gdprApplies(): boolean {

    return this._gdprApplies;

  }

  public set gdprApplies(value: boolean) {

    this._gdprApplies = value;

  }

  public get eventStatus(): EventStatus {

    return this._eventStatus;

  }

  public set eventStatus(value: EventStatus) {

    this._eventStatus = value;

  }

  public get cmpStatus(): CmpStatus {

    return this._cmpStatus;

  }

  public set cmpStatus(value: CmpStatus) {

    this._cmpStatus = value;

  }

  public get displayStatus(): DisplayStatus {

    return this._displayStatus;

  }

  public set displayStatus(value: DisplayStatus) {

    this._displayStatus = value;

  }

}
