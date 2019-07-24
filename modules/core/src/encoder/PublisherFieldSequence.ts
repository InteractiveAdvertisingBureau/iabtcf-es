import {VersionMap} from '.';
import {Fields} from '../model';

export class PublisherFieldSequence implements VersionMap {

  public readonly '1': string[] = [];
  public readonly '2': string[] = [
    Fields.publisherConsents,
    Fields.publisherLITransparency,
    Fields.numCustomPurposes,
    Fields.publisherCustomConsents,
    Fields.publisherCustomLITransparency,
  ];

}
