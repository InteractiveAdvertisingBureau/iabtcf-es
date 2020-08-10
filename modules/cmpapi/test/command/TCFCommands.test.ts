import {TCFCommand} from '../../src/command/TCFCommand';
import {expect} from 'chai';

describe('command->TCFCommand', (): void => {

  it('should have these values', (done: () => void): void => {

    expect(TCFCommand.PING, 'TCFCommand.PING').to.equal('ping');
    expect(TCFCommand.GET_TC_DATA, 'TCFCommand.GET_TC_DATA').to.equal('getTCData');
    expect(TCFCommand.GET_IN_APP_TC_DATA, 'TCFCommand.GET_IN_APP_TC_DATA').to.equal('getInAppTCData');
    expect(TCFCommand.GET_VENDOR_LIST, 'TCFCommand.GET_VENDOR_LIST').to.equal('getVendorList');
    expect(TCFCommand.ADD_EVENT_LISTENER, 'TCFCommand.ADD_EVENT_LISTENER').to.equal('addEventListener');
    expect(TCFCommand.REMOVE_EVENT_LISTENER, 'TCFCommand.REMOVE_EVENT_LISTENER').to.equal('removeEventListener');

    done();

  });

});
