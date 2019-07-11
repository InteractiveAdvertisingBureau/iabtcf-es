import {expect} from 'chai';
import {FixedVectorEncoder} from '../../src/encoders/FixedVectorEncoder';
import {Vector} from '../../src/model/structures/Vector';

export function run(): void {

  describe('FixedVectorEncoder', (): void => {

    it('should encode a vector', (): void => {

      const vector: Vector = new Vector();
      const numBits = 10;

      vector.set(1);
      vector.set(2);
      vector.set(5);

      const FVEnc: FixedVectorEncoder = new FixedVectorEncoder();

      const result: string = FVEnc.encode(vector, numBits);

      expect(result.length).to.equal(numBits);
      expect(result).to.equal('1100100000');

    });

  });

}
