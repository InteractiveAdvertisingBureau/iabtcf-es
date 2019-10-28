import {Builder} from './Builder';

import {
  InAppTCData,
} from '../InAppTCData';

import {

  TCModel,

} from '@iabtcf/core';

export class InAppTCDataBuilder implements Builder {

  public tcModel: TCModel;

  public build(vendors?: number[]): InAppTCData {

    const iaTCData = new InAppTCData();

    if (vendors) {
    }


    return iaTCData;

  }

  public isBuildable(): boolean {

    return true;

  }

}
