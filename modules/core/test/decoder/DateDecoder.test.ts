import {expect} from 'chai';
import {DateDecoder} from '../../src/tcstring/decoders/DateDecoder';
import {DateEncoder} from '../../src/tcstring/encoders/DateEncoder';

export function run(): void {

  describe('DateDecoder', (): void => {

    it(`should decode a Date`, (): void => {

      const dateDecoder: DateDecoder = new DateDecoder();
      const dateEncoder: DateEncoder = new DateEncoder();
      const date: Date = new Date();
      const encoded = dateEncoder.encode(date, 36);
      const decoded = dateDecoder.decode(encoded);
      const expected = Math.round(date.getTime()/100)*100;

      expect(decoded.getTime()).to.equal(expected);

    });


  });

}
