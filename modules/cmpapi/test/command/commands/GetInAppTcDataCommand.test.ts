import {sameDataDiffRef} from '@iabtcf/testing';
import {assert} from 'chai';
import {CmpData} from '../../../src/cmpdata';
import {Callback} from '../../../src/command/callback/Callback';
import {Commands, GetInAppTcDataCommand} from '../../../src/command/commands';
import {InAppTCData} from '../../../src/model';
import {EventStatus} from '../../../src/status';
import {createValidTCModel, gvl} from '../../utils';
import {inAppTcDataTestModel} from '../../mockdata/InAppTcDataTestData';

export function run(): void {

  describe('GetInAppTcDataCommand', (): void => {

    const cmpId = 2;
    const cmpVersion = 3;
    const cmpData = new CmpData(cmpId, cmpVersion);
    const tcModel = createValidTCModel(gvl);
    tcModel['created'] = new Date(2018, 11, 24, 10, 33, 30, 0);
    tcModel['lastUpdated'] = new Date(2018, 11, 24, 10, 33, 30, 0);
    cmpData.setTCModel(tcModel);
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
            sameDataDiffRef(iaTcData.purpose, inAppTcDataTestModel.purpose, 'In App Tc Data - purpose');
            sameDataDiffRef(iaTcData.vendor, inAppTcDataTestModel.vendor, 'In App Tc Data - vendor');
            sameDataDiffRef(iaTcData.publisher, inAppTcDataTestModel.publisher, 'In App Tc Data - publisher');
            sameDataDiffRef(iaTcData.publisher.restrictions, inAppTcDataTestModel.publisher.restrictions, 'In App Tc Data - publisher restrictions');
            sameDataDiffRef(iaTcData.publisher.customPurpose, inAppTcDataTestModel.publisher.customPurpose, 'In App Tc Data - publisher customPurpose');

            done();

          }));

        getInAppTcDataCommand.execute();

      });

    });

  });

}
