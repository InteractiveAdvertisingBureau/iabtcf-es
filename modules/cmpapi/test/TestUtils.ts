import {BooleanVector} from '../src/response/BooleanVector';
import {CmpApiModel} from '../src/CmpApiModel';
import {CmpApi} from '../src/CmpApi';
import {CustomCommands} from '../src/CustomCommands';
import {InAppTCData} from '../src/response/InAppTCData';
import {PurposeRestriction, TCString, Vector} from '@iabtechlabtcf/core';
import {TCData} from '../src/response/TCData';
import {expect} from 'chai';
import {makeRandomInt} from '@iabtechlabtcf/testing';

export class TestUtils {

  public static getCmpApi(customCommands?: CustomCommands): CmpApi {

    return new CmpApi(
      makeRandomInt(2, Math.pow(2, 6)),
      makeRandomInt(2, Math.pow(2, 6)),
      !makeRandomInt(0, 1),
      customCommands,
    );

  }

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

  private static checkVectorToBitField(name: string,
                                       vector: Vector,
                                       str: string): void {

    expect(str.length).to.equal(vector.maxId);
    vector.forEach((value: boolean, id: number): void => {

      expect(str.charAt(id - 1), name+' id: ' + id ).to.equal(String(Number(value)));

    });

  }

  public static inAppTCDataToTCModel(vendorsList?: number[]): void {

    const tcModel = CmpApiModel.tcModel;
    const inAppTCData = new InAppTCData(vendorsList);

    expect(inAppTCData.tcString, 'tcString').to.equal(TCString.encode(tcModel));
    expect(inAppTCData.eventStatus, 'eventStatus').to.equal(CmpApiModel.eventStatus);
    expect(inAppTCData.isServiceSpecific, 'isServiceSpecific').to.equal(tcModel.isServiceSpecific);
    expect(inAppTCData.useNonStandardTexts, 'useNonStandardTexts').to.equal(tcModel.useNonStandardTexts);
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

  public static tcModelToTCData(vendors?: number[], tcData?: TCData): void {

    const tcModel = CmpApiModel.tcModel;
  
    if (!tcData) {

      tcData = new TCData(vendors);

    }

    expect(tcData.tcString, 'tcString').to.equal(CmpApiModel.tcString);
    expect(tcData.eventStatus, 'eventStatus').to.equal(CmpApiModel.eventStatus);
    expect(tcData.cmpStatus, 'cmpStatus').to.equal(CmpApiModel.cmpStatus);
    expect(tcData.isServiceSpecific, 'isServiceSpecific').to.equal(tcModel.isServiceSpecific);
    expect(tcData.useNonStandardTexts, 'useNonStandardTexts').to.equal(tcModel.useNonStandardTexts);
    expect(tcData.purposeOneTreatment, 'purposeOneTreatment').to.equal(tcModel.purposeOneTreatment);
    expect(tcData.publisherCC, 'publisherCC').to.equal(tcModel.publisherCountryCode);

    if (tcData.outOfBand && tcModel.vendorsAllowed.size) {

      this.checkVectorToBooleanVector('outOfBand.allowedVendors', tcModel.vendorsAllowed, tcData.outOfBand.allowedVendors as BooleanVector, vendors);

    }

    if (tcData.outOfBand && tcModel.vendorsDisclosed.size) {

      this.checkVectorToBooleanVector('outOfBand.disclosedVendors', tcModel.vendorsDisclosed, tcData.outOfBand.disclosedVendors as BooleanVector, vendors);

    }

    this.checkVectorToBooleanVector('purpose.consents', tcModel.purposeConsents, tcData.purpose.consents as BooleanVector);
    this.checkVectorToBooleanVector('purpose.legitimateInterests', tcModel.purposeLegitimateInterests, tcData.purpose.legitimateInterests as BooleanVector);

    this.checkVectorToBooleanVector('vendor.consents', tcModel.vendorConsents, tcData.vendor.consents as BooleanVector, vendors);
    this.checkVectorToBooleanVector('vendor.legitimateInterests', tcModel.vendorLegitimateInterests, tcData.vendor.legitimateInterests as BooleanVector, vendors);
    this.checkVectorToBooleanVector('vendor.disclosedVendors', tcModel.vendorsDisclosed, tcData.vendor.disclosedVendors as BooleanVector, vendors);

    this.checkVectorToBooleanVector('specialFeatureOptins', tcModel.specialFeatureOptins, tcData.specialFeatureOptins as BooleanVector);

    this.checkVectorToBooleanVector('publisher.consents', tcModel.publisherConsents, tcData.publisher.consents as BooleanVector);
    this.checkVectorToBooleanVector('publisher.legitimateInterests', tcModel.publisherLegitimateInterests, tcData.publisher.legitimateInterests as BooleanVector);
    this.checkVectorToBooleanVector('publisher.customPurpose.consents', tcModel.publisherCustomConsents, tcData.publisher.customPurpose.consents as BooleanVector);
    this.checkVectorToBooleanVector('publisher.customPurpose.legitimateInterests', tcModel.publisherCustomLegitimateInterests, tcData.publisher.customPurpose.legitimateInterests as BooleanVector);

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
