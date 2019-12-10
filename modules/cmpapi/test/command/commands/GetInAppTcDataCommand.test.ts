import {sameDataDiffRef} from '@iabtcf/testing';
import {assert} from 'chai';
import {CmpData} from '../../../src/cmpdata';
import {Callback} from '../../../src/command/callback/Callback';
import {Commands, GetInAppTcDataCommand} from '../../../src/command/commands';
import {InAppTCData} from '../../../src/model';
import {EventStatus} from '../../../src/status';
import {createValidTCModel, gvl} from '../../utils';

const inAppTcDataTestModel: InAppTCData = {
  tcString: 'COrXmLNOrXmLNACABAENAACMAL_AAP_AAAAAFWQB4ADAAYAA1ACCAGIATIA1wBwAFfAQIAmQBSACmQFSAKsAqyAQAAYACUAGAANQAggBiAEyANcAcABXwECAJkAUgApkBUgCrAAA',
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
      legitimateInterests: '1111111111111111'},
  specialFeatureOptins: '11',
  publisher:
    {
      consents: '0000000000',
      legitimateInterests: '0000000000',
      customPurpose:
        {consents: '0000000000', legitimateInterests: '0000000000'},
      restrictions: {}},
  cmpId: 2,
  cmpVersion: 3,
  gdprApplies: true,
  tcfPolicyVersion: 3};

export function run(): void {

  describe('GetInAppTcDataCommand', (): void => {

    const cmpId = 2;
    const cmpVersion = 3;
    const cmpData = new CmpData(cmpId, cmpVersion);
    cmpData.setTCModel(createValidTCModel(gvl));
    cmpData.setEventStatus(EventStatus.TC_LOADED);
    cmpData.setGdprApplies(true);

    describe('Constructor', (): void => {

      it('should create a new instance of GetInAppTcDataCommand', (): void => {

        const getInAppTcDataCommand = new GetInAppTcDataCommand(
          cmpData,
          Commands.GET_IN_APP_TC_DATA,
          2,
          new Callback((iaTcData: InAppTCData | null, success: boolean): void => {
          }));
        assert.isNotNull(getInAppTcDataCommand, 'Did not create a new instance of GetInAppTcDataCommand');

      });

    });

    describe('execute', (): void => {

      it('should execute the command and return a TCData object', (done): void => {

        const getInAppTcDataCommand = new GetInAppTcDataCommand(cmpData, Commands.GET_TC_DATA, 2, new Callback(
          (iaTcData: InAppTCData | null, success: boolean): void => {

            assert.isTrue(success, 'GetInAppTcDataCommand was not successful');
            assert.isNotNull(iaTcData, 'GetInAppTcDataCommand returned null tcData');
            iaTcData = iaTcData as InAppTCData;
            sameDataDiffRef(iaTcData, inAppTcDataTestModel, 'In App Tc Data');

            // Todo: Check the object more thoroughly

            done();

          }));

        getInAppTcDataCommand.execute();

      });

    });

  });

}
