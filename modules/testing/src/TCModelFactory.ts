import {TCModel, PurposeRestriction, RestrictionType} from '@iabtcf/core';
import {makeRandomInt} from './makeRandomInt';
import {makeRandomIntArray} from './makeRandomIntArray';
import {GVLFactory} from './GVLFactory';

export class TCModelFactory {

  public static noGVL(): TCModel {

    const latestGVL = GVLFactory.getLatest();

    const numPurposes = Object.keys(latestGVL.purposes).length;
    const numVendors = Object.keys(latestGVL.vendors).length;
    const numSpecialFeatures = Object.keys(latestGVL.specialFeatures).length;

    const tcModel = new TCModel();

    tcModel.cmpId = makeRandomInt(2, 100);
    tcModel.cmpVersion = makeRandomInt(1, 10);
    tcModel.consentScreen = makeRandomInt(1, 5);
    tcModel.isServiceSpecific = !!makeRandomInt(0, 1);
    tcModel.vendorListVersion = makeRandomInt(1, latestGVL.vendorListVersion);

    let counter = 0;
    const rand = makeRandomInt(1, TCModel.consentLanguages.size);
    TCModel.consentLanguages.forEach((lang: string): void => {

      counter ++;

      if (counter === rand) {

        tcModel.consentLanguage = lang;

      }

    });

    tcModel.publisherCountryCode = String.fromCharCode(makeRandomInt(65, 90)) +
      String.fromCharCode(makeRandomInt(65, 90));

    const now = (new Date()).getTime();
    const GDPRMageddon = 1576883249;
    tcModel.created = new Date(makeRandomInt(GDPRMageddon, now));
    tcModel.lastUpdated = new Date(makeRandomInt(tcModel.created.getTime(), now));

    tcModel.publisherConsents.set(makeRandomIntArray(1, numPurposes, makeRandomInt(0, numPurposes)));
    tcModel.publisherLegitimateInterests.set(makeRandomIntArray(1, numPurposes, makeRandomInt(0, numPurposes)));

    tcModel.purposeConsents.set(makeRandomIntArray(1, numPurposes, makeRandomInt(0, numPurposes)));
    tcModel.purposeLegitimateInterests.set(makeRandomIntArray(1, numPurposes, makeRandomInt(0, numPurposes)));

    tcModel.vendorConsents.set(makeRandomIntArray(1, numVendors, makeRandomInt(0, numVendors)));
    tcModel.vendorLegitimateInterests.set(makeRandomIntArray(1, numVendors, makeRandomInt(0, numVendors)));

    tcModel.specialFeatureOptins.set(makeRandomIntArray(1, numSpecialFeatures, makeRandomInt(0, numSpecialFeatures)));

    tcModel.vendorsAllowed.set(makeRandomIntArray(1, numVendors, makeRandomInt(0, numVendors)));
    tcModel.vendorsDisclosed.set(makeRandomIntArray(1, numVendors, makeRandomInt(0, numVendors)));

    return tcModel;

  }

  public static addPublisherRestrictions(tcModel: TCModel): TCModel {

    if (!tcModel.gvl) {

      tcModel.gvl = GVLFactory.getLatest();

    }

    Object.keys(tcModel.gvl.vendors).forEach((vendorId: string): void => {

      const vendor = tcModel.gvl.vendors[vendorId];

      if (vendor.flexiblePurposes.length) {

        const purposeId = vendor.flexiblePurposes[makeRandomInt(0, vendor.flexiblePurposes.length - 1)];
        const isInConsent = vendor.purposes.includes(purposeId);
        const notAllowed = makeRandomInt(0, 1) === 1;
        let purpRestriction: PurposeRestriction;

        if (notAllowed) {

          purpRestriction = new PurposeRestriction(purposeId, RestrictionType.NOT_ALLOWED);

        } else if (isInConsent) {

          purpRestriction = new PurposeRestriction(purposeId, RestrictionType.REQUIRE_LI);

        } else {

          purpRestriction = new PurposeRestriction(purposeId, RestrictionType.REQUIRE_CONSENT);

        }

        tcModel.publisherRestrictions.add(+vendorId, purpRestriction);

      }

    });

    return tcModel;

  }

  public static withGVL(): TCModel {

    const tcModel = this.noGVL();

    tcModel.gvl = GVLFactory.getLatest();

    return tcModel;

  }

}
