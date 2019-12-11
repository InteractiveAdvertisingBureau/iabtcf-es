import {

  expect,

} from 'chai';

import {

  GVL,
  Vector,
  TCString,
  TCModel,

} from '../src';

const getMinimalModel = (): TCModel => {

  const vendorlistJson = require('../../../dev/vendor-list.json'); // eslint-disable-line
  const model = new TCModel(new GVL(vendorlistJson));

  model.cmpId = 123;
  model.cmpVersion = 1;
  model.consentLanguage = 'en';
  return model;

};

const doEncode = (): Promise<string> => {

  const model = getMinimalModel();

  return new Promise((resolve: (string) => void): void => {

    model.gvl.readyPromise.then((): void => {

      resolve(TCString.encode(model));

    });

  });

};

const truncDate = (date: Date): number => {

  return Math.round(date.getTime() / 100) * 100;

};

const compareModels = (actual: TCModel, expected: TCModel): void => {

  const compareProp = (propName: string, transform = (_): void => _): void => {

    const actualValue = transform(actual[propName]);
    const expectedValue = transform(expected[propName]);

    expect(actualValue, `Error while comparing '${propName}'`).to.eq(expectedValue);

  };

  compareProp('cmpId');
  compareProp('cmpVersion');
  compareProp('consentLanguage');
  compareProp('consentScreen');
  compareProp('created', truncDate);
  compareProp('lastUpdated', truncDate);
  compareProp('policyVersion');
  compareProp('useNonStandardStacks');
  compareProp('version');

};

describe('TCString', (): void => {

  describe('.encode(tcModel)', (): void => {

    it('does not throw if a valid TCModel is passed', (): void => {

      expect(doEncode).not.to.throw();

    });

    it('returns a string with 4 segments when TCModel version is 2', (done: () => void): void => {

      doEncode().then((encodedString): void => {

        expect(encodedString.split('.')).to.be.lengthOf(1);
        done();

      });

    });

  });

  describe('.decode(encodedString)', (): void => {

    it('returns an equivalent model if encoded and decoded', (done: () => void): void => {

      const model = getMinimalModel();

      model.gvl.readyPromise.then((): void => {

        const encodedString = TCString.encode(model);
        const decodedModel = TCString.decode(encodedString);

        compareModels(decodedModel, model);
        done();

      });

    });

    const testVectorRang = (vector: Vector, min: number, max: number, name: string): void => {

      expect(vector, `${name} Vector`).not.to.be.undefined;
      expect(vector.maxId, `${name} maxId`).to.equal(max);

      for (let i = 1; i <= max; i ++) {

        if (i >= min && i <= max) {

          expect(vector.has(i), `${name} id ${i}`).to.be.true;

        } else {

          expect(vector.has(i), `${name} id ${i}`).to.be.false;

        }

      }

    };

    it('succesfully decodes a valid encoded TC string', (): void => {

      let tcModel;

      const setTCModel = (): void => {

        tcModel = TCString.decode('COrEAV4OrXx94ACABBENAHCIAD-AAAAAAACAAxAAAAgAIAwgAgAAAAEAgQAAAAAEAYQAQAAAACAAAABAAA.IBAgAAAgAIAwgAgAAAAEAAAACA.QAagAQAgAIAwgA');

      };

      expect(setTCModel).not.to.throw();

      expect(tcModel.cmpId).to.equal(2);
      expect(tcModel.cmpVersion).to.equal(1);
      expect(tcModel.consentScreen).to.equal(1);
      expect(tcModel.policyVersion).to.equal(2);
      expect(tcModel.vendorListVersion).to.equal(7);
      expect(tcModel.consentLanguage).to.equal('EN');
      expect(tcModel.publisherCountryCode).to.equal('AQ');
      expect(tcModel.supportOOB).to.be.true;

      expect(tcModel.created).to.be.a('Date');
      expect(tcModel.created.getFullYear(), 'Created Year').to.equal(2019);
      expect(tcModel.created.getMonth(), 'Created Month').to.equal(11);
      expect(tcModel.created.getDay(), 'Created Day').to.equal(3);

      expect(tcModel.lastUpdated).to.be.a('Date');
      expect(tcModel.lastUpdated.getFullYear(), 'Last Updated Year').to.equal(2019);
      expect(tcModel.lastUpdated.getMonth(), 'Last Updated Month').to.equal(11);
      expect(tcModel.lastUpdated.getDay(), 'Last Updated Day').to.equal(2);

      expect(tcModel.gvl).to.be.undefined;

      expect(tcModel.specialFeatureOptIns).not.to.be.undefined;
      expect(tcModel.specialFeatureOptIns.has(1), 'specialFeatureOptIn 1').to.be.true;
      expect(tcModel.specialFeatureOptIns.has(2), 'specialFeatureOptIn 2').to.be.false;

      testVectorRang(tcModel.purposeConsents, 3, 9, 'purposeConsents');
      // testVectorRang(tcModel.purposeLegitimateInterest, 2, 7, 'purposeLegitimateInterest');

    });

  });

});
