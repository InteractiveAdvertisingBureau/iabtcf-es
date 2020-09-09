import {VectorEncodingType} from '../../../src/encoder/field/VectorEncodingType';
import {expect} from 'chai';

describe('VectorEncodingType', (): void => {

  it('should have these values', (done: () => void): void => {

    expect(VectorEncodingType.FIELD).to.equal(0);
    expect(VectorEncodingType.RANGE).to.equal(1);
    done();

  });

});
