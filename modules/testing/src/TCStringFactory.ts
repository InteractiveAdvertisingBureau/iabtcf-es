import {TCModelFactory} from './TCModelFactory.js';
import {TCString} from '@cookiehub/iabtcf-core';

export class TCStringFactory {

  public static base(isForSaving = false): string {

    const encodingOptions = {isForVendors: !isForSaving};
    const tcModel = TCModelFactory.withGVL();

    return TCString.encode(tcModel, encodingOptions);

  }

  public static withPubRestrictions(isForSaving = false): string {

    const encodingOptions = {isForVendors: !isForSaving};
    let tcModel = TCModelFactory.withGVL();

    tcModel = TCModelFactory.addPublisherRestrictions(tcModel);

    return TCString.encode(tcModel, encodingOptions);

  }

}
