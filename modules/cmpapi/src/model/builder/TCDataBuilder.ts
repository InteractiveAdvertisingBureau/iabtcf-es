import {Builder} from './Builder';

import {
  TCData,
} from '../TCData';

export class TCDataBuilder implements Builder {

  public build(): TCData {

    const tcData = new TCData();

    return tcData;

  }

  public isBuildable(): boolean {

    return true;

  }

}
