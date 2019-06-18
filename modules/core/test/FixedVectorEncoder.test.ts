import {expect} from 'chai';
import {FixedVectorEncoder} from '../src/tcstring/encoder/FixedVectorEncoder';
import {Vector} from '../src/model/Vector';

describe('FixedVectorEncoder', (): void => {

  it('should encode a vector', (): void => {

    const vector: Vector<boolean> = new Vector<boolean>();
    const numBits = 10;

    vector.set(1, true);
    vector.set(2, true);
    vector.set(5, true);

    const FVEnc: FixedVectorEncoder = new FixedVectorEncoder();

    const result: string = FVEnc.encode(vector, numBits);

    expect(result.length).to.equal(numBits);
    expect(result).to.equal('1100100000');

  });

});
