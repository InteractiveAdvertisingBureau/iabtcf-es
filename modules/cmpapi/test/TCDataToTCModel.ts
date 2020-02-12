import {TCString, Vector, PurposeRestriction} from '@iabtcf/core';
import {TCData} from '../src/response/TCData';
import {BooleanVector} from '../src/response/BooleanVector';
import {CmpApiModel} from '../src/CmpApiModel';
import {expect} from 'chai';

export class TCDataToTCModel {

  private static checkVectorToBooleanVector(name: string,
                                            vector: Vector,
                                            boolVector: BooleanVector,
                                            list?: number[]): void {

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

  }
  public static equal(vendors?: number[]): void {

    const tcModel = CmpApiModel.tcModel;
    const tcData = new TCData(vendors);

    expect(tcData.tcString, 'tcString').to.equal(TCString.encode(tcModel));
    expect(tcData.eventStatus, 'eventStatus').to.equal(CmpApiModel.eventStatus);
    expect(tcData.cmpStatus, 'cmpStatus').to.equal(CmpApiModel.cmpStatus);
    expect(tcData.isServiceSpecific, 'isServiceSpecific').to.equal(tcModel.isServiceSpecific);
    expect(tcData.useNonStandardStacks, 'useNonStandardStacks').to.equal(tcModel.useNonStandardStacks);
    expect(tcData.purposeOneTreatment, 'purposeOneTreatment').to.equal(tcModel.purposeOneTreatment);
    expect(tcData.publisherCC, 'publisherCC').to.equal(tcModel.publisherCountryCode);

    if (tcModel.vendorsAllowed.size) {

      this.checkVectorToBooleanVector('outOfBand.allowedVendors', tcModel.vendorsAllowed, tcData.outOfBand.allowedVendors as BooleanVector, vendors);

    }

    if (tcModel.vendorsDisclosed.size) {

      this.checkVectorToBooleanVector('outOfBand.disclosedVendors', tcModel.vendorsDisclosed, tcData.outOfBand.disclosedVendors as BooleanVector, vendors);

    }

    this.checkVectorToBooleanVector('purpose.consents', tcModel.purposeConsents, tcData.purpose.consents as BooleanVector);
    this.checkVectorToBooleanVector('purpose.legitimateInterests', tcModel.purposeLegitimateInterest, tcData.purpose.legitimateInterests as BooleanVector);

    this.checkVectorToBooleanVector('vendor.consents', tcModel.vendorConsents, tcData.vendor.consents as BooleanVector, vendors);
    this.checkVectorToBooleanVector('vendor.legitimateInterests', tcModel.vendorLegitimateInterest, tcData.vendor.legitimateInterests as BooleanVector, vendors);

    this.checkVectorToBooleanVector('specialFeatureOptIns', tcModel.specialFeatureOptIns, tcData.specialFeatureOptins as BooleanVector);

    this.checkVectorToBooleanVector('publisher.consents', tcModel.publisherConsents, tcData.publisher.consents as BooleanVector);
    this.checkVectorToBooleanVector('publisher.legitimateInterests', tcModel.publisherLegitimateInterest, tcData.publisher.legitimateInterests as BooleanVector);
    this.checkVectorToBooleanVector('publisher.customPurpose.consents', tcModel.publisherCustomConsents, tcData.publisher.customPurpose.consents as BooleanVector);
    this.checkVectorToBooleanVector('publisher.customPurpose.legitimateInterests', tcModel.publisherCustomLegitimateInterest, tcData.publisher.customPurpose.legitimateInterests as BooleanVector);

    if (tcModel.publisherRestrictions.numRestrictions) {

      expect(tcData.publisher.restrictions, 'tcData.publisher.restrictions').not.to.be.undefined;
      tcModel.publisherRestrictions.getRestrictions().forEach((purpRestriction: PurposeRestriction): void => {

        const strPurpId = purpRestriction.purposeId.toString();

        expect(tcData.publisher.restrictions[purpRestriction.purposeId.toString()], `tcData.publisher.restrictions[${strPurpId}]`).not.to.be.undefined;

        tcModel.publisherRestrictions.getVendors(purpRestriction).forEach((vendorId: number): void => {

          expect(tcData.publisher.restrictions[strPurpId][vendorId.toString()], `tcData.publisher.restrictions[${strPurpId}][${vendorId}]`).to.equal(purpRestriction.restrictionType);

        });

      });

    }

  }

}
