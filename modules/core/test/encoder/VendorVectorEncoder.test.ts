import {expect} from 'chai';

import {
  VendorVectorEncoder,
  VectorEncodingType,
  BitLength,
} from '../../src/encoder';

import {Vector} from '../../src/model';

export function run(): void {

  describe('VendorVectorEncoder', (): void => {

    describe('encode', (): void => {

      const headerLength = BitLength.maxId + BitLength.encodingType;

      const pad = (value: string, numBits: number): string => {

        return '0'.repeat(numBits - value.length) + value;

      };

      const getVector = (maxId: number): Vector => {

        const vector: Vector = new Vector();

        for (let i = 1; i <= maxId; i++) {

          vector.set(i);

        }
        return vector;

      };

      it('should encode a vector of length 10 with no gaps as a bitfield', (): void => {

        const vvEnc: VendorVectorEncoder = new VendorVectorEncoder();
        const numVendors = 10;
        const vector: Vector = getVector(numVendors);
        const result: string = vvEnc.encode(vector);

        expect(result.length).to.equal(headerLength + numVendors);

        // first bits should be the max id
        expect(result.substr(0, BitLength.maxId)).to.equal(pad((numVendors).toString(2), BitLength.maxId));
        expect(result.substr(BitLength.maxId, 1)).to.equal('0');
        const bitField = result.substr(headerLength);

        for (let i=0; i < bitField.length; i ++) {

          expect(bitField[i]).to.equal(vector.has(i+1) ? '1': '0');

        }

      });

      /**
       * a single range is 46, if they are both 47 then it defaults to bitfield
       * encoding so for it to kick over to a range encoding there must be a
       * sequence of at least 48 vendors without gaps.
       */
      it('should encode a vector with 48 vendors and no gaps as a range', (): void => {

        const vvEnc: VendorVectorEncoder = new VendorVectorEncoder();
        const numVendors = 48;
        const singleRangeLength = 46;
        const vector: Vector = getVector(numVendors);
        const result: string = vvEnc.encode(vector);

        // bitfield would be numVendors + headerLength
        expect(result.length).to.equal(headerLength + singleRangeLength);

        let index = 0;

        // first bits should be the max id
        expect(parseInt(result.substr(index, BitLength.maxId), 2), 'first bits should be maxId')
          .to.equal(numVendors);

        index += BitLength.maxId;

        expect(result.substr(index, BitLength.encodingType), 'should be a range encoding ie. 1')
          .to.equal(VectorEncodingType.RANGE + '');

        index += BitLength.encodingType;

        expect(result.length - index).to.equal(1 + BitLength.numEntries + 1 + 2* BitLength.vendorId);

        // Range headers
        // default encoding bit for range;
        expect(result.substr(index, 1)).to.equal('0');

        index += 1;

        // should only be one entry
        expect(result.substr(index, BitLength.numEntries))
          .to.equal(pad('1', BitLength.numEntries));

        index += BitLength.numEntries;

        // each range

        // should be a range singleOrRange 1 bit
        expect(result.substr(index, BitLength.singleOrRange)).to.equal('1');
        index += BitLength.singleOrRange;

        // first ID should be 1
        expect(result.substr(index, BitLength.vendorId)).to.equal(pad('1', BitLength.vendorId));
        index += BitLength.vendorId;

        // second ID should be numVendors
        expect(result.substr(index, BitLength.vendorId)).to.equal(pad(numVendors.toString(2) + '', BitLength.vendorId));

      });

      it('should encode a vector of length 48 1 gap as a bitfield since a that would be shorter', (): void => {

        const vvEnc: VendorVectorEncoder = new VendorVectorEncoder();
        const numVendors = 48;
        const vector: Vector = getVector(numVendors);

        // gap something in the middle
        vector.unset(Math.round(numVendors/2));

        const result: string = vvEnc.encode(vector);

        expect(result.length).to.equal(headerLength + numVendors);

        // first bits should be the max id
        expect(result.substr(0, BitLength.maxId)).to.equal(pad((numVendors).toString(2), BitLength.maxId));
        expect(result.substr(BitLength.maxId, 1)).to.equal('0');
        const bitField = result.substr(headerLength);

        for (let i=0; i < bitField.length; i ++) {

          expect(bitField[i]).to.equal(!!vector.has(i+1) ? '1': '0');

        }

      });

      it('should encode a vector of length 100 1 gap as a range since a that would be shorter', (): void => {

        const vvEnc: VendorVectorEncoder = new VendorVectorEncoder();
        const numVendors = 100;
        const vector: Vector = getVector(numVendors);
        const vendorWithNo: number = numVendors/2;

        vector.unset(vendorWithNo);

        const result: string = vvEnc.encode(vector);
        const range = result.substr(headerLength);
        const rangeLength: number = 1 + BitLength.numEntries + 2*(1 + 2* BitLength.vendorId);
        let index = 0;

        // check overall legnths
        expect(result.length, `legnth of the result should be ${headerLength + rangeLength}`)
          .to.equal(headerLength + rangeLength);
        expect(range.length, `legnth of the range should be ${rangeLength}`)
          .to.equal(rangeLength);

        // first bits should be the max id
        const binMaxId: string = pad((numVendors).toString(2), BitLength.maxId);

        expect(result.substr(index, BitLength.maxId), `maxId should be ${binMaxId}`)
          .to.equal(binMaxId);
        index += BitLength.maxId;

        // encoding type 1 = range, 0 = bitfield
        expect(result.substr(index, 1), 'Encoding type should be 1').to.equal('1');
        index += 1;

        index = 0;

        // default encoding bit for range;
        expect(range.substr(0, 1), 'default range encoding should be 0').to.equal('0');
        index += 1;

        const rangeEntries: number = BitLength.numEntries;
        const expectedNumEntries: string = pad((2).toString(2), rangeEntries);

        expect(range.substr(index, rangeEntries), `numEntries should be ${expectedNumEntries}`)
          .to.equal(expectedNumEntries);

        index += rangeEntries;

        // each range

        // --------------------- RANGE 1
        // should be a range singleOrRange 1 bit
        expect(range.substr(index, 1), 'singeOrRange should be 1').to.equal('1');
        index += 1;

        // first ID should be 1
        expect(range.substr(index, BitLength.vendorId), 'first range id should be 1')
          .to.equal(pad('1', BitLength.vendorId));
        index += BitLength.vendorId;

        // second ID should be numVendors
        expect(range.substr(index, BitLength.vendorId), `second range entry should be ${vendorWithNo - 1}`)
          .to.equal(pad((vendorWithNo - 1).toString(2), BitLength.vendorId));
        index += BitLength.vendorId;

        // --------------------- RANGE 2
        // should be a range singleOrRange 1 bit
        expect(range.substr(index, 1), 'singeOrRange should be 1').to.equal('1');
        index += 1;

        // first ID should be vendorIdWithNo + 1
        expect(range.substr(index, BitLength.vendorId), `first range entry should be ${vendorWithNo + 1}`)
          .to.equal(pad((vendorWithNo + 1).toString(2), BitLength.vendorId));
        index += BitLength.vendorId;

        // second ID should be numVendors
        expect(range.substr(index, BitLength.vendorId), `first range entry should be ${numVendors}`)
          .to.equal(pad((numVendors).toString(2), BitLength.vendorId));
        index += BitLength.vendorId;

      });

    });
    describe('decode', (): void => {

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
          const encoded = vve.encode(vector);
          const decodedVector = vve.decode(encoded);

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
        let encoded = vve.encode(vector);
        const index = BitLength.maxId + 1;

        encoded = encoded.substr(0, index) + '1' + encoded.substr(index + 1);
        const decodedVector = vve.decode(encoded);

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
        const encoded = vve.encode(vector);
        const decodedVector = vve.decode(encoded);

        vector.forEach((value: boolean, id: number): void => {

          expect(decodedVector.has(id)).to.equal(value);

        });

      });

    });

  });

}
