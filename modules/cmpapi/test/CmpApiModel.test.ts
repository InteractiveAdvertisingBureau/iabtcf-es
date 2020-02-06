import {CmpApiModel} from '../src/CmpApiModel';
import {CmpStatus, DisplayStatus, EventStatus} from '../src/status';
import {TCModelFactory} from '@iabtcf/testing';
import {expect} from 'chai';

describe('CmpApiModel', (): void => {

  const assertDefault = (): void => {

    expect(CmpApiModel.apiVersion, 'assert default apiVersion').to.equal(2);
    expect(CmpApiModel.tcfPolicyVersion, 'assert default tcfPolicyVersion').to.equal(2);
    expect(CmpApiModel.cmpStatus, 'assert default cmpStatus').to.equal(CmpStatus.LOADING);
    expect(CmpApiModel.displayStatus, 'assert default displayStatus').to.equal(DisplayStatus.HIDDEN);

    expect(CmpApiModel.uiVisible, 'assert default uiVisible').to.be.false;
    expect(CmpApiModel.disabled, 'assert default disabled').to.be.false;

    expect(CmpApiModel.cmpId, 'assert default cmpId').to.be.undefined;
    expect(CmpApiModel.cmpVersion, 'assert default cmpVersion').to.be.undefined;
    expect(CmpApiModel.gdprApplies, 'assert default gdprApplies').to.be.undefined;
    expect(CmpApiModel.eventStatus, 'assert default eventStatus').to.be.undefined;
    expect(CmpApiModel.tcModel, 'assert default tcModel').to.be.undefined;

  };

  it('has these default values', (done: () => void): void => {

    assertDefault();

    done();

  });

  it(`should set cmpStatus to "${CmpStatus.ERROR}" if disabled is set to true`, (done: () => void): void => {

    assertDefault();
    CmpApiModel.disabled = true;

    expect(CmpApiModel.cmpStatus, 'cmpStatus after').to.equal(CmpStatus.ERROR);
    expect(CmpApiModel.disabled, 'disabled after').to.true;

    done();

  });

  it(`should set displayStatus to "${DisplayStatus.VISIBLE}" and eventStatus to "${EventStatus.CMP_UI_SHOWN}" when uiVisible is set to true`, (done: () => void): void => {

    assertDefault();

    CmpApiModel.uiVisible = true;

    expect(CmpApiModel.displayStatus, 'displayStatus after').to.equal(DisplayStatus.VISIBLE);
    expect(CmpApiModel.eventStatus, 'eventStatus after').to.equal(EventStatus.CMP_UI_SHOWN);
    expect(CmpApiModel.uiVisible, 'uiVisible after').to.true;

    done();

  });

  it(`should set displayStatus to "${DisplayStatus.DISABLED}" and eventStatus to "${EventStatus.TC_LOADED}" when uiVisible is set to false`, (done: () => void): void => {

    assertDefault();

    CmpApiModel.uiVisible = false;

    expect(CmpApiModel.displayStatus, 'displayStatus after').to.equal(DisplayStatus.DISABLED);
    expect(CmpApiModel.eventStatus, 'eventStatus after').to.equal(EventStatus.TC_LOADED);
    expect(CmpApiModel.uiVisible, 'uiVisible after').to.false;

    done();

  });

  it(`should set gdprApplies to true, displayStatus to "${DisplayStatus.HIDDEN}", eventStatus to "${EventStatus.TC_LOADED}", cmpStatus to "${CmpStatus.LOADED} when tcModel is set for the first time`, (done: () => void): void => {

    assertDefault();

    const tcModel = TCModelFactory.noGVL();

    CmpApiModel.tcModel = tcModel;

    expect(CmpApiModel.gdprApplies, 'gdprApplies after').to.be.true;
    expect(CmpApiModel.displayStatus, 'displayStatus after').to.equal(DisplayStatus.HIDDEN);
    expect(CmpApiModel.eventStatus, 'eventStatus after').to.equal(EventStatus.TC_LOADED);
    expect(CmpApiModel.tcModel, 'tcModel after (should be a clone)').not.to.equal(tcModel);

    done();

  });

  it(`should set eventStatus to "${EventStatus.USER_ACTION_COMPLETE}" when tcModel is set for a second time`, (done: () => void): void => {

    assertDefault();

    CmpApiModel.tcModel = TCModelFactory.noGVL();
    CmpApiModel.tcModel = TCModelFactory.noGVL();

    expect(CmpApiModel.eventStatus, 'eventStatus after').to.equal(EventStatus.USER_ACTION_COMPLETE);

    done();

  });

  it(`should call the changeEventCallback when a tcModel is set`, (done: () => void): void => {

    assertDefault();
    let callbackCalled = false;

    CmpApiModel.changeEventCallback = (): void => {

      callbackCalled = true;

    };

    CmpApiModel.tcModel = TCModelFactory.noGVL();

    expect(callbackCalled, 'callbackCalled').to.be.true;

    done();

  });

  it(`should set gdprApplies to false, displayStatus to "${DisplayStatus.DISABLED}", and cmpStatus to "${CmpStatus.LOADED}" if tcModel is set to null`, (done: () => void): void => {

    assertDefault();

    CmpApiModel.tcModel = null;

    expect(CmpApiModel.gdprApplies, 'gdprApplies after').to.be.false;
    expect(CmpApiModel.displayStatus, 'displayStatus after').to.equal(DisplayStatus.DISABLED);
    expect(CmpApiModel.cmpStatus, 'cmpStatus after').to.equal(CmpStatus.LOADED);
    expect(CmpApiModel.tcModel, 'tcModel after').to.be.null;

    done();

  });

  it(`should throw an error if tcModel is set to something other than a TCModel or null and change cmpStatus to "${CmpStatus.ERROR}"`, (done: () => void): void => {

    assertDefault();

    expect((): void => {

      (CmpApiModel.tcModel as unknown as boolean) = true;

    }, 'CmpApiModel.tcModel = undefined').to.throw();

    expect(CmpApiModel.cmpStatus, 'cmpStatus after').to.equal(CmpStatus.ERROR);

    done();

  });

});
