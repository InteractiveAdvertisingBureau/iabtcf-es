import {expect} from 'chai';
import {IntDecoder} from '../../src/decoders/IntDecoder';

export function run(): void {

  describe('IntDecoder', (): void => {

    it('should decode an int and pad zeros to fill width', (): void => {

      const intDec: IntDecoder = new IntDecoder();
      const theInt = 10;
      const binaryStringInt = '000' + theInt.toString(2);
      let decoded;

      expect((): void => {

        // shouldn't throw an error, '1010' fits in 6 bits
        decoded = intDec.decode(binaryStringInt);

      }).not.to.throw();

      // should be as long as specified
      expect(decoded).to.equal(theInt);

    });

  });

}
