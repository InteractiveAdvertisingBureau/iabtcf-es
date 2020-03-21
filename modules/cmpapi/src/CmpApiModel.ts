import {CmpStatus, DisplayStatus, EventStatus} from './status';
import {EventListenerQueue} from './EventListenerQueue';
import {TCModel} from '@iabtcf/core';

/**
 * Class holds shareable data across cmp api and provides change event listener for TcModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export class CmpApiModel {

  public static readonly apiVersion = '2';
  public static readonly tcfPolicyVersion = 2;
  public static readonly eventQueue = new EventListenerQueue();
  public static disabled = false;
  public static cmpStatus: CmpStatus = CmpStatus.LOADING;
  public static displayStatus: DisplayStatus = DisplayStatus.HIDDEN;

  public static eventStatus: EventStatus;
  public static cmpId: number;
  public static cmpVersion: number;
  public static gdprApplies: boolean;
  public static tcModel: TCModel;
  public static tcString: string;

  public static reset(): void {

    delete this.tcModel;
    delete this.tcString;
    delete this.cmpId;
    delete this.cmpVersion;
    delete this.gdprApplies;
    delete this.eventStatus;

    this.disabled = false;
    this.cmpStatus = CmpStatus.LOADING;
    this.displayStatus = DisplayStatus.HIDDEN;
    this.eventQueue.clear();

  }

}
