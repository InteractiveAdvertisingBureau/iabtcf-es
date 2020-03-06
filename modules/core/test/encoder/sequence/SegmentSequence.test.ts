import {SegmentSequence} from '../../../src/encoder/sequence/SegmentSequence';
import {TCModel} from '../../../src/TCModel';
import {Segments} from '../../../src/model';
import {expect} from 'chai';

describe('encoder/sequence->SegmentSequence', (): void => {

  const runPerm = (
    version: string,
    isServiceSpecific: boolean,
    isForSaving: boolean,
    hasVendorsAllowed: boolean,
    supportOOB: boolean,
    includeDisclosedVendors: boolean,
    callback: (sequence: string[]) => void): void => {

    // eslint-disable-next-line max-len
    it(`should be this when: v${version}, isServiceSpecific=${isServiceSpecific}, isForSaving=${isForSaving}, hasVendorsAllowed=${hasVendorsAllowed}, supportOOB=${supportOOB}, includeDisclosedVendors=${includeDisclosedVendors}`, (): void => {

      const tcModel = new TCModel();

      tcModel.isServiceSpecific = isServiceSpecific;
      tcModel.supportOOB = supportOOB;

      if (hasVendorsAllowed) {

        tcModel.vendorsAllowed.set(2);

      }

      const sSequence = new SegmentSequence(tcModel, isForSaving, includeDisclosedVendors);
      callback(sSequence[version]);

    });

  };

  const numValues = 6;
  const total = 1 << numValues;
  const powSet: boolean[][] = [];

  for (let i =0; i < total; i++) {

    const group: boolean[] = [];

    for (let j=0; j < numValues; j++) {

      group.push(!!((i >> j) & 1));

    }

    powSet.push(group);

  }

  powSet.forEach((boolSet: boolean[]): void => {

    const version = (+boolSet[0] + 1).toString();
    const isServiceSpecific = boolSet[1];
    const isForSaving = boolSet[2];
    const hasVendorsAllowed = boolSet[3];
    const supportOOB = boolSet[4];
    const includeDisclosedVendors = boolSet[5];

    const boolStr = `version: ${version}, isServiceSpecific=${isServiceSpecific}, isForSaving=${isForSaving}, hasVendorsAllowed=${hasVendorsAllowed}, supportOOB=${supportOOB}, includeDisclosedVendors=${includeDisclosedVendors}`;

    runPerm(
      version,
      isServiceSpecific,
      isForSaving,
      hasVendorsAllowed,
      supportOOB,
      includeDisclosedVendors,
      (sequence: string[]): void => {

        expect(sequence.length, `sequence.length - ${boolStr}`).to.not.equal(0);
        expect(sequence[0], `sequence[0] - ${boolStr}`).to.equal(Segments.core);

        if (version === '1') {

          expect(sequence.length, `sequence.length - ${boolStr}`).to.equal(1);

        } else if (version === '2') {

          if (isServiceSpecific) {

            if (includeDisclosedVendors) {

              expect(sequence.length, `sequence.length - ${boolStr}`).to.equal(3);
              expect(sequence[1], `sequence[1] - ${boolStr}`).to.equal(Segments.vendorsDisclosed);
              expect(sequence[2], `sequence[2] - ${boolStr}`).to.equal(Segments.publisherTC);

            } else {

              expect(sequence.length, `sequence.length - ${boolStr}`).to.equal(2);
              expect(sequence[1], `sequence[1] - ${boolStr}`).to.equal(Segments.publisherTC);

            }

          } else {

            if (isForSaving || supportOOB) {

              expect(sequence[1], `sequence[1] - ${boolStr}`).to.equal(Segments.vendorsDisclosed);

            }

            if (!isForSaving) {

              if (supportOOB && hasVendorsAllowed) {

                expect(sequence[2], `sequence[2] - ${boolStr}`).to.equal(Segments.vendorsAllowed);
                expect(sequence[3], `sequence[3] - ${boolStr}`).to.equal(Segments.publisherTC);
                expect(sequence.length, `sequence.length - ${boolStr}`).to.equal(4);

              }

              expect(sequence[sequence.length - 1], `sequence[sequence.length - 1] - ${boolStr}`).to.equal(Segments.publisherTC);

            }

          }

        }

      });

  });

});
