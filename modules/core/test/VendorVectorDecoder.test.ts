import {expect} from 'chai';
import {VendorVectorDecoder} from '../src/tcstring/decoders/VendorVectorDecoder';
import {VendorVectorEncoder} from '../src/tcstring/encoders/VendorVectorEncoder';
import {Vector} from '../src/model/Vector';

describe('VendorVectorDecoder', (): void => {

  const testIt = (numVendors: number, gaps: boolean): void => {

    const numGaps: number = Math.ceil(numVendors/4);
    const gapsOrNo: string = (gaps ? numGaps : 'no') + ' gaps';

    it(`should properly decode encoded vendor vector with ${numVendors} vendors and ${gapsOrNo}`, (): void => {

      const vector: Vector = new Vector();

      for (let i = 0; i < numVendors; i ++) {

        const id: number = i + 1;

        if (!gaps && id % numGaps !== 0) {

          vector.set(id);

        }

      }

      const vve: VendorVectorEncoder = new VendorVectorEncoder();
      const vvd: VendorVectorDecoder = new VendorVectorDecoder();
      const encoded = vve.encode(vector);
      const decodedVector = vvd.decode(encoded);

      expect(vector.maxId).to.equal(decodedVector.maxId);

      vector.forEach((value: boolean, id: number): void => {

        expect(decodedVector.has(id)).to.equal(value);

      });

    });

  };

  testIt(10, false);
  testIt(100, false);
  testIt(10, true);
  testIt(22, true);
  testIt(50, true);
  testIt(400, true);

});
