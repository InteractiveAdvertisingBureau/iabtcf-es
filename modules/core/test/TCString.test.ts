import {expect} from 'chai';
import {CoreFieldSequence} from '../src/encoder';
import {
  TCString,
  TCModel,
  GVL,
} from '../src';

describe('TCString', (): void => {

  // eslint-disable-next-line
  const vendorlistJson = require('../dev/vendorlist.json');
  const gvl: GVL = new GVL(vendorlistJson);

  it('should encode into a string', (): void => {

    const tcModel: TCModel = new TCModel(gvl);
    const tcString: TCString = new TCString();
    let encoded = '';

    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();


    const encodeIt = (): void => {

      encoded = tcString.encode(tcModel);

    };

    expect(tcModel.isValid(), 'input model is valid').to.be.true;

    expect(encodeIt, 'encode should not throw an error').not.to.throw();
    expect(encoded, 'decode should not throw an error').to.not.equal('');

  });

  it('TCModel->String->TCModel and should be equal', (): void => {

    const tcModel: TCModel = new TCModel(gvl);
    const tcString: TCString = new TCString();
    let encoded = '';

    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();

    const encodeIt = (): void => {

      encoded = tcString.encode(tcModel);

    };
    const decodeIt = (): TCModel => {

      return tcString.decode(encoded);

    };

    expect(tcModel.isValid(), 'input model is valid').to.be.true;

    expect(encodeIt).not.to.throw();
    expect(decodeIt).not.to.throw();

    encodeIt();

    const decodedModel: TCModel = decodeIt();
    const coreFieldSequence: CoreFieldSequence = new CoreFieldSequence();

    coreFieldSequence['2'].forEach((key: string): void => {

      // the same in every way :-)
      // except dates
      if (key === 'lastUpdated' || key === 'created') {


        // should round of the last two digits
        expect(decodedModel[key].getTime(), `${key} should be equal`)
          .to.equal(Math.round(tcModel[key].getTime()/100)*100);


      } else {

        expect(decodedModel[key], `${key} should be equal`).to.deep.equal(tcModel[key]);

      }

    });


  });

});
