import {CommandMap} from '../../src/command/CommandMap';
import {PingCommand} from '../../src/command/PingCommand';
import {GetTcDataCommand} from '../../src/command/GetTcDataCommand';
import {GetInAppTcDataCommand} from '../../src/command/GetInAppTcDataCommand';
import {GetVendorListCommand} from '../../src/command/GetVendorListCommand';
import {AddEventListenerCommand} from '../../src/command/AddEventListenerCommand';
import {RemoveEventListenerCommand} from '../../src/command/RemoveEventListenerCommand';
import {expect} from 'chai';

describe('command->CommandMap', (): void => {

  it('has these commands', (done: () => void): void => {

    expect(typeof CommandMap.ping).to.equal(typeof PingCommand);
    expect(typeof CommandMap.getTCData).to.equal(typeof GetTcDataCommand);
    expect(typeof CommandMap.getInAppTCData).to.equal(typeof GetInAppTcDataCommand);
    expect(typeof CommandMap.getVendorList).to.equal(typeof GetVendorListCommand);
    expect(typeof CommandMap.addEventListener).to.equal(typeof AddEventListenerCommand);
    expect(typeof CommandMap.removeEventListener).to.equal(typeof RemoveEventListenerCommand);

    done();

  });

});
