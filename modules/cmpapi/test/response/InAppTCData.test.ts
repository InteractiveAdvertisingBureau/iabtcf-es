import {TCModelFactory, makeRandomIntArray} from '@iabtcf/testing';
import {CmpApiModel} from '../../src/CmpApiModel';
import {InAppTCDataToTCModel} from '../InAppTCDataToTCModel';

describe('response->InAppTCData', (): void => {

  it('should create a InAppTCData based on the TCModel with unrestricted vendors', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.withGVL();
    InAppTCDataToTCModel.equal();

    done();

  });

  it('should create a InAppTCData based on the TCModel with vendors', (done: () => void): void => {

    CmpApiModel.tcModel = TCModelFactory.withGVL();

    InAppTCDataToTCModel.equal(makeRandomIntArray(1, 25, 10));

    done();

  });

  it('should encode purpose restrictions', (done: () => void): void => {

    const tcModel = TCModelFactory.withGVL();

    CmpApiModel.tcModel = TCModelFactory.addPublisherRestrictions(tcModel);

    InAppTCDataToTCModel.equal();

    done();

  });

});
