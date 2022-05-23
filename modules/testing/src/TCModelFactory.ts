import {TCModel, PurposeRestriction, RestrictionType} from '@iabtcf/core';
import {makeRandomInt} from './makeRandomInt.js';
import {GVLFactory} from './GVLFactory.js';

export class TCModelFactory {

  public static noGVL(tcModel?: TCModel): TCModel {

    const latestGVL = GVLFactory.getLatest();

    if (!tcModel) {

      tcModel = new TCModel();

    }

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

    const date = new Date();
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const now = utcDate.getTime();
    const GDPRMageddon = 1576883249;

    tcModel.created = new Date(makeRandomInt(GDPRMageddon, now));
    tcModel.lastUpdated = new Date(makeRandomInt(GDPRMageddon, now));

    const mapping = {
      'purposes': [
        'publisherConsents',
        'publisherLegitimateInterests',
        'purposeConsents',
        'purposeLegitimateInterests',
      ],
      'specialFeatures': [
        'specialFeatureOptins',
      ],
      'vendors': [
        'vendorConsents',
        'vendorLegitimateInterests',
        'vendorsAllowed',
        'vendorsDisclosed',
      ],
    };
    Object.keys(mapping).forEach((gvlIntMap: string): void => {

      const ids = Object.keys(latestGVL[gvlIntMap]).map((strId: string): number => +strId);

      ids.forEach((id: number): void => {

        mapping[gvlIntMap].forEach((vectorName: string): void => {

          // 75% chance of being set
          if (makeRandomInt(1, 4) !== 3) {

            tcModel[vectorName].set(id);

          }

        });

      });

    });

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
