import {VersionMap} from '.';
import {Fields} from '../model';

export class PublisherFieldSequence implements VersionMap {

  public readonly '1': string[] = [];
  public readonly '2': string[] = [
    Fields.publisherConsents,
    Fields.publisherLegitimateInterest,
    Fields.numCustomPurposes,
    Fields.publisherCustomConsents,
    Fields.publisherCustomLegitimateInterest,
  ];

}
