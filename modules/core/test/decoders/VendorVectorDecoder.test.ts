import {expect} from 'chai';
import {VendorVectorDecoder} from '../../src/decoders/VendorVectorDecoder';
import {VendorVectorEncoder} from '../../src/encoders/VendorVectorEncoder';
import {BitLength} from '../../src/model/BitLength';
import {Vector} from '../../src/model/structures/Vector';

export function run(): void {

  describe('VendorVectorDecoder', (): void => {

    const testIt = (numVendors: number, gaps: boolean): void => {

      const numGaps: number = Math.ceil(numVendors/4);
      const gapsOrNo: string = (gaps ? numGaps : 'no') + ' gaps';

      it(`should properly decode encoded vendor vector with ${numVendors} vendors and ${gapsOrNo}`, (): void => {

        const vector: Vector = new Vector();

        for (let i = 0; i < numVendors; i ++) {

          const id: number = i + 1;

          if (!gaps || id % numGaps !== 0) {

            vector.set(id);

          }

        }

        const vve: VendorVectorEncoder = new VendorVectorEncoder();
        const vvd: VendorVectorDecoder = new VendorVectorDecoder();
        const encoded = vve.encode(vector);
        const decodedVector = vvd.decode(encoded);

        expect(decodedVector.maxId).to.equal(vector.maxId);

        vector.forEach((value: boolean, id: number): void => {

          expect(decodedVector.has(id)).to.equal(value);

        });

      });

    };

    testIt(10, false);
    testIt(100, false);
    testIt(46, false);
    testIt(10, true);
    testIt(22, true);
    testIt(50, true);
    testIt(400, true);

    it('should decode a range with true as default value', (): void => {

      const vector: Vector = new Vector();
      const numVendors = 100;

      for (let i = 0; i < numVendors; i ++) {

        // putta gap in dere
        if (i !== 50) {

          vector.set(i + 1);

        }

      }

      const vve: VendorVectorEncoder = new VendorVectorEncoder();
      const vvd: VendorVectorDecoder = new VendorVectorDecoder();
      let encoded = vve.encode(vector);
      const index = BitLength.maxId + 1;

      encoded = encoded.substr(0, index) + '1' + encoded.substr(index + 1);
      const decodedVector = vvd.decode(encoded);

      vector.forEach((value: boolean, id: number): void => {

        expect(decodedVector.has(id)).to.equal(!value);

      });

    });

    it('should decode a range with a single id', (): void => {

      const vector: Vector = new Vector();
      const numVendors = 100;

      for (let i = 0; i < numVendors; i ++) {

        // putta gap in dere
        // eslint-disable-next-line
      if (i !== 49) {

          vector.set(i + 1);

        }
        if (i !== 51) {

          vector.set(i + 1);

        }

      }

      const vve: VendorVectorEncoder = new VendorVectorEncoder();
      const vvd: VendorVectorDecoder = new VendorVectorDecoder();
      const encoded = vve.encode(vector);
      const decodedVector = vvd.decode(encoded);

      vector.forEach((value: boolean, id: number): void => {

        expect(decodedVector.has(id)).to.equal(value);

      });

    });

  });

}
