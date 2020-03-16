import {expect} from 'chai';
import {Vector, TCString, TCModel} from '../src';
import {TCModelFactory, sameDataDiffRef} from '@iabtcf/testing';

describe('TCString', (): void => {

  const getTCModel = (): TCModel => {

    return TCModelFactory.withGVL() as unknown as TCModel;

  };

  describe('.encode(tcModel)', (): void => {

    it('returns a string with 4 segments if isServiceSpecific=true, supportOOB = true, and tcModel.setAllVendorsAllowed()', (done: () => void): void => {

      const tcModel = getTCModel();
      tcModel.isServiceSpecific = false;
      tcModel.supportOOB = true;
      tcModel.setAllVendorsAllowed();

      const encodedStr = TCString.encode(tcModel);

      expect(encodedStr.split('.'), 'encodedStr.split(".")').to.be.lengthOf(4);
      done();

    });

  });

  describe('.decode(encodedString)', (): void => {

    it('returns an equivalent model if encoded and decoded, except for the added bitLength property', (done: () => void): void => {

      const tcModel = TCModelFactory.withGVL() as unknown as TCModel;
      const encodedString = TCString.encode(tcModel);
      const decodedModel = TCString.decode(encodedString);

      sameDataDiffRef(decodedModel, tcModel, 'TCModel', ['bitLength', 'customPurposes']);
      done();

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

    it('succesfully decodes a validly encoded TC string', (): void => {

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

      expect(tcModel.created).to.be.a('Date');
      expect(tcModel.created.getFullYear(), 'Created Year').to.equal(2019);
      expect(tcModel.created.getMonth(), 'Created Month').to.equal(11);
      expect(tcModel.created.getDay(), 'Created Day').to.equal(3);

      expect(tcModel.lastUpdated).to.be.a('Date');
      expect(tcModel.lastUpdated.getFullYear(), 'Last Updated Year').to.equal(2019);
      expect(tcModel.lastUpdated.getMonth(), 'Last Updated Month').to.equal(11);
      expect(tcModel.lastUpdated.getDay(), 'Last Updated Day').to.equal(2);

      expect(tcModel.gvl).to.be.undefined;

      expect(tcModel.specialFeatureOptins).not.to.be.undefined;
      expect(tcModel.specialFeatureOptins.has(1), 'specialFeatureOptIn 1').to.be.true;
      expect(tcModel.specialFeatureOptins.has(2), 'specialFeatureOptIn 2').to.be.false;

      testVectorRang(tcModel.purposeConsents, 3, 9, 'purposeConsents');

    });

  });

});
