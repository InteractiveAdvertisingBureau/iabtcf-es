import {expect} from 'chai';
import {CoreFieldSequence} from '../src/encoder';
import {
  TCString,
  TCModel,
  GVL,
} from '../src';

type MinimalModelOptions = {
  versions?: Number
}

const doEncode = (options = {}) => {

  const tcString = new TCString();
  const model = getMinimalModel(options);
  return tcString.encode(model);

}

const truncDate = (date: Date) => Math.round(date.getTime() / 100) * 100;

const getMinimalModel = (customOptions: MinimalModelOptions = {}) => {
  const options = {
    version: 2,
    ...customOptions
  };

  const vendorlistJson = require('../dev/vendorlist.json');
  const gvl: GVL = new GVL(vendorlistJson);
  
  const model = new TCModel(gvl);
  model.cmpId = 123;
  model.cmpVersion = 1;
  model.consentLanguage = 'en';
  model.version = options.version;
  return model;

};

const compareModels = (actual: TCModel, expected: TCModel) => {
  
  const compareProp = (propName: string, transform = _ => _) => {
    
    const actualValue = transform(actual[propName]);
    const expectedValue = transform(expected[propName]);
    expect(actualValue, `Error while comparing '${propName}'`).to.eq(expectedValue);

  }

  compareProp('cmpId');
  compareProp('cmpVersion');
  compareProp('consentLanguage');
  compareProp('consentScreen');
  compareProp('created', truncDate);
  compareProp('lastUpdated', truncDate);
  compareProp('policyVersion');
  compareProp('useNonStandardStacks');
  compareProp('version');

}

describe('TCString', (): void => {

  describe('.encode(tcModel)', (): void => {
    
    it('does not throw if a valid TCModel is passed', (): void => {
      
      expect(doEncode).not.to.throw();

    });

    it('returns a string with 4 segments when TCModel version is 2', () => {

      const encodedString = doEncode();

      expect(encodedString.split('.')).to.be.lengthOf(4);

    });

    xit('WIP: currently fails. returns a string with only 1 segment when tCModel version is 1', () => {

      const encodedString = doEncode({ version: 1 });

      expect(encodedString.split('.')).to.be.lengthOf(1);

    });

  });

  describe('.decode(encodedString)', () => {

    it('returns an equivalent model if encoded and decoded', () => {

      const tcString = new TCString();
      const model = getMinimalModel();
      const encodedString = tcString.encode(model);
      const decodedModel = tcString.decode(encodedString);
      
      compareModels(decodedModel, model);

    });

  });

});
