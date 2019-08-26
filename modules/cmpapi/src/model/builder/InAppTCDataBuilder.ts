import {Builder} from './Builder';

import {
  InAppTCData,
} from '../InAppTCData';

export class InAppTCDataBuilder implements Builder {

  public build(): InAppTCData {

    const iaTCData = new InAppTCData();

    return iaTCData;

  }

  public isBuildable(): boolean {

    return true;

  }

}
