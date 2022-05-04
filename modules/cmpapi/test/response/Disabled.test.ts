import {CmpApiModel} from '../../src/CmpApiModel';
import {CmpStatus} from '../../src/status/CmpStatus';
import {Disabled} from '../../src/response/Disabled';
import {expect} from 'chai';
import {makeRandomInt} from '@iabtcf/testing';

describe('response->Disabled', (): void => {

  beforeEach(function() {

    CmpApiModel.reset();

  });

  it('populates a response with CmpApiModel values', (done: () => void): void => {

    CmpApiModel.cmpId = makeRandomInt(2, 500);
    CmpApiModel.cmpVersion = makeRandomInt(2, 500);
    CmpApiModel.tcfPolicyVersion = makeRandomInt(2, 500);

    const disabled = new Disabled();

    expect(disabled.cmpStatus, 'disabled.cmpStatus').to.equal(CmpStatus.ERROR);
    expect(disabled.cmpId, 'disabled.cmpId').to.equal(CmpApiModel.cmpId);
    expect(disabled.cmpVersion, 'disabled.cmpVersion').to.equal(CmpApiModel.cmpVersion);
    expect(disabled.gdprApplies, 'disabled.gdprApplies').to.be.undefined;
    expect(disabled.tcfPolicyVersion, 'disabled.tcfPolicyVersion').to.equal(CmpApiModel.tcfPolicyVersion);

    done();

  });

});
