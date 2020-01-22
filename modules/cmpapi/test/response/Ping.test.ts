import {Ping} from '../../src/response/Ping';
import {TCModel} from '@iabtcf/core';
import {makeRandomInt} from '@iabtcf/testing';
import {CmpApiModel} from '../../src/CmpApiModel';
import {CmpStatus} from '../../src/status/CmpStatus';
import {DisplayStatus} from '../../src/status/DisplayStatus';
import {expect} from 'chai';

describe('response->Ping', (): void => {

  it('populates a response with CmpApiModel values', (done: () => void): void => {

    CmpApiModel.cmpId = makeRandomInt(2, 500);
    CmpApiModel.cmpStatus = CmpStatus.LOADED;
    CmpApiModel.displayStatus = DisplayStatus.VISIBLE;

    const ping = new Ping();
    expect(ping.cmpLoaded, 'ping.cmpLoaded').to.be.true;
    expect(ping.cmpStatus, 'ping.cmpStatus').to.equal(CmpApiModel.cmpStatus);
    expect(ping.displayStatus, 'ping.displayStatus').to.equal(CmpApiModel.displayStatus);
    expect(ping.gvlVersion, 'ping.gvlVersion').to.be.undefined;
    expect(ping.apiVersion, 'ping.apiVersion').to.equal(2);

    done();

  });

  it('sets gvlVersion if a TCModel has a vendorListVersion', (done: () => void): void => {

    const tcModel = new TCModel();
    tcModel.vendorListVersion = makeRandomInt(1, 100);

    CmpApiModel.cmpId = makeRandomInt(2, 500);
    CmpApiModel.cmpStatus = CmpStatus.LOADED;
    CmpApiModel.displayStatus = DisplayStatus.VISIBLE;
    CmpApiModel.tcModel = tcModel;

    const ping = new Ping();
    expect(ping.cmpLoaded, 'ping.cmpLoaded').to.be.true;
    expect(ping.cmpStatus, 'ping.cmpStatus').to.equal(CmpApiModel.cmpStatus);
    expect(ping.displayStatus, 'ping.displayStatus').to.equal(CmpApiModel.displayStatus);
    expect(ping.apiVersion, 'ping.apiVersion').to.equal(2);
    expect(ping.gvlVersion, 'ping.gvlVersion').to.equal(tcModel.vendorListVersion);

    done();

  });

});
