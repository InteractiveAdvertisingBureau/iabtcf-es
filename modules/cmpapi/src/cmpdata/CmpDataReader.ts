import {TCModel} from '@iabtcf/core';
import {CmpStatus, DisplayStatus, EventStatus} from '../status';

export interface CmpDataReader {
  readonly tcModelIsSet: boolean;

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
}
