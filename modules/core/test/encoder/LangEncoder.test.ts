import {expect} from 'chai';
import {LangEncoder} from '../../src/encoder/LangEncoder';


export function run(): void {

  describe('LangEncoder', (): void => {

    describe('encode', (): void => {

      const shouldBeOk = (testStr: string, numBits: number, expectedValue: string): void => {

        it(`should encode "${testStr}" into ${numBits} as "${expectedValue}"`, (): void => {

          const langEnc: LangEncoder = new LangEncoder();
          const encoded = langEnc.encode(testStr, numBits);

          expect(encoded).to.equal(expectedValue);

        });

      };

      const shouldBeNotOk = (testStr: string, numBits: number, reason: string): void => {

        it(`should not encode "${testStr}" into ${numBits}: ${reason}`, (): void => {

          const langEnc: LangEncoder = new LangEncoder();

          expect((): void => {

            const encoded = langEnc.encode(testStr, numBits);

            expect.fail(`should have thrown an error and not returned: ${encoded}`);

          }).to.throw();


        });

      };

      shouldBeOk('aa', 12, '000000000000');
      shouldBeOk('AA', 12, '000000000000');
      shouldBeOk('ba', 12, '000001000000');
      shouldBeOk('Ba', 12, '000001000000');
      shouldBeOk('zz', 12, '011001011001');
      shouldBeOk('ZZ', 12, '011001011001');

      shouldBeNotOk('{Z', 12, '"{" is just after "Z"');
      shouldBeNotOk('-Z', 12, '"-" is before "A"');
      shouldBeNotOk('US', 11, 'cannot encode into odd number of bits');
      shouldBeNotOk('ZZ', 8, 'will not fit into 4 bits per letter');

    });
    describe('decode', (): void => {

      const langEnc: LangEncoder = new LangEncoder();

      it('should decode an encoded language', (): void => {

        const lang = 'FR';
        const encoded = langEnc.encode(lang, 12);
        const decoded = langEnc.decode(encoded);

        expect(decoded).to.equal(lang);

      });
      it('should throw an error if the bit length is odd', (): void => {

        const lang = 'FR';
        const encoded = langEnc.encode(lang, 12);

        expect((): void => {

          const decoded = langEnc.decode('0' + encoded);

          expect.fail(`should have thrown an error and not returned: ${decoded}`);

        }).to.throw();

      });

    });

  });

}
