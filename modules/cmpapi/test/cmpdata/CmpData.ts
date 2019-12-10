import {TCModel} from '@iabtcf/core';
import {sameDataDiffRef} from '@iabtcf/testing';
import {assert} from 'chai';
import {CmpData} from '../../src/cmpdata';
import {settings} from '../../src/settings';
import {CmpStatus, DisplayStatus, EventStatus} from '../../src/status';
import {TcModelChangeEventHandler} from '../../src/types';
import {ValidationMessages} from '../../src/validation';
import {createValidTCModel, gvl} from '../utils';

export function run(): void {

  describe('CmpData', (): void => {

    const cmpId = 2;
    const cmpVersion = 3;
    let cmpData: CmpData;

    describe('Constructor', (): void => {

      it('should create create a new CmpData object with correct default values', (): void => {

        cmpData = new CmpData(cmpId, cmpVersion);

        assert.isNotNull(cmpData, `cmpApi is null after construction`);
        assert.equal(cmpData.getCmpId(), cmpId, `cmpId does not match ${cmpId}`);
        assert.equal(cmpData.getCmpVersion(), cmpVersion, `cmpVersion does not match ${cmpVersion}`);

        const testGetterEquals = (propertyName, value): void => {

          assert.equal(cmpData[`get${propertyName}`](), value, `${propertyName} did not equal ${value}`);

        };

        testGetterEquals('ApiVersion', settings.apiVersion);
        testGetterEquals('TcfPolicyVersion', settings.tcfPolicyVersion);
        testGetterEquals('CmpStatus', settings.defaults.cmpStatus);
        testGetterEquals('DisplayStatus', settings.defaults.displayStatus);
        testGetterEquals('EventStatus', settings.defaults.eventStatus);

      });

    });

    describe('TCModel Methods', (): void => {

      describe('Before Setting TCModel', (): void => {

        describe('tcModelIsSet', (): void => {

          it('should return false if not set', (): void => {

            assert.isFalse(cmpData.tcModelIsSet, `Did not return false`);

          });

        });

      });

      describe('setTCModel', (): void => {

        it('should work with a valid TCModel', (): void => {

          assert.doesNotThrow(() => cmpData.setTCModel(createValidTCModel(gvl)), `Thing is not true`);

        });

      });

      describe('After TCModel is set', (): void => {

        describe('getTcModel', (): void => {

          it('should return a copy of the the TCModel', (): void => {

            sameDataDiffRef(cmpData.getTcModel(), createValidTCModel(gvl), 'TcData');

          });

        });

        describe('tcModelIsSet', (): void => {

          it('should return true if set', (): void => {

            assert.isTrue(cmpData.tcModelIsSet, `Did not return true`);

          });

        });

      });

    });

    describe('Basic Getter/Setter Methods', (): void => {

      const testGetterSetter = (propertyName, ...testValues): void => {

        describe(propertyName, (): void => {

          it('works', (): void => {

            const _cmpData = new CmpData(cmpId, cmpVersion);
            testValues.forEach((testValue) => {

              _cmpData[`set${propertyName}`](testValue);

              assert.equal(_cmpData[`get${propertyName}`](), testValue, `${propertyName} did not match set value ${testValue}`);

            });

          });

        });

      };

      testGetterSetter('ApiVersion', -1, 1, 5, 99);
      testGetterSetter('CmpId', -1, 1, 5, 99);
      testGetterSetter('CmpVersion', -1, 1, 5, 99);
      testGetterSetter('TcfPolicyVersion', -1, 1, 5, 99);
      testGetterSetter('GdprApplies', true, false);
      testGetterSetter('EventStatus', EventStatus.CMP_UI_SHOWN, EventStatus.TC_LOADED);
      testGetterSetter('CmpStatus', CmpStatus.ERROR, CmpStatus.LOADING);
      testGetterSetter('DisplayStatus', DisplayStatus.VISIBLE, DisplayStatus.DISABLED);
      testGetterSetter('DisabledByCmp', true, false);

    });

    describe('registerTcModelChangeEventCallback', (): void => {

      it('should register TcModel change event callback and execute it on tc model change', (done): void => {

        const tcModelChangeCallback: TcModelChangeEventHandler = (): void => done();

        cmpData.registerTcModelChangeEventCallback(tcModelChangeCallback);

        cmpData.setTCModel(createValidTCModel(gvl));

      });

    });

  });

}
