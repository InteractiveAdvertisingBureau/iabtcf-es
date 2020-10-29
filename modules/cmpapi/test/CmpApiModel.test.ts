import {CmpApiModel} from '../src/CmpApiModel';
import {CmpStatus, DisplayStatus} from '../src/status';
import {expect} from 'chai';

describe('CmpApiModel', (): void => {

  it('has these default values', (): void => {

    CmpApiModel.reset();

    expect(CmpApiModel.apiVersion, 'assert default apiVersion').to.equal('2');
    expect(CmpApiModel.cmpStatus, 'assert default cmpStatus').to.equal(CmpStatus.LOADING);
    expect(CmpApiModel.displayStatus, 'assert default displayStatus').to.equal(DisplayStatus.HIDDEN);

    expect(CmpApiModel.disabled, 'assert default disabled').to.be.false;

    expect(CmpApiModel.cmpId, 'assert default cmpId').to.be.undefined;
    expect(CmpApiModel.cmpVersion, 'assert default cmpVersion').to.be.undefined;
    expect(CmpApiModel.gdprApplies, 'assert default gdprApplies').to.be.undefined;
    expect(CmpApiModel.eventStatus, 'assert default eventStatus').to.be.undefined;
    expect(CmpApiModel.tcModel, 'assert default tcModel').to.be.undefined;
    expect(CmpApiModel.tcfPolicyVersion, 'assert default tcfPolicyVersion').to.be.undefined;

  });

});
