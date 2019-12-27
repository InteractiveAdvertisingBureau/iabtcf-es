import {TCString, Vector, PurposeRestriction} from '@iabtcf/core';
import {InAppTCData} from '../src/response/InAppTCData';
import {CmpApiModel} from '../src/CmpApiModel';
import {expect} from 'chai';

export class InAppTCDataToTCModel {

  private static checkVectorToBitField(name: string,
                                       vector: Vector,
                                       str: string): void {

    expect(str.length).to.equal(vector.maxId);
    vector.forEach((value: boolean, id: number): void => {

      expect(str.charAt(id - 1), name+' id: ' + id ).to.equal(+value + '');

    });

  }
  public static equal(vendorsList?: number[]): void {

    const tcModel = CmpApiModel.tcModel;
    const inAppTCData = new InAppTCData(vendorsList);

    expect(inAppTCData.tcString, 'tcString').to.equal(TCString.encode(tcModel));
    expect(inAppTCData.eventStatus, 'eventStatus').to.equal(CmpApiModel.eventStatus);
    expect(inAppTCData.isServiceSpecific, 'isServiceSpecific').to.equal(tcModel.isServiceSpecific);
    expect(inAppTCData.useNonStandardStacks, 'useNonStandardStacks').to.equal(tcModel.useNonStandardStacks);
    expect(inAppTCData.purposeOneTreatment, 'purposeOneTreatment').to.equal(tcModel.purposeOneTreatment);
    expect(inAppTCData.publisherCC, 'publisherCC').to.equal(tcModel.publisherCountryCode);
    expect(inAppTCData.outOfBand, 'outOfBand').to.be.undefined;

    this.checkVectorToBitField('purpose.consents', tcModel.purposeConsents, inAppTCData.purpose.consents as string);
    this.checkVectorToBitField('purpose.legitimateInterests', tcModel.purposeLegitimateInterest, inAppTCData.purpose.legitimateInterests as string);

    this.checkVectorToBitField('vendor.consents', tcModel.vendorConsents, inAppTCData.vendor.consents as string);
    this.checkVectorToBitField('vendor.legitimateInterests', tcModel.vendorLegitimateInterest, inAppTCData.vendor.legitimateInterests as string);

    this.checkVectorToBitField('specialFeatureOptIns', tcModel.specialFeatureOptIns, inAppTCData.specialFeatureOptins as string);

    this.checkVectorToBitField('publisher.consents', tcModel.publisherConsents, inAppTCData.publisher.consents as string);
    this.checkVectorToBitField('publisher.legitimateInterests', tcModel.publisherLegitimateInterest, inAppTCData.publisher.legitimateInterests as string);
    this.checkVectorToBitField('publisher.customPurpose.consents', tcModel.publisherCustomConsents, inAppTCData.publisher.customPurpose.consents as string);
    this.checkVectorToBitField('publisher.customPurpose.legitimateInterests', tcModel.publisherCustomLegitimateInterest, inAppTCData.publisher.customPurpose.legitimateInterests as string);

    if (tcModel.publisherRestrictions.numRestrictions) {

      expect(inAppTCData.publisher.restrictions, 'inAppTCData.publisher.restrictions').not.to.be.undefined;
      const purpRestrictions = tcModel.publisherRestrictions;

      const max = purpRestrictions.getMaxVendorId();
      purpRestrictions.getAllRestrictions().forEach((pRestrict: PurposeRestriction): void => {

        const strPurpId = pRestrict.purposeId.toString();

        for (let vendorId = 1; vendorId <= max; vendorId++) {

          const rValue = (inAppTCData.publisher.restrictions[strPurpId] as string).charAt(vendorId - 1);
          const testStr = `vendor ${vendorId} purpose ${strPurpId}`;

          if (purpRestrictions.vendorHasRestriction(vendorId, pRestrict)) {

            expect(rValue, testStr).to.equal(pRestrict.restrictionType.toString());

          } else {

            expect(rValue, testStr).to.equal('-');

          }

        }

      });

    }

  }

}
