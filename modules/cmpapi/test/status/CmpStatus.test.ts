import {CmpStatus} from '../../src/status/CmpStatus';
import {expect} from 'chai';

describe('status->CmpStatus', (): void => {

  it('should have these values', (done: () => void): void => {

    expect(CmpStatus.STUB).to.be.equal('stub');
    expect(CmpStatus.LOADING).to.be.equal('loading');
    expect(CmpStatus.LOADED).to.be.equal('loaded');
    expect(CmpStatus.ERROR).to.be.equal('error');
    done();

  });

});
