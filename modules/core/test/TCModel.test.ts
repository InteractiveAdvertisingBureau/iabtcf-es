import {expect, assert} from 'chai';
import {TCModel} from '../src/TCModel';

import {Vector} from '../src/model/Vector';
import {GVL} from '../src/GVL';

describe('TCModel', (): void => {

  const runValidTest = (fieldName: string, handler: () => void): void => {

    it(`should be able to set and get a valid ${fieldName}`, handler);

  };

  const testInt = (fieldName: string, lowestValue: number): void => {

    const shouldBeOk = (): void => {

      runValidTest(fieldName, (): void => {

        const value = lowestValue + 1;
        const tcModel = new TCModel();

        tcModel[fieldName] = value;
        expect(tcModel[fieldName]).to.equal(value);

      });

    };

    const shouldBeNotOk = (valueToTest: number): void => {

      it(`should not allow ${fieldName} to be ${valueToTest}`, (): void => {

        const tcModel = new TCModel();

        try {

          tcModel[fieldName] = valueToTest;
          expect.fail(`${fieldName}=${valueToTest} should have thrown an error`);

        } catch (error) {

          expect(error.name).to.equal('TCModelError');
          expect(error.message).to.include(`${valueToTest}`);
          expect(error.message).to.include(fieldName);

        }

      });

    };

    describe(fieldName, (): void => {

      shouldBeOk();
      shouldBeNotOk(lowestValue - 1);
      shouldBeNotOk(-1);
      shouldBeNotOk(1.1);

    });

  };

  const testDate = (fieldName: string): void => {

    describe(fieldName, (): void => {

      runValidTest(fieldName, (): void => {

        const tcModel = new TCModel();
        const testDate = new Date();

        tcModel[fieldName] = testDate;

        expect((tcModel[fieldName] as Date).getTime())
          .to.equal(Math.round(testDate.getTime()));

      });

    });

  };

  const testBoolean = (fieldName: string): void => {

    describe(fieldName, (): void => {

      runValidTest(fieldName, (): void => {

        const tcModel = new TCModel();

        expect(tcModel[fieldName], `${fieldName} should be default false`).to.be.false;

        tcModel[fieldName] = true;

        expect(tcModel[fieldName], `${fieldName} should have been set to true`).to.be.true;

      });

    });

  };

  const testInstanceOf = <T>(fieldName: string, theInstanceOf: {new (): T}): void => {

    const instanceName = theInstanceOf.name;

    describe(fieldName, (): void => {

      // eslint-disable-next-line
    const vendorlistJson = require('../../../dev/vendor-list.json');
      const gvl: GVL = new GVL(vendorlistJson);

      it(`should create an instance of ${instanceName} as ${fieldName} on init`, (): void => {

        const tcModel = new TCModel(gvl);

        expect(
          tcModel[fieldName],
          `${fieldName} should be an instance of ${instanceName}`)
          .to.be.an.instanceof(theInstanceOf);

      });

    });

  };

  it('should construct a TCModel with no arguments', (): void => {

    const makeModel: () => void = (): void => {

      // disabling because it's upset that I'm not doing anything with this
      // eslint-disable-next-line
      const tcModel: TCModel = new TCModel();

    };

    expect(makeModel).to.not.throw();

    const tcModel = new TCModel();

    // since we didn't construct with a gvl we should
    // have empty fields here
    expect(tcModel.vendorListVersion).to.equal(0);
    expect(tcModel.policyVersion).to.equal(2);
    expect(tcModel.gvl).to.be.undefined;

  });

  it('should construct a TCModel with a GVL argument', (done: () => void): void => {

    // eslint-disable-next-line
    const vendorlistJson = require('../../../dev/vendor-list.json');
    const gvl: GVL = new GVL(vendorlistJson);

    expect((): void => {

      // disabling because it's upset that I'm not doing anything with this
      // eslint-disable-next-line
      const tcModel: TCModel = new TCModel(gvl);

    }).to.not.throw();

    const tcModel = new TCModel(gvl);

    expect(tcModel.gvl).to.equal(gvl);
    tcModel.gvl.readyPromise.then((): void => {

      expect(tcModel.policyVersion, 'policyVersion should be picked up from gvl')
        .to.equal(gvl.tcfPolicyVersion);
      expect(tcModel.vendorListVersion, 'vendorListVersion should be picked up from gvl')
        .to.equal(gvl.vendorListVersion);
      expect(tcModel.gvl, 'should save and make accessible the gvl')
        .to.equal(gvl);
      done();

    });

  });

  const sameDataDeifferentReference = function(obj1, obj2, objName): void {

    expect(obj1, `${objName} is not deeply equal`).to.deep.equal(obj2);
    expect(obj1, `${objName}'s are the same object reference`).to.not.equal(obj2);

  };

  it('should clone a TCModel', (): void => {

    // eslint-disable-next-line
    const vendorlistJson = require('../../../dev/vendor-list.json');
    const gvl: GVL = new GVL(vendorlistJson);
    const tcModel = new TCModel(gvl);
    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();

    tcModel.purposeConsents.unset(2);
    tcModel.vendorConsents.unset(37);

    const clone = tcModel.clone();

    assert.equal(clone.isValid(), tcModel.isValid(), 'tcModel IsValid did not return the same value as original');
    assert.equal(clone.publisherRestrictions.isValid(), tcModel.publisherRestrictions.isValid(), 'PR IsValid did not return the same value as original');

    assert.equal(clone.cmpId, tcModel.cmpId, 'cmpId did not match original value');
    assert.equal(clone.created.getTime(), tcModel.created.getTime(), 'created did not match set value');
    assert.notStrictEqual(clone.created, tcModel.created, 'created matched strict equals');

    expect(JSON.stringify(tcModel, null, 2)).to.equal(JSON.stringify(clone, null, 2));

    sameDataDeifferentReference(clone, tcModel, 'TcModel');
    sameDataDeifferentReference(clone.purposeConsents, tcModel.purposeConsents, 'purposeConsents');
    assert.equal(clone.purposeConsents.maxId, tcModel.purposeConsents.maxId, 'purposeConsents max id did not match set value');
    sameDataDeifferentReference(clone.publisherRestrictions.getAllRestrictions(), tcModel.publisherRestrictions.getAllRestrictions(), 'PR Restrictions');
    sameDataDeifferentReference(clone.gvl.specialFeatures, tcModel.gvl.specialFeatures, 'specialFeatures');
    sameDataDeifferentReference(clone.gvl.vendors, tcModel.gvl.vendors, 'vendors');

  });

  testInt('cmpId', 2);
  testInt('cmpVersion', 0);
  testInt('consentScreen', 0);

  testDate('created');
  testDate('lastUpdated');

  testBoolean('isServiceSpecific');
  testBoolean('useNonStandardStacks');

  testInstanceOf('purposeConsents', Vector);
  testInstanceOf('purposeLegitimateInterest', Vector);

  testInstanceOf('vendorConsents', Vector);
  testInstanceOf('vendorLegitimateInterest', Vector);
  testInstanceOf('specialFeatureOptIns', Vector);

  describe('consentLanguage', (): void => {

    const shouldBeOk: (value: string) => void = (value: string): void => {

      it(`should be ok with ${value}`, (): void => {

        const tcModel = new TCModel();

        expect((): void => {

          tcModel.consentLanguage = value;

        }).not.to.throw();

        expect(tcModel.consentLanguage).to.equal(value.toUpperCase());

      });

    };

    const shouldBeNotOk: (value: string) => void = (value: string): void => {

      it(`should not be ok with ${value}`, (): void => {

        const tcModel = new TCModel();

        expect((): void => {

          tcModel.consentLanguage = value;

        }).to.throw();

        // default language
        expect(tcModel.consentLanguage).to.equal('EN');

      });

    };

    shouldBeOk('EN');
    shouldBeOk('BG');
    shouldBeOk('CS');
    shouldBeOk('DA');
    shouldBeOk('DE');
    shouldBeOk('EL');
    shouldBeOk('ES');
    shouldBeOk('ET');
    shouldBeOk('FI');
    shouldBeOk('FR');
    shouldBeOk('GA');
    shouldBeOk('HR');
    shouldBeOk('HU');
    shouldBeOk('IT');
    shouldBeOk('LT');
    shouldBeOk('LV');
    shouldBeOk('MT');
    shouldBeOk('NL');
    shouldBeOk('PL');
    shouldBeOk('PT');
    shouldBeOk('RO');
    shouldBeOk('SK');
    shouldBeOk('SL');
    shouldBeOk('SV');

    shouldBeOk('en');
    shouldBeOk('bg');
    shouldBeOk('cs');
    shouldBeOk('da');
    shouldBeOk('de');
    shouldBeOk('el');
    shouldBeOk('es');
    shouldBeOk('et');
    shouldBeOk('fi');
    shouldBeOk('fr');
    shouldBeOk('ga');
    shouldBeOk('hr');
    shouldBeOk('hu');
    shouldBeOk('it');
    shouldBeOk('lt');
    shouldBeOk('lv');
    shouldBeOk('mt');
    shouldBeOk('nl');
    shouldBeOk('pl');
    shouldBeOk('pt');
    shouldBeOk('ro');
    shouldBeOk('sk');
    shouldBeOk('sl');
    shouldBeOk('sv');

    shouldBeNotOk(' EN');
    shouldBeNotOk('  ');
    shouldBeNotOk('aa');
    shouldBeNotOk('zz');
    shouldBeNotOk('AA');
    shouldBeNotOk('ZZ');

    // too long
    shouldBeNotOk('aaa');

    // too short
    shouldBeNotOk('a');

    shouldBeNotOk('@#');
    shouldBeNotOk('15');
    shouldBeNotOk('{{');

  });

  describe('version', (): void => {

    const shouldBeOk: (value: number) => void = (value: number): void => {

      it(`should be ok with ${value}`, (): void => {

        const tcModel = new TCModel();

        expect((): void => {

          tcModel.version = value;

        }).not.to.throw();

        expect(tcModel.version).to.equal(value);

      });

    };

    const shouldBeNotOk: (value: number) => void = (value: number): void => {

      it(`should not be ok with ${value}`, (): void => {

        const tcModel = new TCModel();

        const defaultVersion: number = tcModel.version;

        expect((): void => {

          tcModel.version = value;

        }).to.throw();

        // should not be changed
        expect(tcModel.version).to.equal(defaultVersion);

      });

    };

    shouldBeOk(1);
    shouldBeOk(2);
    shouldBeNotOk(0);
    shouldBeNotOk(3);
    shouldBeNotOk(1.1);

  });

  describe('isValid()', (): void => {

    // eslint-disable-next-line
  const vendorlistJson = require('../../../dev/vendor-list.json');
    const gvl: GVL = new GVL(vendorlistJson);

    it('should be valid if everything is set', (done: () => void ): void => {

      const tcModel = new TCModel(gvl);

      tcModel.cmpId = 23;
      tcModel.cmpVersion = 1;

      expect(tcModel.gvl).to.equal(gvl);
      tcModel.gvl.readyPromise.then((): void => {

        expect(tcModel.isValid()).to.be.true;
        done();

      });

    });

    const makeInvalidTest = (key: string): void => {

      it(`should be invalid if ${key} is not set`, (): void => {

        const tcModel = new TCModel();

        if (key !== 'gvl') {

          tcModel.gvl = gvl;

        }

        if (key !== 'cmpId') {

          tcModel.cmpId = 23;

        }

        if (key !== 'cmpVersion') {

          tcModel.cmpVersion = 1;

        }

        expect(tcModel.isValid()).to.be.false;

      });

    };

    [
      'gvl',
    ].forEach(makeInvalidTest);

  });

  const runSetAllAndUnsetAll = (): void => {

    // eslint-disable-next-line
  const vendorlistJson = require('../../../dev/vendor-list.json');
    const gvl: GVL = new GVL(vendorlistJson);

    const loopGVLMap = (gvlKey: string, cb ): void => {

      for (const id in gvl[gvlKey]) {

        if (gvl[gvlKey].hasOwnProperty(id)) {

          cb(parseInt(id, 10));

        }

      }

    };

    const setUnSetAlls = {
      vendorConsents: {gvlKey: 'vendors'},
      vendorLegitimateInterest: {gvlKey: 'vendors'},
      purposeConsents: {gvlKey: 'purposes'},
      purposeLegitimateInterest: {gvlKey: 'purposes'},
      specialFeatureOptIns: {gvlKey: 'specialFeatures'},
    };

    for (const vectorName in setUnSetAlls) {

      if (setUnSetAlls.hasOwnProperty(vectorName)) {

        const endOfFunctionName = 'All' + vectorName.charAt(0).toUpperCase() + vectorName.slice(1);
        const setFunctionName = 'set' + endOfFunctionName;
        const unsetFunctionName = 'unset' + endOfFunctionName;

        describe(setFunctionName + '()', (): void => {

          it('should set all values', (): void => {

            const tcModel = new TCModel(gvl);

            loopGVLMap(setUnSetAlls[vectorName].gvlKey, (id: number): void => {

              expect(tcModel[vectorName].has(id)).to.be.false;

            });
            tcModel[setFunctionName]();
            loopGVLMap(setUnSetAlls[vectorName].gvlKey, (id: number): void => {

              expect(tcModel[vectorName].has(id)).to.be.true;

            });

          });

        });
        describe(unsetFunctionName + '()', (): void => {

          it('should unset all values', (): void => {

            const tcModel = new TCModel(gvl);

            tcModel[setFunctionName]();
            loopGVLMap(setUnSetAlls[vectorName], (id: number): void => {

              expect(tcModel[vectorName].has(id)).to.be.true;

            });

            tcModel[unsetFunctionName]();
            loopGVLMap(setUnSetAlls[vectorName], (id: number): void => {

              expect(tcModel[vectorName].has(id)).to.be.false;

            });

          });

        });

      }

    }

  };

  runSetAllAndUnsetAll();

});
