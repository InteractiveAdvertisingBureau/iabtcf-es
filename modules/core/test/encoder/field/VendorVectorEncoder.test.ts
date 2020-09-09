import {VendorVectorEncoder, VectorEncodingType} from '../../../src/encoder/field';
import {expect} from 'chai';
import {BitLength} from '../../../src/encoder';
import {Vector} from '../../../src/model';

describe('VendorVectorEncoder', (): void => {

  const HEADER_LENGTH = 17;
  const RANGE_NUM_ENTRIES = 12;
  const SINGLE_RANGE = 33;

  describe('encode', (): void => {

    const pad = (value: string, numBits: number): string => {

      return '0'.repeat(numBits - value.length) + value;

    };

    const getFullySetVector = (maxId: number): Vector => {

      const vector: Vector = new Vector();

      for (let i = 1; i <= maxId; i++) {

        vector.set(i);

      }

      return vector;

    };

    it(`should encode a vector of length 10 with no gaps as a bitfield`, (): void => {

      const numVendors = 10;
      const vector: Vector = getFullySetVector(numVendors);
      const result: string = VendorVectorEncoder.encode(vector);

      expect(result.length, 'length is HEADER_LENGTH + numVendors').to.equal(HEADER_LENGTH + numVendors);

      // first bits should be the max id
      expect(result.substr(0, BitLength.maxId), `starts with maxId`).to.equal(pad((numVendors).toString(2), BitLength.maxId));
      expect(result.substr(BitLength.maxId, 1), 'BitField encoding type is 0').to.equal('0');
      const bitField = result.substr(HEADER_LENGTH);

      for (let i=0; i < bitField.length; i ++) {

        expect(bitField[i], `vendor #${i+1} should be 1 if true, 0 if false at index ${i}`).to.equal(vector.has(i+1) ? '1': '0');

      }

    });
    /**
       * At maxId 45, sequential vendors a bitfield should be exactly equal in
       * length to a range encoding, but a bitfield has preference for
       * the sake of simplicity
       */
    it(`should encode a vector of length 45 with no gaps as a bitfield`, (): void => {

      const numVendors = 45;
      const vector: Vector = getFullySetVector(numVendors);
      const result: string = VendorVectorEncoder.encode(vector);

      expect(result.length, 'length is HEADER_LENGTH + numVendors').to.equal(HEADER_LENGTH + numVendors);

      // first bits should be the max id
      expect(result.substr(0, BitLength.maxId), `starts with maxId`).to.equal(pad((numVendors).toString(2), BitLength.maxId));
      expect(result.substr(BitLength.maxId, 1), 'BitField encoding type is 0').to.equal('0');
      const bitField = result.substr(HEADER_LENGTH);

      for (let i=0; i < bitField.length; i ++) {

        expect(bitField[i], `vendor #${i+1} should be 1 if true, 0 if false at index ${i}`).to.equal(vector.has(i+1) ? '1': '0');

      }

    });

    /**
       * At maxId 46, sequential vendors a range should be 1 bit less than a
       * bitfield encoding and so it should encode as a range
       */
    it(`should encode a vector with 46 vendors and no gaps as a range`, (): void => {

      const numVendors = 46;
      const vector: Vector = getFullySetVector(numVendors);
      const result: string = VendorVectorEncoder.encode(vector);

      // bitfield would be numVendors + HEADER_LENGTH
      expect(result.length, 'length: header + num entries + 1 range').to.equal(HEADER_LENGTH + RANGE_NUM_ENTRIES + SINGLE_RANGE);

      let index = 0;

      // first bits should be the max id
      expect(parseInt(result.substr(index, BitLength.maxId), 2), 'first bits should be maxId')
        .to.equal(numVendors);

      index += BitLength.maxId;

      expect(result.substr(index, BitLength.encodingType), 'should be a range encoding ie. 1')
        .to.equal(VectorEncodingType.RANGE + '');

      index += BitLength.encodingType;

      expect(result.length - index).to.equal(SINGLE_RANGE + RANGE_NUM_ENTRIES);

      // should only be one entry
      expect(parseInt(result.substr(index, RANGE_NUM_ENTRIES), 2))
        .to.equal(1);

      index += RANGE_NUM_ENTRIES;

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

      const numVendors = 48;
      const vector: Vector = getFullySetVector(numVendors);

      // gap something in the middle
      vector.unset(Math.round(numVendors/2));

      const result: string = VendorVectorEncoder.encode(vector);

      expect(result.length).to.equal(HEADER_LENGTH + numVendors);

      // first bits should be the max id
      expect(result.substr(0, BitLength.maxId)).to.equal(pad((numVendors).toString(2), BitLength.maxId));
      expect(result.substr(BitLength.maxId, 1)).to.equal('0');
      const bitField = result.substr(HEADER_LENGTH);

      for (let i=0; i < bitField.length; i ++) {

        expect(bitField[i]).to.equal(!!vector.has(i+1) ? '1': '0');

      }

    });

    it('should encode a vector of length 100 1 gap as a range since a that would be shorter', (): void => {

      const numVendors = 100;
      const vector: Vector = getFullySetVector(numVendors);
      const vendorWithNo: number = numVendors/2;

      vector.unset(vendorWithNo);

      const result: string = VendorVectorEncoder.encode(vector);
      let index = 0;

      // check overall legnth
      expect(result.length, `length of the result should be ${HEADER_LENGTH + RANGE_NUM_ENTRIES + SINGLE_RANGE * 2}`)
        .to.equal(HEADER_LENGTH + RANGE_NUM_ENTRIES + SINGLE_RANGE * 2);

      // check the max id
      expect(parseInt(result.substr(index, BitLength.maxId), 2), `maxId should be ${vector.maxId}`)
        .to.equal(vector.maxId);

      index += BitLength.maxId;

      // encoding type 1 = range, 0 = bitfield
      expect(result.substr(index, 1), 'Encoding type should be 1').to.equal('1');
      index += 1;

      expect(parseInt(result.substr(index, RANGE_NUM_ENTRIES), 2), `numEntries should be 2`)
        .to.equal(2);

      index += RANGE_NUM_ENTRIES;

      // Ranges

      // --------------------- RANGE 1
      // should be a range singleOrRange 1 bit
      expect(result.substr(index, 1), 'first singeOrRange should be 1').to.equal('1');
      index += 1;

      // first ID should be 1
      expect(parseInt(result.substr(index, BitLength.vendorId), 2), 'first range first id should be 1')
        .to.equal(1);
      index += BitLength.vendorId; // +16

      // second ID should be vendorWithNo - 1
      expect(parseInt(result.substr(index, BitLength.vendorId), 2), `first range last id should be ${vendorWithNo - 1}`)
        .to.equal(vendorWithNo - 1);
      index += BitLength.vendorId; // +16

      // --------------------- RANGE 2
      // should be a range singleOrRange 1 bit
      expect(result.substr(index, 1), 'second singeOrRange should be 1').to.equal('1');
      index += 1;

      // first ID should be vendorIdWithNo + 1
      expect(parseInt(result.substr(index, BitLength.vendorId), 2), `second range first id should be ${vendorWithNo + 1}`)
        .to.equal(vendorWithNo + 1);
      index += BitLength.vendorId; // +16

      // second ID should be numVendors
      expect(parseInt(result.substr(index, BitLength.vendorId), 2), `second range last id should be ${numVendors}`)
        .to.equal(numVendors);
      index += BitLength.vendorId; // +16

    });

  });

  describe('decode', (): void => {

    const testIt = (numVendors: number, gaps: boolean): void => {

      const numGaps: number = Math.ceil(numVendors/4);
      const gapsOrNo: string = (gaps ? numGaps : 'no') + ' gaps';

      it(`should properly decode encoded vendor vector with ${numVendors} vendors and ${gapsOrNo}`, (): void => {

        const vector: Vector = new Vector();

        for (let i = 1; i <= numVendors; i ++) {

          if (!gaps || i % numGaps !== 0) {

            vector.set(i);

          }

        }

        const encoded = VendorVectorEncoder.encode(vector);
        const decodedVector = VendorVectorEncoder.decode(encoded);

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

    it('should decode a range with a single id', (): void => {

      const vector: Vector = new Vector();
      const numVendors = 100;

      for (let i = 0; i < numVendors; i ++) {

        // should give us a single entry on id 52
        if (i !== 50 && i !== 52) {

          vector.set(i + 1);

        }

      }

      const encoded = VendorVectorEncoder.encode(vector);
      const decodedVector = VendorVectorEncoder.decode(encoded);

      vector.forEach((value: boolean, id: number): void => {

        expect(decodedVector.has(id)).to.equal(value);

      });

    });

  });

});
