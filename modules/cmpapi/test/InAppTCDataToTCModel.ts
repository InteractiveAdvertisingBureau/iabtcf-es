import {TCString, Vector} from '@iabtcf/core';
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
    this.checkVectorToBitField('purpose.legitimateInterests', tcModel.purposeLegitimateInterests, inAppTCData.purpose.legitimateInterests as string);

    this.checkVectorToBitField('vendor.consents', tcModel.vendorConsents, inAppTCData.vendor.consents as string);
    this.checkVectorToBitField('vendor.legitimateInterests', tcModel.vendorLegitimateInterests, inAppTCData.vendor.legitimateInterests as string);

    this.checkVectorToBitField('specialFeatureOptins', tcModel.specialFeatureOptins, inAppTCData.specialFeatureOptins as string);

    this.checkVectorToBitField('publisher.consents', tcModel.publisherConsents, inAppTCData.publisher.consents as string);
    this.checkVectorToBitField('publisher.legitimateInterests', tcModel.publisherLegitimateInterests, inAppTCData.publisher.legitimateInterests as string);
    this.checkVectorToBitField('publisher.customPurpose.consents', tcModel.publisherCustomConsents, inAppTCData.publisher.customPurpose.consents as string);
    this.checkVectorToBitField('publisher.customPurpose.legitimateInterests', tcModel.publisherCustomLegitimateInterests, inAppTCData.publisher.customPurpose.legitimateInterests as string);

    if (tcModel.publisherRestrictions.numRestrictions) {

      expect(inAppTCData.publisher.restrictions, 'inAppTCData.publisher.restrictions').not.to.be.undefined;

      const prVector = tcModel.publisherRestrictions;
      const maxVendorId = prVector.getMaxVendorId();
      const purposeIds = prVector.getPurposes();
      const restrictions = inAppTCData.publisher.restrictions;

      purposeIds.forEach((purposeId: number): void => {

        const strPurposeID = purposeId.toString();
        const purposeVector: string = restrictions[strPurposeID] as string;
        expect(typeof purposeVector, `restrictions[${strPurposeID}]`).to.equal('string');
        expect(purposeVector.length, 'Restrictions keys length').to.equal(maxVendorId);

        for (let i = 0; i < maxVendorId; i ++) {

          const rValue = purposeVector.charAt(i);
          const vendorId = i + 1;
          const restrictionType = prVector.getRestrictionType(vendorId, purposeId);
          const testStr = `inAppTCData.publisher.restrictions[${strPurposeID}].charAt(${i})`;

          if (restrictionType !== undefined) {

            expect(rValue, testStr).to.equal(restrictionType.toString());

          } else {

            expect(rValue, testStr).to.equal('_');

          }

        }

      });

    }

  }

}
