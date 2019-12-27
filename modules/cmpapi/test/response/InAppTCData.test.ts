import {TCModelFactory, makeRandomInt, makeRandomIntArray} from '@iabtcf/testing';
import {PurposeRestriction} from '@iabtcf/core';
import {CmpApiModel} from '../../src/CmpApiModel';
import {InAppTCDataToTCModel} from '../InAppTCDataToTCModel';

describe('response->InAppTCData', (): void => {

  it('should create a InAppTCData based on the TCModel with unrestricted vendors', (done: () => void): void => {

    CmpApiModel.reset();
    CmpApiModel.tcModel = TCModelFactory.noGVL();
    InAppTCDataToTCModel.equal();

    done();

  });

  it('should create a InAppTCData based on the TCModel with vendors', (done: () => void): void => {

    CmpApiModel.reset();
    CmpApiModel.tcModel = TCModelFactory.noGVL();

    InAppTCDataToTCModel.equal(makeRandomIntArray(1, 25, 10));

    done();

  });

  it('should encode purpose restrictions', (done: () => void): void => {

    const tcModel = TCModelFactory.noGVL();
    const vendorLength = tcModel.vendorConsents.size;

    for (let i =1; i <= vendorLength; i++) {

      tcModel.publisherRestrictions.add(i, new PurposeRestriction(makeRandomInt(1, 12), makeRandomInt(0, 2)));

    }

    CmpApiModel.reset();
    CmpApiModel.tcModel = tcModel;

    InAppTCDataToTCModel.equal();

    done();

  });

});
