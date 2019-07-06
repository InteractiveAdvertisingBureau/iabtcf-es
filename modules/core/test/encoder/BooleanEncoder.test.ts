import {expect} from 'chai';
import {BooleanEncoder} from '../../src/tcstring/encoders/BooleanEncoder';

export function run(): void {

  describe('BooleanEncoder', (): void => {

    it('should encode true to 1', (): void => {

      const boolEnc: BooleanEncoder = new BooleanEncoder();

      expect(boolEnc.encode(true)).to.equal('1');

    });

    it('should encode false to 0', (): void => {

      const boolEnc: BooleanEncoder = new BooleanEncoder();

      expect(boolEnc.encode(false)).to.equal('0');

    });

  });

}
