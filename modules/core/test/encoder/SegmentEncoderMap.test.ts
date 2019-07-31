import {expect} from 'chai';
import {SegmentEncoderMap} from '../../src/encoder';

export function run(): void {

  describe('SegmentEncoderMap', (): void => {

    it('should have these values', (): void => {

      expect((): void => {

        const sem: SegmentEncoderMap = new SegmentEncoderMap();

        expect(sem.core).not.to.be.undefined;
        expect(sem.vendorsDisclosed).not.to.be.undefined;
        expect(sem.vendorsAllowed).not.to.be.undefined;
        expect(sem.publisherTC).not.to.be.undefined;

      }).not.to.throw();

    });

  });

}
