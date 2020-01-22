import {TCModelFactory, makeRandomInt, makeRandomIntArray} from '@iabtcf/testing';
import {PurposeRestriction} from '@iabtcf/core';
import {CmpApiModel} from '../../src/CmpApiModel';
import {TCDataToTCModel} from '../TCDataToTCModel';

describe('response->TCData', (): void => {

  it('should create a TCData based on the TCModel with unrestricted vendors', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.withGVL();
    TCDataToTCModel.equal();

    done();

  });

  it('should create a TCData based on the TCModel with vendors', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.withGVL();

    TCDataToTCModel.equal(makeRandomIntArray(1, 25, 10));

    done();

  });

  it('should encode purpose restrictions', (done: () => void): void => {

    const tcModel = TCModelFactory.withGVL();
    const vendorLength = tcModel.vendorConsents.size;

    for (let i =1; i <= vendorLength; i++) {

      tcModel.publisherRestrictions.add(i, new PurposeRestriction(makeRandomInt(1, 12), makeRandomInt(0, 2)));

    }

    CmpApiModel.tcModel = tcModel;

    TCDataToTCModel.equal();

    done();

  });

});
