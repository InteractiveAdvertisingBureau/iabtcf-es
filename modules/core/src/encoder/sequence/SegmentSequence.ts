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

  public constructor(tcModel: TCModel, isForSaving = false, includeDisclosedVendors = false) {

    if (+tcModel.version === 2) {

      if (tcModel.isServiceSpecific) {

        /**
         * If it's service specific only, then the publisher TC String can be
         * stored in the cookie and would be transmitted if it's not for
         * storage
         */

        if (includeDisclosedVendors) {

          this['2'].push(Segments.vendorsDisclosed);

        }

        this['2'].push(Segments.publisherTC);

      } else {

        /**
         * including vendors disclosed only if it is for saving (to the global
         * scope) or supportOOB is turned on (either or both).  The compliment
         * of this being not for saving (surfaced to CMP) and no support of
         * OOB.
         */
        if (isForSaving || tcModel[Fields.supportOOB]) {

          this['2'].push(Segments.vendorsDisclosed);

        }

        if (!isForSaving) {

          /**
           * If a publisher does support OOB and they have narrowed the allowed
           * vendors to utilize it, then we should include the vendors allowed
           * segment.  If it is empty then there are no restrictions, if that
           * is intended to mean no support for OOB, then the flag should be
           * set for that instead.
           *
           */
          if (tcModel[Fields.supportOOB] && tcModel[Fields.vendorsAllowed].size > 0) {

            this['2'].push(Segments.vendorsAllowed);

          }

          /**
           * Always include the publisher TC segment as long as this TC string
           * is not intended to be saved in the global scope.
           */
          this['2'].push(Segments.publisherTC);

        }

      }

    }

  }

}
