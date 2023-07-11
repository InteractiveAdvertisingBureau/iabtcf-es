import {CmpApiModel} from '../../src/CmpApiModel';
import {Response} from '../../src/response/Response';
import {expect} from 'chai';
import {makeRandomInt} from '@internaltestiabtechlab/testing';

describe('response->Response', (): void => {

  it('populates a response with CmpApiModel values', (done: () => void): void => {

    CmpApiModel.cmpId = makeRandomInt(2, 500);
    CmpApiModel.cmpVersion = makeRandomInt(2, 500);
    CmpApiModel.tcfPolicyVersion = makeRandomInt(2, 500);

    const response = new Response();

    expect(response.cmpId, 'response.cmpId').to.equal(CmpApiModel.cmpId);
    expect(response.cmpVersion, 'response.cmpVersion').to.equal(CmpApiModel.cmpVersion);
    expect(response.gdprApplies, 'response.gdprApplies').to.be.undefined;
    expect(response.tcfPolicyVersion, 'response.tcfPolicyVersion').to.equal(CmpApiModel.tcfPolicyVersion);

    done();

  });

});
