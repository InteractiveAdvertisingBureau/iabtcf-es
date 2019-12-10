import {InAppTCData} from "../../../src/model";
import {EventStatus} from "../../../src/status";

export const inAppTcDataTestModel: InAppTCData = {
  tcString: 'COZS4DEOZS4DEACABAENAACMAL_AAP_AAAAAFWQB4ADAAYAA1ACCAGIATIA1wBwAFfAQIAmQBSACmQFSAKsAqyAQAAYACUAGAANQAggBiAEyANcAcABXwECAJkAUgApkBUgCrAAA',
  eventStatus: EventStatus.TC_LOADED,
  isServiceSpecific: false,
  useNonStandardStacks: false,
  purposeOneTreatment: false,
  publisherCC: 'AA',
  outOfBand: undefined,
  purpose:
    {consents: '1011111111', legitimateInterests: '1111111111'},
  vendor:
    {
      consents: '1011111111111111',
      legitimateInterests: '1111111111111111'
    },
  specialFeatureOptins: '11',
  publisher:
    {
      consents: '0000000000',
      legitimateInterests: '0000000000',
      customPurpose:
        {consents: '0000000000', legitimateInterests: '0000000000'},
      restrictions: {}
    },
  cmpId: 2,
  cmpVersion: 3,
  gdprApplies: true,
  tcfPolicyVersion: 3
};
