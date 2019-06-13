import {expect} from 'chai';
import * as sinon from 'sinon';
import {GVL} from '../src/GVL';
import {XMLHttpTestTools} from './support/XMLHttpTestTools';

// eslint-disable-next-line
const vendorlistJson = require('../dev/vendorlist.json');

describe('GVL', (): void => {

  beforeEach(XMLHttpTestTools.beforeEach);
  afterEach(XMLHttpTestTools.afterEach);

  it('Should fail to build without setting baseUrl', (): void => {

    // calls constructor
    expect((): void => {

      new GVL();

    }).to.throw('must specify GVL.baseUrl before loading GVL json');

  });

  it('Should propogate all values with passed in json', (): void => {

    const gvl: GVL = new GVL(vendorlistJson);

    expect(gvl.gvlSpecificationVersion, 'gvlSpecificationVersion should match')
      .to.equal(vendorlistJson.gvlSpecificationVersion);
    expect(gvl.vendorListVersion, 'vendorListVersion should match').to.equal(vendorlistJson.vendorListVersion);
    expect(gvl.tcfPolicyVersion, 'tcfPolicyVersion should match').to.equal(vendorlistJson.tcfPolicyVersion);
    expect((gvl.lastUpdated as Date).getTime(), 'lastUpdated  should match')
      .to.equal((new Date(vendorlistJson.lastUpdated).getTime()));
    expect(gvl.purposes, 'purposes should match').to.deep.equal(vendorlistJson.purposes);
    expect(gvl.specialPurposes, 'specialPurposes should match').to.deep.equal(vendorlistJson.specialPurposes);
    expect(gvl.features, 'features should match').to.deep.equal(vendorlistJson.features);
    expect(gvl.specialFeatures, 'specialFeatures should match').to.deep.equal(vendorlistJson.specialFeatures);
    expect(gvl.vendors, 'vendors should match').to.deep.equal(vendorlistJson.vendors);
    expect(gvl.stacks, 'stacks should match').to.deep.equal(vendorlistJson.stacks);

  });

  it('Should get latest GVL if nothing is passed to the constructor', (): void => {

    const gvl: GVL = new GVL(vendorlistJson);

  });

});
