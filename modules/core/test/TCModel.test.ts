import {expect} from 'chai';
import {TCModel} from '../src/TCModel';

import {Vector} from '../src/model/Vector';
import {GVL} from '../src/GVL';

const runValidTest = (fieldName: string, handler: () => void): void => {

  it(`should be able to set and get a valid ${fieldName}`, handler);

};
const runDescribe = (fieldName: string, handler: () => void): void => {

  describe(`TCModel->${fieldName}`, handler);

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

    it(`should not allow cmpId to be ${valueToTest}`, (): void => {

      const tcModel = new TCModel();

      try {

        tcModel[fieldName] = valueToTest;
        expect.fail(`${fieldName} ${valueToTest} should have thrown an error`);

      } catch (error) {

        expect(error.name).to.equal('TCModelError');
        expect(error.message).to.include(`${valueToTest}`);
        expect(error.message).to.include(fieldName);

      }

    });

  };


  runDescribe(fieldName, (): void => {

    shouldBeOk();
    shouldBeNotOk(lowestValue - 1);
    shouldBeNotOk(-1);
    shouldBeNotOk(1.1);

  });

};


const testDate = (fieldName: string): void => {

  runDescribe(fieldName, (): void => {

    runValidTest(fieldName, (): void => {

      const tcModel = new TCModel();
      const testDate = new Date();

      tcModel[fieldName] = testDate;

      expect((tcModel[fieldName] as Date).getTime(), 'should be rounded to deciseconds')
        .to.equal(Math.round(testDate.getTime()/100));

    });

  });

};
const testBoolean = (fieldName: string): void => {

  runDescribe(fieldName, (): void => {

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

  runDescribe(fieldName, (): void => {

    // eslint-disable-next-line
    const vendorlistJson = require('../dev/vendorlist.json');
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

describe('TCModel', (): void => {

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
    expect(tcModel.vendorListVersion).to.be.undefined;
    expect(tcModel.policyVersion).to.equal(2);
    expect(tcModel.gvl).to.be.undefined;

  });

  it('should construct a TCModel with a GVL argument', (): void => {

    // eslint-disable-next-line
    const vendorlistJson = require('../dev/vendorlist.json');
    const gvl: GVL = new GVL(vendorlistJson);

    expect((): void => {

      // disabling because it's upset that I'm not doing anything with this
      // eslint-disable-next-line
      const tcModel: TCModel = new TCModel(gvl);

    }).to.not.throw();

    const tcModel = new TCModel(gvl);

    expect(tcModel.policyVersion, 'policyVersion should be picked up from gvl')
      .to.equal(gvl.tcfPolicyVersion);
    expect(tcModel.vendorListVersion, 'vendorListVersion should be picked up from gvl')
      .to.equal(gvl.vendorListVersion);
    expect(tcModel.gvl, 'should save and make accessible the gvl')
      .to.equal(gvl);

  });

  it('should throw an error if gvl is attempted to be set more than once', (): void => {

    // eslint-disable-next-line
    const vendorlistJson = require('../dev/vendorlist.json');
    const gvl: GVL = new GVL(vendorlistJson);

    expect((): void => {

      // disabling because it's upset that I'm not doing anything with this
      // eslint-disable-next-line
      const tcModel: TCModel = new TCModel(gvl);

    }).to.not.throw();

    const tcModel = new TCModel(gvl);

    expect((): void => {

      tcModel.gvl = gvl;

    }).to.throw();

  });

});

testInt('cmpId', 2);
testInt('cmpVersion', 0);
testInt('consentScreen', 0);

testDate('created');
testDate('lastUpdated');

testBoolean('isServiceSpecific');
testBoolean('useNonStandardStacks');

testInstanceOf('purposeConsents', Vector);
testInstanceOf('purposeLITransparency', Vector);

testInstanceOf('vendorConsents', Vector);
testInstanceOf('vendorLegitimateInterest', Vector);
testInstanceOf('specialFeatureOptIns', Vector);

runDescribe('consentLanguage', (): void => {

  const shouldBeOk: (value: string) => void = (value: string): void => {

    it(`should be ok with ${value}`, (): void => {

      const tcModel = new TCModel();

      expect((): void => {

        tcModel.consentLanguage = value;

      }).not.to.throw();

      expect(tcModel.consentLanguage).to.equal(value);

    });

  };
  const shouldBeNotOk: (value: string) => void = (value: string): void => {

    it(`should not be ok with ${value}`, (): void => {

      const tcModel = new TCModel();

      expect((): void => {

        tcModel.consentLanguage = value;

      }).to.throw();

      expect(tcModel.consentLanguage).to.be.undefined;

    });

  };

  shouldBeOk('aa');
  shouldBeOk('zz');
  shouldBeOk('AA');
  shouldBeOk('ZZ');

  // too long
  shouldBeNotOk('aaa');

  // too short
  shouldBeNotOk('a');

  shouldBeNotOk('@#');
  shouldBeNotOk('15');
  shouldBeNotOk('{{');


});

runDescribe('version', (): void => {


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
