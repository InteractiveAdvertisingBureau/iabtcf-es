import {DisplayStatus} from '../../src/status/DisplayStatus';
import {expect} from 'chai';

describe('status->DisplayStatus', (): void => {

  it('should have these values', (done: () => void): void => {

    expect(DisplayStatus.VISIBLE).to.equal('visible');
    expect(DisplayStatus.HIDDEN).to.equal('hidden');
    expect(DisplayStatus.DISABLED).to.equal('disabled');
    done();

  });

});
