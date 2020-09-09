import {LangEncoder} from '../../../src/encoder/field/LangEncoder';
import {expect} from 'chai';

describe('LangEncoder', (): void => {

  describe('encode', (): void => {

    const shouldBeOk = (testStr: string, numBits: number, expectedValue: string): void => {

      it(`should encode "${testStr}" into ${numBits} as "${expectedValue}"`, (): void => {

        const encoded = LangEncoder.encode(testStr, numBits);

        expect(encoded).to.equal(expectedValue);

      });

    };

    const shouldBeNotOk = (testStr: string, numBits: number, reason: string): void => {

      it(`should not encode "${testStr}" into ${numBits}: ${reason}`, (): void => {

        expect((): void => {

          const encoded = LangEncoder.encode(testStr, numBits);

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

    it('should decode an encoded language', (): void => {

      const lang = 'FR';
      const encoded = LangEncoder.encode(lang, 12);
      const decoded = LangEncoder.decode(encoded, 12);

      expect(decoded).to.equal(lang);

    });
    it('should throw an error if the bit length is odd', (): void => {

      const lang = 'FR';
      const encoded = LangEncoder.encode(lang, 12);

      expect((): void => {

        const decoded = LangEncoder.decode('0' + encoded, 12);

        expect.fail(`should have thrown an error and not returned: ${decoded}`);

      }).to.throw();

    });

  });

});
