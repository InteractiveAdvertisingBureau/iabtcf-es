import {CmpApiModel} from '../../src/CmpApiModel';
import {expect} from 'chai';
import {PurposeRestriction} from '@iabtcf/core';
import {TCDataToTCModel} from '../TCDataToTCModel';
import {TCData} from '../../src/response/TCData';
import {TCModelFactory, makeRandomInt, makeRandomIntArray} from '@iabtcf/testing';

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

  it('should create a TCData with only gdprApplies, tcfPolicyVersion, cmpId and cmpVersion if gdprApplies=false (tcModel is set to null)', (done: () => void): void => {

    CmpApiModel.tcModel = null;

    const tcData = new TCData();

    expect(tcData.tcString, 'tcString').to.be.undefined;
    expect(tcData.eventStatus, 'eventStatus').to.equal(CmpApiModel.eventStatus);
    expect(tcData.cmpStatus, 'cmpStatus').to.equal(CmpApiModel.cmpStatus);

    expect(tcData.isServiceSpecific, 'isServiceSpecific').to.be.undefined;
    expect(tcData.useNonStandardStacks, 'useNonStandardStacks').to.be.undefined;
    expect(tcData.purposeOneTreatment, 'purposeOneTreatment').to.be.undefined;
    expect(tcData.publisherCC, 'publisherCC').to.be.undefined;

    expect(tcData.outOfBand, 'outOfBand').to.be.undefined;
    expect(tcData.purpose, 'purpose').to.be.undefined;
    expect(tcData.vendor, 'vendor').to.be.undefined;
    expect(tcData.specialFeatureOptins, 'specialFeatureOptIns').to.be.undefined;
    expect(tcData.publisher, 'publisher').to.be.undefined;

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
