import {BooleanEncoder} from '../src/encoder';
import {expect} from 'chai';

describe('BooleanEncoder', (): void => {

  describe('encode', (): void => {

    it('should encode true to 1', (): void => {

      const boolEnc: BooleanEncoder = new BooleanEncoder();

      expect(boolEnc.encode(true)).to.equal('1');

    });

    it('should encode false to 0', (): void => {

      const boolEnc: BooleanEncoder = new BooleanEncoder();

      expect(boolEnc.encode(false)).to.equal('0');

    });

  });
  describe('decode', (): void => {

    it('should decode 1 to true', (): void => {

      const boolEncoder: BooleanEncoder = new BooleanEncoder();

      expect(boolEncoder.decode('1')).to.be.true;

    });

    it('should decode 0 to false', (): void => {

      const boolEncoder: BooleanEncoder = new BooleanEncoder();

      expect(boolEncoder.decode('0')).to.be.false;

    });

  });

});
