import {Builder} from './Builder';

import {
  TCData,
} from '../TCData';

import {
  TCModel,
} from '@iabtcf/core';

export class TCDataBuilder implements Builder {

  public tcModel: TCModel;

  public build(vendors?: number[]): TCData {

    const tcData = new TCData();

    if (vendors) {
    }

    return tcData;

  }

  public isBuildable(): boolean {

    return true;

  }

}
