import {EventStatus} from '../../src/status/EventStatus';
import {expect} from 'chai';

describe('status->EventStatus', (): void => {

  it('should have these values', (done: () => void): void => {

    expect(EventStatus.TC_LOADED).to.equal('tcloaded');
    expect(EventStatus.CMP_UI_SHOWN).to.equal('cmpuishown');
    expect(EventStatus.USER_ACTION_COMPLETE).to.equal('useractioncomplete');
    done();

  });

});
