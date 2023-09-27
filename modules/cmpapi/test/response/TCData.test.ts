import {CmpApiModel} from '../../src/CmpApiModel';
import {PurposeRestriction, TCString} from '@cookiehub/iabtcf-core';
import {TestUtils} from '../TestUtils';
import {TCData} from '../../src/response/TCData';
import {TCModelFactory, makeRandomInt, makeRandomIntArray} from '@cookiehub/iabtcf-testing';
import {expect} from 'chai';

describe('response->TCData', (): void => {

  it('should create a TCData based on the TCModel with unrestricted vendors', (): void => {

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcModel = TCModelFactory.withGVL();
    CmpApiModel.tcString = TCString.encode(CmpApiModel.tcModel);
    TestUtils.tcModelToTCData();

  });

  it('should create a TCData based on the TCModel with vendors', (): void => {

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcModel = TCModelFactory.withGVL();
    CmpApiModel.tcString = TCString.encode(CmpApiModel.tcModel);

    TestUtils.tcModelToTCData(makeRandomIntArray(1, 25, 10));

  });

  it('should create a TCData with only gdprApplies, tcfPolicyVersion, cmpId and cmpVersion if gdprApplies=false', (): void => {

    CmpApiModel.gdprApplies = false;

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
    expect(tcData.specialFeatureOptins, 'specialFeatureOptins').to.be.undefined;
    expect(tcData.publisher, 'publisher').to.be.undefined;

  });

  it('should encode purpose restrictions', (): void => {

    const tcModel = TCModelFactory.withGVL();
    const vendorLength = tcModel.vendorConsents.size;

    for (let i =1; i <= vendorLength; i++) {

      tcModel.publisherRestrictions.add(i, new PurposeRestriction(makeRandomInt(1, 12), makeRandomInt(0, 2)));

    }

    CmpApiModel.gdprApplies = true;
    CmpApiModel.tcModel = tcModel;
    CmpApiModel.tcString = TCString.encode(CmpApiModel.tcModel);

    TestUtils.tcModelToTCData();

  });

});
