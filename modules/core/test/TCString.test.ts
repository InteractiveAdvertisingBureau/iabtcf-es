import {expect} from 'chai';
import {TCString} from '../src/TCString';
import {TCModel} from '../src/TCModel';
import {GVL} from '../src/GVL';

/*
describe('TCString', (): void => {

  // eslint-disable-next-line
  const vendorlistJson = require('../dev/vendorlist.json');
  const gvl: GVL = new GVL(vendorlistJson);

  it('should encode into a string', (): void => {

    const tcModel: TCModel = new TCModel(gvl);
    let encoded = '';

    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();

    const encodeIt = (): void => {

      encoded = TCString.encode(tcModel);

    };

    expect(tcModel.isValid(), 'input model is valid').to.be.true;
    expect(encodeIt).not.to.throw();

    expect(encoded).to.not.equal('');

  });

  it('TCModel->String->TCModel and should be equal', (): void => {

    const tcModel: TCModel = new TCModel(gvl);
    let encoded = '';

    tcModel.cmpId = 23;
    tcModel.cmpVersion = 1;

    // full consent!
    tcModel.setAll();

    const encodeIt = (): void => {

      encoded = TCString.encode(tcModel);

    };
    const decodeIt = (): TCModel => {

      return TCString.decode(encoded);

    };

    expect(tcModel.isValid(), 'input model is valid').to.be.true;

    expect(encodeIt).not.to.throw();
    expect(decodeIt).not.to.throw();

    encodeIt();
    const decodedModel: TCModel = decodeIt();

    Encodings.order[1].forEach((key: string): void => {

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
  */

