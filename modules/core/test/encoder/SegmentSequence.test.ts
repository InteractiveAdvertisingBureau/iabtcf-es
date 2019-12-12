import {expect} from 'chai';
import {
  TCModel,
} from '../../src/TCModel';
import {
  SegmentSequence,
} from '../../src/encoder';
import {
  Segments,
} from '../../src/model';

export function run(): void {

  const runPerm = (
    version: string,
    isServiceSpecific: boolean,
    isForSaving: boolean,
    hasVendorsAllowed: boolean,
    hasVendorsDisclosed: boolean,
    hasPublisherConsents: boolean,
    callback: (sequence: string[]) => void): void => {

    it(`should be this when: v${version}, isServiceSpecific=${isServiceSpecific}, isForSaving=${isForSaving}, hasVendorsAllowed=${hasVendorsAllowed}, hasVendorsDisclosed=${hasVendorsDisclosed}, hasPublisherConsents=${hasPublisherConsents}`, (): void => {

      const tcModel = new TCModel();

      tcModel.isServiceSpecific = isServiceSpecific;

      if (hasVendorsAllowed) {

        tcModel.vendorsAllowed.set(2);

      }

      if (hasVendorsDisclosed) {

        tcModel.vendorsDisclosed.set(2);

      }

      if (hasPublisherConsents) {

        tcModel.publisherConsents.set(2);

      }

      const sSequence = new SegmentSequence(tcModel, isForSaving);
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

    runPerm(
      version,
      boolSet[1],
      boolSet[2],
      boolSet[3],
      boolSet[4],
      boolSet[5],
      (sequence: string[]): void => {

        expect(sequence.length).to.be.above(0);

        if (version === '1') {

          expect(sequence.length, 'v1 sequences have 1 segment').to.equal(1);
          expect(sequence[0], 'v1 sequences just the core segment').to.equal(Segments.core);

        }

      });

  });

  /**
  it('should return only core for v1 when isForSaving=true & isServiceSpecific=true', (): void => {

    const tcModel = new TCModel();
    tcModel.isServiceSpecific = true;
    const sSequence = new SegmentSequence(tcModel, true);

    expect(sSequence['1'].length, 'v1 length').to.equal(1);
    expect(sSequence['1'][0]).to.equal(Segments.core);

  });

  it('should return only core for v1 when isForSaving=true & isServiceSpecific=false', (): void => {

    const tcModel = new TCModel();
    tcModel.isServiceSpecific = false;
    const sSequence = new SegmentSequence(tcModel, true);

    expect(sSequence['1'].length, 'v1 length').to.equal(1);
    expect(sSequence['1'][0]).to.equal(Segments.core);

  });

  it('should return only core for v1 when isForSaving=false & isServiceSpecific=true', (): void => {

    const tcModel = new TCModel();
    tcModel.isServiceSpecific = true;
    const sSequence = new SegmentSequence(tcModel, false);

    expect(sSequence['1'].length, 'v1 length').to.equal(1);
    expect(sSequence['1'][0]).to.equal(Segments.core);

  });

  it('should return only core for v1 when isForSaving=false & isServiceSpecific=false', (): void => {

    const tcModel = new TCModel();
    tcModel.isServiceSpecific = false;
    const sSequence = new SegmentSequence(tcModel, false);

    expect(sSequence['1'].length, 'v1 length').to.equal(1);
    expect(sSequence['1'][0]).to.equal(Segments.core);

  });

  it('should be this when: v2, isServiceSpecific=true, isForSaving=true, vendorsAllowed=empty, vendorsDisclosed=empty, publisherConsents=empty', (): void => {

    const tcModel = new TCModel();
    tcModel.isServiceSpecific = true;
    const sSequence = new SegmentSequence(tcModel, true);

    expect(sSequence['2'].length, 'v2 length').to.equal(1);
    expect(sSequence['2'][0]).to.equal(Segments.core);

  });

  it('should be this when: v2, isServiceSpecific=true, isForSaving=true, vendorsAllowed=empty, vendorsDisclosed=empty, publisherConsents=something', (): void => {

    const tcModel = new TCModel();

    tcModel.isServiceSpecific = true;
    tcModel.publisherConsents.set(1);

    const sSequence = new SegmentSequence(tcModel, true);

    expect(sSequence['2'].length, 'v2 length').to.equal(2);
    expect(sSequence['2'][0]).to.equal(Segments.core);
    expect(sSequence['2'][1]).to.equal(Segments.publisherTC);

  });

  it('should be this when: v2, isServiceSpecific=true, isForSaving=true, vendorsAllowed=empty, vendorsDisclosed=something, publisherConsents=empty', (): void => {

    const tcModel = new TCModel();
    tcModel.isServiceSpecific = true;
    const sSequence = new SegmentSequence(tcModel, true);

    expect(sSequence['2'].length, 'v2 length').to.equal(1);
    expect(sSequence['2'][0]).to.equal(Segments.core);

  });
  */

}
