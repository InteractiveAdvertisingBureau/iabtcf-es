import {expect} from 'chai';
import {IntEncoder} from '../src/tcstring/encoders/IntEncoder';

describe('IntEncoder', (): void => {

  it('should encode an int and pad zeros to fill width', (): void => {

    const intEnc: IntEncoder = new IntEncoder();
    const theInt = 10;
    const bitLength = 6;
    let encoded = '';

    expect((): void => {

      // shouldn't throw an error, '1010' fits in 6 bits
      encoded = intEnc.encode(theInt, bitLength);

    }).not.to.throw();

    // should be as long as specified
    expect(encoded.length).to.equal(bitLength);

    // should pad left with zeros
    expect(encoded).to.equal('00' + (theInt).toString(2));

  });

  it('should throw an error if the int is too large for the number of bits', (): void => {

    const intEnc: IntEncoder = new IntEncoder();

    expect((): void => {

      // 3 is too small to fit binary '1010'
      intEnc.encode(10, 3);

    }).to.throw();

  });

  it('should throw an error if a negative int is passed', (): void => {

    const intEnc: IntEncoder = new IntEncoder();

    expect((): void => {

      // 3 is too small to fit binary '1010'
      intEnc.encode(-1, 3);

    }).to.throw();

  });

});
