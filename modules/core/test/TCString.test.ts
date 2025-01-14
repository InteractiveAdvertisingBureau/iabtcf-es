import {expect} from 'chai';
import {TCString, TCModel} from '../src';
import {Segment} from '../src/model';
import {TCModelFactory} from '@iabtechlabtcf/testing';

describe('TCString', (): void => {

  const getTCModel = (withoutGVL = false): TCModel => {

    let tcModel: TCModel;

    if (withoutGVL) {

      tcModel = TCModelFactory.noGVL() as unknown as TCModel;

    } else {

      tcModel = TCModelFactory.withGVL() as unknown as TCModel;

    }

    return tcModel;

  };

  it('should throw an encoding error if no GVL is set', (): void => {

    const doEncode = (): void => {

      TCString.encode(getTCModel(true));

    };

    expect(doEncode, 'encode').to.throw();

  });

  it('should unset purposeLegitimateInterests 1, 3, 4, 5 & 6 if it is set', (): void => {

    const tcModel = getTCModel();
    tcModel.purposeLegitimateInterests.set([1, 3, 4, 5, 6]);

    expect(tcModel.purposeLegitimateInterests.has(1), 'purposeLegitimateInterests.has(1)').to.be.true;
    expect(tcModel.purposeLegitimateInterests.has(3), 'purposeLegitimateInterests.has(3)').to.be.true;
    expect(tcModel.purposeLegitimateInterests.has(4), 'purposeLegitimateInterests.has(4)').to.be.true;
    expect(tcModel.purposeLegitimateInterests.has(5), 'purposeLegitimateInterests.has(5)').to.be.true;
    expect(tcModel.purposeLegitimateInterests.has(6), 'purposeLegitimateInterests.has(6)').to.be.true;

    const encodedString = TCString.encode(tcModel);
    const newModel = TCString.decode(encodedString);

    expect(newModel.purposeLegitimateInterests.has(1), 'newModel.purposeLegitimateInterests.has(1)').to.be.false;
    expect(newModel.purposeLegitimateInterests.has(3), 'newModel.purposeLegitimateInterests.has(3)').to.be.false;
    expect(newModel.purposeLegitimateInterests.has(4), 'newModel.purposeLegitimateInterests.has(4)').to.be.false;
    expect(newModel.purposeLegitimateInterests.has(5), 'newModel.purposeLegitimateInterests.has(5)').to.be.false;
    expect(newModel.purposeLegitimateInterests.has(6), 'newModel.purposeLegitimateInterests.has(6)').to.be.false;

  });

  it('should set all vendorsDisclosed in the GVL when isServiceSpecific is false', (): void => {

    const tcModel = getTCModel();

    tcModel.vendorsDisclosed.empty();
    tcModel.isServiceSpecific = false;

    const encodedString = TCString.encode(tcModel);
    const newModel = TCString.decode(encodedString);

    const vIds: number[] = Object.keys(tcModel.gvl.vendors).map((vId: string): number => parseInt(vId, 10));

    vIds.forEach((vendorId: number): void => {

      expect(newModel.vendorsDisclosed.has(vendorId), `newModel.vendorsDisclosed.has(${vendorId})`).to.be.true;
      expect(tcModel.vendorsDisclosed.has(vendorId), `tcModel.vendorsDisclosed.has(${vendorId})`).to.be.false;

    });

  });

  it('should produce only a publisherTC segment if the encoding option is passed', (): void => {

    const tcModel = getTCModel();

    const encodedString = TCString.encode(tcModel, {
      segments: [Segment.PUBLISHER_TC],
    });

    expect(~encodedString.indexOf('.'), '~encodedString.indexOf(".")').to.equal(0);

    const newModel = TCString.decode(encodedString);
    expect(newModel.vendorConsents.size, 'vendorConsents.size').to.equal(0);
    expect(newModel.vendorLegitimateInterests.size, 'vendorLegitimateInterests.size').to.equal(0);
    expect(newModel.purposeConsents.size, 'purposeConsents.size').to.equal(0);
    expect(newModel.purposeLegitimateInterests.size, 'purposeLegitimateInterests.size').to.equal(0);

    tcModel.publisherConsents.forEach((value: boolean, id: number): void => {

      expect(newModel.publisherConsents.has(id), `publisherConsents.has(${id})`).to.equal(value);

    });

    tcModel.publisherLegitimateInterests.forEach((value: boolean, id: number): void => {

      expect(newModel.publisherLegitimateInterests.has(id), `publisherLegitimateInterests.has(${id})`).to.equal(value);

    });

    tcModel.publisherCustomConsents.forEach((value: boolean, id: number): void => {

      expect(newModel.publisherCustomConsents.has(id), `publisherCustomConsents.has(${id})`).to.equal(value);

    });

    tcModel.publisherCustomLegitimateInterests.forEach((value: boolean, id: number): void => {

      expect(newModel.publisherCustomLegitimateInterests.has(id), `publisherCustomLegitimateInterests.has(${id})`).to.equal(value);

    });

  });


  // The next tests require that we use GVL tcf ver 2 and gvl version 51. If we update the tests to a newer GVL
  // this test and the test against specific vendors that only set special purposes or only purposes and special
  // purposes will need to be updated.
  it('should use vendor list tcf ver 2 and gvl version 51', (): void => {
    const gvl = getTCModel().gvl;

    expect(gvl.gvlSpecificationVersion, `gvl.gvlSpecificationVersion === 2`).to.equal(2);
    expect(gvl.vendorListVersion, `gvl.vendorListVersion == 51`).to.equal(51);
  });

  it('should add a segment to a model on decode if a model is passed in', (): void => {

    const tcModel = getTCModel();
    const gvl = tcModel.gvl;
    const publisherTC = TCString.encode(tcModel, {
      segments: [Segment.PUBLISHER_TC],
    });
    const core = TCString.encode(tcModel, {
      segments: [Segment.CORE],
    });
    const newModel = new TCModel();

    TCString.decode(core, newModel);

    tcModel.vendorConsents.forEach((value: boolean, id: number): void => {

      const vendor = gvl.vendors[id];

      if (!vendor || (value && vendor.purposes.length === 0)) {

        expect(newModel.vendorConsents.has(id), `vendorConsents.has(${id})`).to.be.false;

      } else {

        expect(newModel.vendorConsents.has(id), `vendorConsents.has(${id})`).to.equal(value);

      }

    });

    tcModel.vendorLegitimateInterests.forEach((value: boolean, id: number): void => {

      const vendor = gvl.vendors[id];

      if (!vendor || (value && vendor.legIntPurposes.length === 0)) {

        if (vendor && vendor.purposes.length === 0 && vendor.specialPurposes.length > 0) {

          expect(newModel.vendorLegitimateInterests.has(id), `vendorLegitimateInterests.has(${id})`).to.be.true;

        } else if (vendor && vendor.purposes.length > 0 && vendor.specialPurposes.length > 0) {

            expect(newModel.vendorLegitimateInterests.has(id), `vendorLegitimateInterests.has(${id})`).to.be.true;
  
        } else {

          expect(newModel.vendorLegitimateInterests.has(id), `vendorLegitimateInterests.has(${id})`).to.be.false;

        }

      } else {

        expect(newModel.vendorLegitimateInterests.has(id), `vendorLegitimateInterests.has(${id})`).to.equal(value);

      }

    });

    tcModel.purposeConsents.forEach((value: boolean, id: number): void => {

      expect(newModel.purposeConsents.has(id), `purposeConsents.has(${id})`).to.equal(value);

    });

    tcModel.purposeLegitimateInterests.forEach((value: boolean, id: number): void => {

      if ( (id === 1 || id >= 3 && id <= 6) && value ) {

        // id 1, 3, 4, 5 & 6 gets unset on encoding for legitimate interests

        expect(newModel.purposeLegitimateInterests.has(id), `purposeLegitimateInterests.has(${id})`).to.be.false;

      } else {

        expect(newModel.purposeLegitimateInterests.has(id), `purposeLegitimateInterests.has(${id})`).to.equal(value);

      }

    });

    tcModel.vendorLegitimateInterests.forEach((value: boolean, id: number): void => {
      // gvl spec ver 2, gvl ver 51: vendor ids 415, 612 1n 615 have special purposes only declared. LI needs to be true
      if ( (id === 415 || id === 612 || id === 615 ) && value ) {
        expect(newModel.vendorLegitimateInterests.has(id), `vendorLegitimateInterestsForSpecialPurpose.has(${id})`).to.be.true;
      } 

      // use case: The number of Vendors that have declared only purposes based on consent (no LI) + at least one SP
      // sample set in v2-51: ids: 545, 553, 565, 570
      if ( (id === 545 || id === 553 || id === 565 || id === 570) && value ) {
        expect(newModel.vendorLegitimateInterests.has(id), `vendorConsentSetAndLegitimateInterestsForSpecialPurpose.has(${id})`).to.be.true;
      }
    });

    TCString.decode(publisherTC, newModel);

    tcModel.publisherConsents.forEach((value: boolean, id: number): void => {

      expect(newModel.publisherConsents.has(id), `publisherConsents.has(${id})`).to.equal(value);

    });

    tcModel.publisherLegitimateInterests.forEach((value: boolean, id: number): void => {

      expect(newModel.publisherLegitimateInterests.has(id), `publisherLegitimateInterests.has(${id})`).to.equal(value);

    });

    tcModel.publisherCustomConsents.forEach((value: boolean, id: number): void => {

      expect(newModel.publisherCustomConsents.has(id), `publisherCustomConsents.has(${id})`).to.equal(value);

    });

    tcModel.publisherCustomLegitimateInterests.forEach((value: boolean, id: number): void => {

      expect(newModel.publisherCustomLegitimateInterests.has(id), `publisherCustomLegitimateInterests.has(${id})`).to.equal(value);

    });

  });

});
