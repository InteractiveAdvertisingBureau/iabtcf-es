import {TCModelFactory} from './TCModelFactory';
import {TCString} from '@iabtcf/core';

export class TCStringFactory {

  public static base(forSaving = false): string {

    return TCString.encode(TCModelFactory.withGVL(), forSaving);

  }

  public static withPubRestrictions(forSaving: boolean): string {

    return TCString.encode(TCModelFactory.addPublisherRestrictions(TCModelFactory.withGVL()), forSaving);

  }

}
