import {expect} from 'chai';
import {
  TCString,
  TCModel,
  GVL,
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

      const tcString = new TCString();

      resolve(tcString.encode(model));

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

      const tcString = new TCString();
      const model = getMinimalModel();

      model.gvl.readyPromise.then((): void => {

        const encodedString = tcString.encode(model);
        const decodedModel = tcString.decode(encodedString);

        compareModels(decodedModel, model);
        done();

      });

    });

  });

});
