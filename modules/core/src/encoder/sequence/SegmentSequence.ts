import {SequenceVersionMap} from './SequenceVersionMap';
import {TCModel} from '../../';
import {
  Segments,
  Fields,
} from '../../model';

export class SegmentSequence implements SequenceVersionMap {

  public '1': string[] = [
    Segments.core,
  ]
  public '2': string[] = [
    Segments.core,
  ]

  public constructor(tcModel: TCModel, isForSaving: boolean) {

    if (tcModel.isServiceSpecific) {

      /**
       * If it's service specific only, then the publisher TC String can be
       * stored in the cookie and would be transmitted if it's not for
       * storage
       */

      if (isForSaving) {

        this['2'].push(Segments.publisherTC);

      }

    } else {

      /**
       * this is a globally scoped string.
       *
       * The disclosed vendors vector will be added to both the transmission
       * string and the storage string
       */

      if (tcModel[Fields.vendorsDisclosed].size > 0) {

        this['2'].push(Segments.vendorsDisclosed);

      }

      /**
       * If this string is not for saving then the vendors allowed vector can
       * be added – Otherwise, it should be omitted because this is a publisher
       * specific setting and we don't want to store publisher-specific
       * settings in the global cookie.
       */

      if (!isForSaving) {

        // if there is a vendorsAllowed then we should add it
        if (tcModel[Fields.vendorsAllowed].size > 0) {

          this['2'].push(Segments.vendorsAllowed);

        }

        this['2'].push(Segments.publisherTC);

      }

    }

  }

}
