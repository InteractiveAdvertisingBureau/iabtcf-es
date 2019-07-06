import {expect} from 'chai';
import {LangDecoder} from '../../src/tcstring/decoders/LangDecoder';
import {LangEncoder} from '../../src/tcstring/encoders/LangEncoder';

export function run(): void {

  describe('LangDecoder', (): void => {

    const langDec: LangDecoder = new LangDecoder();
    const langEnc: LangEncoder = new LangEncoder();

    it('should decode an encoded language', (): void => {

      const lang = 'FR';
      const encoded = langEnc.encode(lang, 12);
      const decoded = langDec.decode(encoded);

      expect(decoded).to.equal(lang);

    });
    it('should throw an error if the bit length is odd', (): void => {

      const lang = 'FR';
      const encoded = langEnc.encode(lang, 12);

      expect((): void => {

        const decoded = langDec.decode('0' + encoded);

        expect.fail(`should have thrown an error and not returned: ${decoded}`);

      }).to.throw();

    });

  });

}
