import {

  expect,

} from 'chai';

import {

  CoreFieldSequence,

} from '../../src/encoder/sequence';

export function run(): void {

  describe('CoreFieldSequence', (): void => {

    it('should have these values', (): void => {

      expect((): void => {

        const coreFieldSequence: CoreFieldSequence = new CoreFieldSequence();

        expect(coreFieldSequence['1'].length).to.equal(10);
        expect(coreFieldSequence['2'].length).to.equal(19);

      }).not.to.throw();

    });

  });

}
