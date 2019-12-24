import {TCData} from '../../src/response/TCData';
import {TCModelFactory, makeRandomInt, makeRandomIntArray} from '@iabtcf/testing';
import {TCString, Vector, PurposeRestriction} from '@iabtcf/core';
import {CmpApiModel} from '../../src/CmpApiModel';
import {BooleanVector} from '../../src/types';
import {expect} from 'chai';

describe('response->TCData', (): void => {

  const checkVectorToBooleanVector = (name: string,
                                      vector: Vector,
                                      boolVector: BooleanVector,
                                      list?: number[]): void => {

    if (!list) {

      vector.forEach((value: boolean, id: number): void => {

        expect(boolVector[id.toString()], name+' id: ' + id ).to.equal(value);

      });

    } else {

      expect(Object.keys(boolVector).length, name + ' boolVector.length').to.equal(list.length);
      list.forEach((num: number): void => {

        expect(boolVector[num.toString()], name+' num: ' + num).to.equal(vector.has(num));

      });

    }

  };

  it('should create a TCData based on the TCModel with unrestricted vendors', (done: () => void): void => {

    const tcModel = TCModelFactory.noGVL();
    CmpApiModel.tcModel = tcModel;

    const tcData = new TCData();

    expect(tcData.tcString, 'tcString').to.equal(TCString.encode(tcModel));
    expect(tcData.eventStatus, 'eventStatus').to.equal(CmpApiModel.eventStatus);
    expect(tcData.isServiceSpecific, 'isServiceSpecific').to.equal(tcModel.isServiceSpecific);
    expect(tcData.useNonStandardStacks, 'useNonStandardStacks').to.equal(tcModel.useNonStandardStacks);
    expect(tcData.purposeOneTreatment, 'purposeOneTreatment').to.equal(tcModel.purposeOneTreatment);
    expect(tcData.publisherCC, 'publisherCC').to.equal(tcModel.publisherCountryCode);

    checkVectorToBooleanVector('outOfBand.allowedVendors', tcModel.vendorsAllowed, tcData.outOfBand.allowedVendors as BooleanVector);
    checkVectorToBooleanVector('outOfBand.disclosedVendors', tcModel.vendorsDisclosed, tcData.outOfBand.disclosedVendors as BooleanVector);

    checkVectorToBooleanVector('purpose.consents', tcModel.purposeConsents, tcData.purpose.consents as BooleanVector);
    checkVectorToBooleanVector('purpose.legitimateInterests', tcModel.purposeLegitimateInterest, tcData.purpose.legitimateInterests as BooleanVector);

    checkVectorToBooleanVector('vendor.consents', tcModel.vendorConsents, tcData.vendor.consents as BooleanVector);
    checkVectorToBooleanVector('vendor.legitimateInterests', tcModel.vendorLegitimateInterest, tcData.vendor.legitimateInterests as BooleanVector);

    checkVectorToBooleanVector('specialFeatureOptIns', tcModel.specialFeatureOptIns, tcData.specialFeatureOptins as BooleanVector);

    checkVectorToBooleanVector('publisher.consents', tcModel.publisherConsents, tcData.publisher.consents as BooleanVector);
    checkVectorToBooleanVector('publisher.legitimateInterests', tcModel.publisherLegitimateInterest, tcData.publisher.legitimateInterests as BooleanVector);
    checkVectorToBooleanVector('publisher.customPurpose.consents', tcModel.publisherCustomConsents, tcData.publisher.customPurpose.consents as BooleanVector);
    checkVectorToBooleanVector('publisher.customPurpose.legitimateInterests', tcModel.publisherCustomLegitimateInterest, tcData.publisher.customPurpose.legitimateInterests as BooleanVector);

    done();

  });

  it('should create a TCData based on the TCModel with vendors', (done: () => void): void => {

    const tcModel = TCModelFactory.noGVL();
    const vendorIds = makeRandomIntArray(1, 25, 10);

    CmpApiModel.tcModel = tcModel;

    const tcData = new TCData(vendorIds);

    expect(tcData.tcString, 'tcString').to.equal(TCString.encode(tcModel));
    expect(tcData.eventStatus, 'eventStatus').to.equal(CmpApiModel.eventStatus);
    expect(tcData.isServiceSpecific, 'isServiceSpecific').to.equal(tcModel.isServiceSpecific);
    expect(tcData.useNonStandardStacks, 'useNonStandardStacks').to.equal(tcModel.useNonStandardStacks);
    expect(tcData.purposeOneTreatment, 'purposeOneTreatment').to.equal(tcModel.purposeOneTreatment);
    expect(tcData.publisherCC, 'publisherCC').to.equal(tcModel.publisherCountryCode);

    checkVectorToBooleanVector('outOfBand.allowedVendors', tcModel.vendorsAllowed, tcData.outOfBand.allowedVendors as BooleanVector, vendorIds );
    checkVectorToBooleanVector('outOfBand.disclosedVendors', tcModel.vendorsDisclosed, tcData.outOfBand.disclosedVendors as BooleanVector, vendorIds);

    checkVectorToBooleanVector('purpose.consents', tcModel.purposeConsents, tcData.purpose.consents as BooleanVector);
    checkVectorToBooleanVector('purpose.legitimateInterests', tcModel.purposeLegitimateInterest, tcData.purpose.legitimateInterests as BooleanVector);

    checkVectorToBooleanVector('vendor.consents', tcModel.vendorConsents, tcData.vendor.consents as BooleanVector, vendorIds);
    checkVectorToBooleanVector('vendor.legitimateInterests', tcModel.vendorLegitimateInterest, tcData.vendor.legitimateInterests as BooleanVector, vendorIds);

    checkVectorToBooleanVector('specialFeatureOptIns', tcModel.specialFeatureOptIns, tcData.specialFeatureOptins as BooleanVector);

    checkVectorToBooleanVector('publisher.consents', tcModel.publisherConsents, tcData.publisher.consents as BooleanVector);
    checkVectorToBooleanVector('publisher.legitimateInterests', tcModel.publisherLegitimateInterest, tcData.publisher.legitimateInterests as BooleanVector);
    checkVectorToBooleanVector('publisher.customPurpose.consents', tcModel.publisherCustomConsents, tcData.publisher.customPurpose.consents as BooleanVector);
    checkVectorToBooleanVector('publisher.customPurpose.legitimateInterests', tcModel.publisherCustomLegitimateInterest, tcData.publisher.customPurpose.legitimateInterests as BooleanVector);

    done();

  });

  it('should encode purpose restrictions', (done: () => void): void => {

    const tcModel = TCModelFactory.noGVL();
    const vendorLength = tcModel.vendorConsents.size;
    const purposeRestrictionID = makeRandomInt(1, 12);
    const purposeRestrictionType = makeRandomInt(0, 2);

    for (let i =1; i <= vendorLength; i++) {

      tcModel.publisherRestrictions.add(i, new PurposeRestriction(purposeRestrictionID, purposeRestrictionType));

    }

    CmpApiModel.tcModel = tcModel;

    const tcData = new TCData();

    expect(tcData.publisher.restrictions, 'tcData.publisher.restrictions').not.to.be.undefined;
    expect(tcData.publisher.restrictions[purposeRestrictionID.toString()], `tcData.publisher.restrictions[${purposeRestrictionID}]`).not.to.be.undefined;

    for (let i =1; i <= vendorLength; i++) {

      expect(tcData.publisher.restrictions[purposeRestrictionID.toString()][i.toString()], `tcData.publisher.restrictions[${purposeRestrictionID}][${i}]`).to.equal(purposeRestrictionType);

    }

    done();

  });

});
