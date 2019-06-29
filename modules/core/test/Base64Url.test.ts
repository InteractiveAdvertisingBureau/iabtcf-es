import {expect} from 'chai';
import {Base64Url} from '../src/tcstring/Base64Url';

describe('Base64Url', (): void => {

  const createRandomBinaryString = (length: number): string => {

    let str = '';

    for (let i = 0; i< length; i++) {

      str += Math.round(Math.random());

    }
    return str;

  };
  const testStr = (input: string): void => {

    it(`should encode and decode ${input.length} bit long input`, (): void => {

      const encoded = Base64Url.encode(input);
      const decoded = Base64Url.decode(encoded);

      /**
       * there might be some additional zeros added to the end if the string is
       * an arbitrary length and doesn't fit evenly into 6 bits
       *
       * put as many '0's in the front as the remainder of the length divided
       * by 6 bits
       */
      const expected = Base64Url.pad(input);

      expect(decoded).to.equal(expected);

    });

  };

  testStr(createRandomBinaryString(Math.pow(2, 1)));

  // length: 8
  testStr(createRandomBinaryString(Math.pow(2, 3)));

  // length: 16
  testStr(createRandomBinaryString(Math.pow(2, 4)));

  // length: 64
  testStr(createRandomBinaryString(Math.pow(2, 6)));

  // length: 256
  testStr(createRandomBinaryString(Math.pow(2, 8)));

  // length: 1024
  testStr(createRandomBinaryString(Math.pow(2, 10)));

});
