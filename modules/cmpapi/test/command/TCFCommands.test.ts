import {TCFCommands} from '../../src/command/TCFCommands';
import {expect} from 'chai';

describe('command->TCFCommands', (): void => {

  it('should have these values', (done: () => void): void => {

    expect(TCFCommands.PING, 'TCFCommands.PING').to.equal('ping');
    expect(TCFCommands.GET_TC_DATA, 'TCFCommands.GET_TC_DATA').to.equal('getTCData');
    expect(TCFCommands.GET_IN_APP_TC_DATA, 'TCFCommands.GET_IN_APP_TC_DATA').to.equal('getInAppTCData');
    expect(TCFCommands.GET_VENDOR_LIST, 'TCFCommands.GET_VENDOR_LIST').to.equal('getVendorList');
    expect(TCFCommands.ADD_EVENT_LISTENER, 'TCFCommands.ADD_EVENT_LISTENER').to.equal('addEventListener');
    expect(TCFCommands.REMOVE_EVENT_LISTENER, 'TCFCommands.REMOVE_EVENT_LISTENER').to.equal('removeEventListener');

    done();

  });

});
