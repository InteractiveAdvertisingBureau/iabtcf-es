import {expect} from 'chai';
import {VendorVectorEncoder} from '../src/tcstring/encoder/VendorVectorEncoder';
import {Vector} from '../src/model/Vector';
import {BitLength} from '../src/model/BitLength';

describe('VendorVectorEncoder', (): void => {

  const encodingTypeBits = 1;
  const headerLength = BitLength.maxId + encodingTypeBits;

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

  it('should encode a vector of length 46 with no gaps as a range since 1 range is 45 bits', (): void => {

    const vvEnc: VendorVectorEncoder = new VendorVectorEncoder();
    const numVendors = 46;
    const vector: Vector = getVector(numVendors);
    const result: string = vvEnc.encode(vector);

    expect(result.length).to.equal(headerLength + numVendors);

    // first bits should be the max id
    expect(result.substr(0, BitLength.maxId)).to.equal(pad((numVendors).toString(2), BitLength.maxId));
    expect(result.substr(BitLength.maxId, 1)).to.equal('1');
    const range = result.substr(headerLength);

    expect(range.length).to.equal(1 + BitLength.rangeEncodingNumEntries + 1 + 2* BitLength.vendorId);

    let index = 0;

    // Range headers
    // default encoding bit for range;
    expect(range[0]).to.equal('0');

    index += 1;

    // should only be one entry
    expect(range.substr(index, BitLength.rangeEncodingNumEntries))
      .to.equal(pad('1', BitLength.rangeEncodingNumEntries));

    index += BitLength.rangeEncodingNumEntries;

    // each range

    // should be a range singleOrRange 1 bit
    expect(range.substr(index, 1)).to.equal('1');
    index += 1;

    // first ID should be 1
    expect(range.substr(index, BitLength.vendorId)).to.equal(pad('1', BitLength.vendorId));
    index += BitLength.vendorId;

    // second ID should be numVendors
    expect(range.substr(index, BitLength.vendorId)).to.equal(pad(numVendors.toString(2) + '', BitLength.vendorId));

  });

  it('should encode a vector of length 46 1 gap as a bitfield since a that would be shorter', (): void => {

    const vvEnc: VendorVectorEncoder = new VendorVectorEncoder();
    const numVendors = 46;
    const vector: Vector = getVector(numVendors);

    vector.unset(numVendors/2);

    const result: string = vvEnc.encode(vector);

    // set one to false to create a gap

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
    const rangeLength: number = 1 + BitLength.rangeEncodingNumEntries + 2*(1 + 2* BitLength.vendorId);
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

    const rangeEntries: number = BitLength.rangeEncodingNumEntries;
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
