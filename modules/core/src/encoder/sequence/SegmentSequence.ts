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

        this.addPublisherTCMaybe(tcModel, '2');

      }

    } else {

      /**
       * this is a globally scoped string.
       *
       * If the publisher supports OOB, then the disclosed vendors vector will
       * be added to both the transmission string and the storage string
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

        if (tcModel[Fields.vendorsAllowed].size > 0) {

          this['2'].push(Segments.vendorsAllowed);

        }

        this.addPublisherTCMaybe(tcModel, '2');

      }

    }

  }

  private addPublisherTCMaybe(tcModel: TCModel, version: string): void {

    // is there any reason to add this?
    if (
      tcModel[Fields.publisherConsents].size > 0 ||
      tcModel[Fields.publisherLegitimateInterest].size > 0 ||
      tcModel[Fields.numCustomPurposes] > 0 ||
      tcModel[Fields.publisherCustomConsents].size > 0 ||
      tcModel[Fields.publisherCustomLegitimateInterest].size > 0
    ) {

      this[version].push(Segments.publisherTC);

    }

  }

}
