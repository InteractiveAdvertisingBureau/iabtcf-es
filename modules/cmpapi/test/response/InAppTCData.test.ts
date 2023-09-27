import {CmpApiModel} from '../../src/CmpApiModel';
import {TestUtils} from '../TestUtils';
import {TCModelFactory, makeRandomIntArray} from '@cookiehub/iabtcf-testing';
import {TCString} from '@cookiehub/iabtcf-core';

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

});
