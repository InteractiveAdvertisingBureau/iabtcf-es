import {BooleanEncoder} from '../../../src/encoder/field/BooleanEncoder';
import {expect} from 'chai';

describe('encoder/field->BooleanEncoder', (): void => {

  describe('encode', (): void => {

    it('should encode true to 1', (): void => {

      expect(BooleanEncoder.encode(true)).to.equal('1');

    });

    it('should encode false to 0', (): void => {

      expect(BooleanEncoder.encode(false)).to.equal('0');

    });

  });
  describe('decode', (): void => {

    it('should decode 1 to true', (): void => {

      expect(BooleanEncoder.decode('1')).to.be.true;

    });

    it('should decode 0 to false', (): void => {

      expect(BooleanEncoder.decode('0')).to.be.false;

    });

  });

});
