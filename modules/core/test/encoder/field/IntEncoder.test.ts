import {IntEncoder} from '../../../src/encoder/field/IntEncoder';
import {expect} from 'chai';

describe('encoder/field->IntEncoder', (): void => {

  describe('encode', (): void => {

    it('should encode an int and pad zeros to fill width', (): void => {

      const theInt = 10;
      const bitLength = 6;
      let encoded = '';

      expect((): void => {

        // shouldn't throw an error, '1010' fits in 6 bits
        encoded = IntEncoder.encode(theInt, bitLength);

      }).not.to.throw();

      // should be as long as specified
      expect(encoded.length).to.equal(bitLength);

      // should pad left with zeros
      expect(encoded).to.equal('00' + (theInt).toString(2));

    });

    it('should throw an error if the int is too large for the number of bits', (): void => {

      expect((): void => {

        // 3 is too small to fit binary '1010'
        IntEncoder.encode(10, 3);

      }).to.throw();

    });

    it('should throw an error if a negative int is passed', (): void => {

      expect((): void => {

        // 3 is too small to fit binary '1010'
        IntEncoder.encode(-1, 3);

      }).to.throw();

    });

  });

  describe('decode', (): void => {

    it('should decode an int and pad zeros to fill width', (): void => {

      const theInt = 10;
      const binaryStringInt = '000' + theInt.toString(2);
      let decoded;

      expect((): void => {

        // shouldn't throw an error, '1010' fits in 6 bits
        decoded = IntEncoder.decode(binaryStringInt, binaryStringInt.length);

      }).not.to.throw();

      // should be as long as specified
      expect(decoded).to.equal(theInt);

    });

  });

});
