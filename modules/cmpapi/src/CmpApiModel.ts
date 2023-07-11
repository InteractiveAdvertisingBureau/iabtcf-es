import {CmpStatus, DisplayStatus, EventStatus} from './status/index.js';
import {EventListenerQueue} from './EventListenerQueue.js';
import {TCModel} from '@iabtechlabtcf/core';

/**
 * Class holds shareable data across cmp api and provides change event listener for TcModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export class CmpApiModel {

  public static readonly apiVersion = '2';
  public static tcfPolicyVersion: number;
  public static readonly eventQueue = new EventListenerQueue();
  public static cmpStatus: CmpStatus = CmpStatus.LOADING;
  public static disabled = false;
  public static displayStatus: DisplayStatus = DisplayStatus.HIDDEN;

  public static cmpId: number;
  public static cmpVersion: number;
  public static eventStatus: EventStatus;
  public static gdprApplies: boolean;
  public static tcModel: TCModel;
  public static tcString: string;

  public static reset(): void {

    delete this.cmpId;
    delete this.cmpVersion;
    delete this.eventStatus;
    delete this.gdprApplies;
    delete this.tcModel;
    delete this.tcString;
    delete this.tcfPolicyVersion;

    this.cmpStatus = CmpStatus.LOADING;
    this.disabled = false;
    this.displayStatus = DisplayStatus.HIDDEN;
    this.eventQueue.clear();

  }

}
