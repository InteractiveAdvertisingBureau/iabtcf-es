/*
import {expect} from 'chai';
import {Encoder} from '../src/tcstring/Encoder';
import {TCModel} from '../src/TCModel';
import {GVL} from '../src/GVL';

// eslint-disable-next-line
const vendorlistJson = require('../dev/vendorlist.json');

describe('IntEncoder', (): void => {

  it('should work', (): void => {

    const gvl: GVL = new GVL(vendorlistJson);
    const tcModel: TCModel = new TCModel(gvl);

    tcModel.cmpId = 2;
    tcModel.cmpVersion = 1;
    tcModel.consentLanguage = 'en';

    const encoder: Encoder = new Encoder();

    const tcString: string = encoder.encode(tcModel);

    expect(tcString).to.equal('');

  });

});
*/
