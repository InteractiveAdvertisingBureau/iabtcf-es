import {sameDataDiffRef} from '@iabtcf/testing';
import {assert} from 'chai';
import {CmpData} from '../../../src/cmpdata';
import {Callback} from '../../../src/command/callback/Callback';
import {Commands, GetTcDataCommand} from '../../../src/command/commands';
import {TCData} from '../../../src/model';
import {EventStatus} from '../../../src/status';
import {ValidationMessages} from '../../../src/validation';
import {createValidTCModel, gvl} from '../../utils';
import {tcDataModelTest} from './TcDataTestData';

export function run(): void {

  describe('GetTcDataCommand', (): void => {

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

      it('should create a new instance of GetTcDataCommand', (): void => {

        const getTcDataCommand = new GetTcDataCommand(
          cmpData,
          Commands.GET_TC_DATA,
          2,
          new Callback((tcData: TCData | null, success: boolean): void => {}));
        assert.isNotNull(getTcDataCommand, 'Did not create a new instance of GetTcDataCommand');

      });

    });

    describe('execute', (): void => {

      it('should execute the command and return a TCData object', (done): void => {

        const getTcDataCommand = new GetTcDataCommand(cmpData, Commands.GET_TC_DATA, 2, new Callback(
          (tcData: TCData | null, success: boolean): void => {

            assert.isTrue(success, 'getTCData was not successful');
            assert.isNotNull(tcData, 'getTCData returned null tcData');

            tcData = tcData as TCData;
            sameDataDiffRef(tcData, tcDataModelTest, 'Tc Data');
            sameDataDiffRef(tcData.purpose, tcDataModelTest.purpose, 'Tc Data - purpose');
            sameDataDiffRef(tcData.vendor, tcDataModelTest.vendor, 'Tc Data - vendor');
            sameDataDiffRef(tcData.publisher, tcDataModelTest.publisher, 'Tc Data - publisher');
            sameDataDiffRef(tcData.publisher.restrictions, tcDataModelTest.publisher.restrictions, 'Tc Data - publisher restrictions');
            sameDataDiffRef(tcData.publisher.customPurpose, tcDataModelTest.publisher.customPurpose, 'Tc Data - publisher customPurpose');

            done();

          }), [1, 2, 3]);

        getTcDataCommand.execute();

      });

    });

    describe('validate', (): void => {

      it('should return true if the command is valid', (): void => {

        const getTcDataCommand = new GetTcDataCommand(
          cmpData,
          Commands.GET_TC_DATA,
          2,
          new Callback((tcData: TCData | null, success: boolean): void => {}));

        const validationResult = getTcDataCommand.validate();

        assert.isTrue(validationResult.isValid, `did not return true if the command is valid`);
        assert.equal(validationResult.validationMessages.length, 0);

      });

      it('should return false when using invalid vendor ids', (): void => {

        const getTcDataCommand = new GetTcDataCommand(
          cmpData,
          Commands.GET_TC_DATA,
          2,
          new Callback((tcData: TCData | null, success: boolean): void => {}),
          [1.5, 2]);

        const validationResult = getTcDataCommand.validate();

        assert.isFalse(validationResult.isValid, `did not return false if the command is not valid`);
        assert.equal(validationResult.validationMessages[0], ValidationMessages.VENDOR_LIST_INVALID);

      });

      it('should pass null to callback and false for success if validate passed true for failCallbackIfNotValid for bad command', (done): void => {

        const getTcDataCommand = new GetTcDataCommand(cmpData, Commands.GET_TC_DATA, 0, new Callback(
          (tcData: TCData | null, success: boolean): void => {

            assert.isFalse(success, 'getTCData was successful');
            assert.isNull(tcData, 'getTCData returned tcData');

            // Todo: Check the object more thoroughly

            done();

          }), [1, 2, 3]);

        const validationResult = getTcDataCommand.validate(true);

        assert.isFalse(validationResult.isValid, `did not return false if the command is not valid`);
        assert.equal(validationResult.validationMessages[0], ValidationMessages.VENDOR_LIST_VERSION_INVALID);

      });

    });

  });

}
