import {expect} from 'chai';
import {DateEncoder} from '../../src/tcstring/encoders/DateEncoder';

export function run(): void {

  describe('DateEncoder', (): void => {


    it(`should encode a Date into 36 bits`, (): void => {

      const numBits =36;
      const dateEnc: DateEncoder = new DateEncoder();
      const date: Date = new Date();
      const encoded = dateEnc.encode(date, numBits);
      let expected: string = Math.round(date.getTime()/100).toString(2);

      // pad leading 0's
      expected = '0'.repeat(numBits - expected.length) + expected;

      expect(encoded.length).to.equal(numBits);
      expect(encoded).to.equal(expected);

    });

    it(`should not encode a Date into 26 bits`, (): void => {

      const numBits = 26;
      const dateEnc: DateEncoder = new DateEncoder();
      const date: Date = new Date();

      expect((): void => {

        const encoded = dateEnc.encode(date, numBits);

        expect.fail(`should have thrown and not returned ${encoded}`);

      }).to.throw();


    });


  });

}
