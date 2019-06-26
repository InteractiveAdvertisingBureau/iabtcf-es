import {expect} from 'chai';
import {BooleanDecoder} from '../src/tcstring/decoders/BooleanDecoder';

describe('BooleanDecoder', (): void => {

  it('should decode 1 to true', (): void => {

    const boolDecoder: BooleanDecoder = new BooleanDecoder();

    expect(boolDecoder.decode('1')).to.be.true;

  });

  it('should decode 0 to false', (): void => {

    const boolDecoder: BooleanDecoder = new BooleanDecoder();

    expect(boolDecoder.decode('0')).to.be.false;

  });

});
