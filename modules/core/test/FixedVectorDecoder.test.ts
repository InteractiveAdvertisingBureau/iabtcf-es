import {expect} from 'chai';
import {FixedVectorDecoder} from '../src/tcstring/decoders/FixedVectorDecoder';
import {Vector} from '../src/model/Vector';

describe('FixedVectorDecoder', (): void => {

  it('should decode a fixed vector', (): void => {

    const vectorBits = '01100011101';
    const fvDec: FixedVectorDecoder = new FixedVectorDecoder();

    const vector: Vector = fvDec.decode(vectorBits);

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
