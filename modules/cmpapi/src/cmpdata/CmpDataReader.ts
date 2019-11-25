import {TCModel} from '@iabtcf/core';
import {CmpStatus, DisplayStatus, EventStatus} from '../status';

/**
 * CmpDataReader interface is used to define the methods used to read data from CmpData and restrict access to
 * set methods where applicable.
 */
export interface CmpDataReader {
  readonly tcModelIsSet: boolean;
  readonly tcModelIsValid: boolean;

  registerTcModelChangeEventCallback(tcModelChangeCallback: () => void): void;

  getTcModel(): TCModel;

  getApiVersion(): number;

  getCmpId(): number;

  getCmpVersion(): number;

  getTcfPolicyVersion(): number;

  getGdprApplies(): boolean;

  getEventStatus(): EventStatus;

  getCmpStatus(): CmpStatus;

  getDisplayStatus(): DisplayStatus;

  getDisabledByCmp(): boolean;
}
