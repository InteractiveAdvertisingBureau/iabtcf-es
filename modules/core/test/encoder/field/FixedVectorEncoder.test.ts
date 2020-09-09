import {FixedVectorEncoder} from '../../../src/encoder/field/FixedVectorEncoder';
import {Vector} from '../../../src/model';
import {expect} from 'chai';

describe('FixedVectorEncoder', (): void => {

  describe('encode', (): void => {

    it('should encode a vector', (): void => {

      const vector: Vector = new Vector();
      const numBits = 10;

      vector.set(1);
      vector.set(2);
      vector.set(5);

      const result: string = FixedVectorEncoder.encode(vector, numBits);

      expect(result.length).to.equal(numBits);
      expect(result).to.equal('1100100000');

    });

  });

  describe('decode', (): void => {

    it('should decode a fixed vector', (): void => {

      const vectorBits = '01100011101';
      const vector: Vector = FixedVectorEncoder.decode(vectorBits, vectorBits.length);

      expect(vector.maxId).to.equal(vectorBits.length);

      for (let i = 0; i < vectorBits.length; i++) {

        const id = i + 1;

        if (vectorBits[i] === '1') {

          expect(vector.has(id)).to.be.true;

        } else {

          expect(vector.has(id)).to.be.false;

        }

      }

    });

  });

});
