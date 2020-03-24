import {expect} from 'chai';
import {TCString, TCModel} from '../src';
import {Segment} from '../src/model';
import {TCModelFactory} from '@iabtcf/testing';

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

  it('should unset purposeLegitimateInterests 1 if it is set', (): void => {

    const tcModel = getTCModel();
    tcModel.purposeLegitimateInterests.set(1);

    expect(tcModel.purposeLegitimateInterests.has(1), 'purposeLegitimateInterests.has(1)').to.be.true;

    const encodedString = TCString.encode(tcModel);
    const newModel = TCString.decode(encodedString);

    expect(newModel.purposeLegitimateInterests.has(1), 'newModel.purposeLegitimateInterests.has(1)').to.be.false;

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

  it('should add a segment to a model on decode if a model is passed in', (): void => {

    const tcModel = getTCModel();

    const publisherTC = TCString.encode(tcModel, {
      segments: [Segment.PUBLISHER_TC],
    });
    const core = TCString.encode(tcModel, {
      segments: [Segment.CORE],
    });

    const newModel = new TCModel();

    TCString.decode(core, newModel);
    expect(newModel.vendorConsents.size, 'vendorConsents.size').to.equal(tcModel.vendorConsents.size);
    expect(newModel.vendorLegitimateInterests.size, 'vendorLegitimateInterests.size').to.equal(tcModel.vendorLegitimateInterests.size);
    expect(newModel.purposeConsents.size, 'purposeConsents.size').to.equal(tcModel.purposeConsents.size);
    expect(newModel.purposeLegitimateInterests.size, 'purposeLegitimateInterests.size').to.equal(tcModel.purposeLegitimateInterests.size);

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
