import {SegmentSequence} from '../../../src/encoder/sequence/SegmentSequence';
import {TCModel} from '../../../src/TCModel';
import {Segment} from '../../../src/model';
import {PowerSet} from '@iabtechlabtcf/testing';
import {expect} from 'chai';

describe('encoder/sequence->SegmentSequence', (): void => {

  const runPerm = (
    version: number,
    isServiceSpecific: boolean,
    isForSaving: boolean,
    hasVendorsAllowed: boolean,
    supportOOB: boolean,
    callback: (sequence: string[]) => void): void => {

    // eslint-disable-next-line max-len
    it(`v${version}:  isServiceSpecific=${isServiceSpecific}, isForSaving=${isForSaving}, hasVendorsAllowed=${hasVendorsAllowed}, and supportOOB=${supportOOB}`, (): void => {

      const tcModel = new TCModel();

      tcModel.version = 2;
      tcModel.isServiceSpecific = isServiceSpecific;
      tcModel.supportOOB = supportOOB;

      if (hasVendorsAllowed) {

        tcModel.vendorsAllowed.set(2);

      }

      const sSequence = new SegmentSequence(tcModel, {isForVendors: !isForSaving});
      callback(sSequence[version]);

    });

  };

  PowerSet.generate(5).forEach((boolSet: boolean[]): void => {

    const version = (+boolSet[0] + 1);
    const isServiceSpecific = boolSet[1];
    const isForSaving = boolSet[2];
    const hasVendorsAllowed = boolSet[3];
    const supportOOB = boolSet[4];

    runPerm(
      version,
      isServiceSpecific,
      isForSaving,
      hasVendorsAllowed,
      supportOOB,
      (sequence: string[]): void => {

        expect(sequence.length, `sequence.length`).to.not.equal(0);
        expect(sequence[0], `sequence[0]`).to.equal(Segment.CORE);

        if (version === 1) {

          expect(sequence.length, `sequence.length`).to.equal(1);

        } else if (version === 2) {

          if (isServiceSpecific) {

            /**
             * v2:  isServiceSpecific=true, isForSaving=true, hasVendorsAllowed=true, and supportOOB=true
             * v2:  isServiceSpecific=true, isForSaving=true, hasVendorsAllowed=false, and supportOOB=true
             * v2:  isServiceSpecific=true, isForSaving=true, hasVendorsAllowed=true, and supportOOB=false
             * v2:  isServiceSpecific=true, isForSaving=true, hasVendorsAllowed=false, and supportOOB=false
             * v2:  isServiceSpecific=true, isForSaving=false, hasVendorsAllowed=true, and supportOOB=true
             * v2:  isServiceSpecific=true, isForSaving=false, hasVendorsAllowed=false, and supportOOB=true
             * v2:  isServiceSpecific=true, isForSaving=false, hasVendorsAllowed=true, and supportOOB=false
             * v2:  isServiceSpecific=true, isForSaving=false, hasVendorsAllowed=false, and supportOOB=false
             */

            expect(sequence.length, `sequence.length`).to.equal(2);
            expect(sequence[1], `sequence[1]`).to.equal(Segment.PUBLISHER_TC);

          } else {

            if (!isForSaving) {

              if (supportOOB) {

                if (hasVendorsAllowed) {

                  // v2:  isServiceSpecific=false, isForSaving=false, hasVendorsAllowed=true, and supportOOB=true
                  expect(sequence.length, `sequence.length`).to.equal(4);
                  expect(sequence[1], `sequence[1]`).to.equal(Segment.VENDORS_DISCLOSED);
                  expect(sequence[2], `sequence[2]`).to.equal(Segment.VENDORS_ALLOWED);
                  expect(sequence[3], `sequence[3]`).to.equal(Segment.PUBLISHER_TC);

                } else {

                  // v2:  isServiceSpecific=false, isForSaving=false, hasVendorsAllowed=false, and supportOOB=true
                  expect(sequence.length, `sequence.length`).to.equal(3);
                  expect(sequence[1], `sequence[1]`).to.equal(Segment.VENDORS_DISCLOSED);
                  expect(sequence[2], `sequence[2]`).to.equal(Segment.PUBLISHER_TC);

                }

              } else {

                // v2:  isServiceSpecific=false, isForSaving=false, hasVendorsAllowed=false, and supportOOB=false
                // v2:  isServiceSpecific=false, isForSaving=false, hasVendorsAllowed=true, and supportOOB=false
                expect(sequence.length, `sequence.length`).to.equal(2);
                expect(sequence[1], `sequence[1]`).to.equal(Segment.PUBLISHER_TC);

              }

            } else {

              /**
               * globally scoped strings for saving should only contain core
               * and vendors disclosed
               * v2:  isServiceSpecific=false, isForSaving=true, hasVendorsAllowed=true, and supportOOB=true
               * v2:  isServiceSpecific=false, isForSaving=true, hasVendorsAllowed=false, and supportOOB=true
               * v2:  isServiceSpecific=false, isForSaving=true, hasVendorsAllowed=true, and supportOOB=false
               * v2:  isServiceSpecific=false, isForSaving=true, hasVendorsAllowed=false, and supportOOB=false
               */
              expect(sequence.length, `sequence.length`).to.equal(2);
              expect(sequence[1], `sequence[1]`).to.equal(Segment.VENDORS_DISCLOSED);

            }

          }

        }

      });

  });

});
