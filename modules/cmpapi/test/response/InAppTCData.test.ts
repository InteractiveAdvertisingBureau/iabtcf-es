import {CmpApiModel} from '../../src/CmpApiModel';
import {TestUtils} from '../TestUtils';
import {TCModelFactory, makeRandomIntArray} from '@didomi/iabtcf-testing';
import {TCString} from '@didomi/iabtcf-core';
import {InAppTCData} from '../../src';
import {expect} from 'chai';

describe('response->InAppTCData', (): void => {

  it('should create a InAppTCData based on the TCModel with unrestricted vendors', (): void => {

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcModel = TCModelFactory.withGVL();
    CmpApiModel.tcString = TCString.encode(CmpApiModel.tcModel);

    TestUtils.inAppTCDataToTCModel();

  });

  it('should create a InAppTCData based on the TCModel with vendors', (): void => {

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcModel = TCModelFactory.withGVL();
    CmpApiModel.tcString = TCString.encode(CmpApiModel.tcModel);

    TestUtils.inAppTCDataToTCModel(makeRandomIntArray(1, 25, 10));

  });

  it('should encode purpose restrictions', (): void => {

    const tcModel = TCModelFactory.withGVL();

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcModel = TCModelFactory.addPublisherRestrictions(tcModel);
    CmpApiModel.tcString = TCString.encode(CmpApiModel.tcModel);

    TestUtils.inAppTCDataToTCModel();

  });

  it('should cache encoded purpose restrictions', (): void => {

    const tcModel = TCModelFactory.withGVL();

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcModel = TCModelFactory.addPublisherRestrictions(tcModel);
    CmpApiModel.tcString = TCString.encode(CmpApiModel.tcModel);

    CmpApiModel.restrictionsCache.clear();

    TestUtils.inAppTCDataToTCModel();

    TestUtils.inAppTCDataToTCModel();

    expect(CmpApiModel.restrictionsCache.getBucket(InAppTCData.name).recalculations).to.be.equal(1);

  });

});
