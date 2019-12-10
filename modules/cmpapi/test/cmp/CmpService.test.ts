import {TCModel} from '@iabtcf/core';
import {assert} from 'chai';
import {CmpService, CmpStatus, DisplayStatus, EventStatus} from '../../src';
import {CmpData} from '../../src/cmpdata';
import {ValidationMessages} from '../../src/validation';
import {createValidTCModel, gvl} from '../utils';

export function run(): void {

  describe('CmpService', (): void => {

    let cmpService: CmpService;
    let cmpData = new CmpData(2, 3);

    const testCmpDataGetterEquals = (propertyName, value): void => {

      assert.equal(cmpData[`get${propertyName}`](), value, `${propertyName} did not equal ${value}`);

    };

    describe('Constructor', (): void => {

      it('should create a new CmpService instance', (): void => {

        cmpService = new CmpService(cmpData);

        assert.isNotNull(cmpService, `cmpService is null after construction`);

      });

    });

    describe('setTcModel', (): void => {

      describe('On first set', (): void => {

        it('should set proper state in CmpDate without throwing an error when setting a valid TCModel', (): void => {

          assert.doesNotThrow(
            (): void => cmpService.setTcModel(createValidTCModel(gvl)), `Threw an error when setting a valid TCModel`
          );

          assert.isNotNull(cmpData.getTcModel(), `The TCModel set was not set`);
          testCmpDataGetterEquals('GdprApplies', true);
          testCmpDataGetterEquals('DisplayStatus', DisplayStatus.HIDDEN);
          testCmpDataGetterEquals('CmpStatus', CmpStatus.LOADED);
          testCmpDataGetterEquals('EventStatus', EventStatus.TC_LOADED);

        });

      });

      describe('On subsequent sets', (): void => {

        it('should set proper state in CmpDate without throwing an error when setting a valid TCModel', (): void => {

          assert.doesNotThrow(
            (): void => cmpService.setTcModel(createValidTCModel(gvl)), `Threw an error when setting a valid TCModel`
          );

          assert.isNotNull(cmpData.getTcModel(), `The TCModel set was not set`);
          testCmpDataGetterEquals('GdprApplies', true);
          testCmpDataGetterEquals('DisplayStatus', DisplayStatus.HIDDEN);
          testCmpDataGetterEquals('CmpStatus', CmpStatus.LOADED);
          testCmpDataGetterEquals('EventStatus', EventStatus.USER_ACTION_COMPLETE);

        });

      });

      describe('When setting null', (): void => {

        it('should set proper state in CmpDate and not throw an error', (): void => {

          assert.doesNotThrow(
            (): void => cmpService.setTcModel(null), `Did throw an error when setting TCModel to null`
          );

          testCmpDataGetterEquals('GdprApplies', false);
          testCmpDataGetterEquals('DisplayStatus', DisplayStatus.DISABLED);
          testCmpDataGetterEquals('CmpStatus', CmpStatus.LOADED);

        });

      });

      describe('When in a disabled state', (): void => {

        it('should throw an error', (): void => {

          cmpService.disable();

          assert.throws((): void => cmpService.setTcModel(new TCModel()), ValidationMessages.CMP_API_IN_DISABLED_STATE);

        });

      });

    });

    describe('setUiVisible', (): void => {

      // reset state
      beforeEach((): void => {

        cmpData = new CmpData(2, 3);
        cmpService = new CmpService(cmpData);

      });

      describe('When setting to true', (): void => {

        it('should set proper CmpData state', (): void => {

          cmpService.setUiVisible(true);
          testCmpDataGetterEquals('DisplayStatus', DisplayStatus.VISIBLE);
          testCmpDataGetterEquals('EventStatus', EventStatus.CMP_UI_SHOWN);

        });

      });

      describe('When setting to false', (): void => {

        it('should set proper CmpData state', (): void => {

          cmpService.setUiVisible(false);
          testCmpDataGetterEquals('DisplayStatus', DisplayStatus.DISABLED);
          testCmpDataGetterEquals('EventStatus', EventStatus.TC_LOADED);

        });

      });

      describe('When CmpApi is in a disabled state', (): void => {

        it('should throw and error', (): void => {

          assert.throws((): void => {

            cmpService.disable();
            cmpService.setUiVisible(true);

          }, ValidationMessages.CMP_API_IN_DISABLED_STATE);

        });

      });

    });

    describe('disable', (): void => {

      cmpData = new CmpData(2, 3);
      cmpService = new CmpService(cmpData);

      it('should set proper CmpApi state', (): void => {

        cmpService.disable();
        testCmpDataGetterEquals('DisabledByCmp', true);
        testCmpDataGetterEquals('CmpStatus', CmpStatus.ERROR);

      });

    });

  });

}
