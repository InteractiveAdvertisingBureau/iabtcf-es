import {expect} from 'chai';
import {GVL, TCModel, TCString} from '../src';
import {Segment} from '../src/model';
import {GVLFactory} from '@iabtechlabtcf/testing';

describe('TCString global-scope encoding', (): void => {

  const model = (): TCModel => {

    const result = new TCModel(GVLFactory.getLatest() as unknown as GVL);

    result.cmpId = 2;
    result.cmpVersion = 1;
    result.isServiceSpecific = false;

    return result;

  };

  it('normalizes default TCF v2 encoding without mutating the original model', (): void => {

    const tcModel = model();

    expect(TCString.decode(TCString.encode(tcModel)).isServiceSpecific).to.be.true;
    expect(tcModel.isServiceSpecific).to.be.false;

  });

  [false, true].forEach((isForVendors: boolean): void => {

    it(`normalizes global scope and retains disclosed vendors with isForVendors=${isForVendors}`, (): void => {

      const tcModel = model();

      tcModel.vendorsDisclosed.set([2, 7]);

      const encoded = TCString.encode(tcModel, {isForVendors});
      const decoded = TCString.decode(encoded);

      expect(decoded.isServiceSpecific).to.be.true;
      expect(decoded.vendorsDisclosed.has(2)).to.be.true;
      expect(decoded.vendorsDisclosed.has(7)).to.be.true;
      expect(tcModel.isServiceSpecific).to.be.false;

    });

    it(`retains disclosed vendor IDs for service-specific encoding with isForVendors=${isForVendors}`, (): void => {

      const tcModel = model();

      tcModel.isServiceSpecific = true;
      tcModel.vendorsDisclosed.set([2, 7]);

      const encoded = TCString.encode(tcModel, {isForVendors});
      const decoded = TCString.decode(encoded);

      expect(encoded.split('.')).to.have.lengthOf(3);
      expect(decoded.isServiceSpecific).to.be.true;
      expect(decoded.vendorsDisclosed.has(2)).to.be.true;
      expect(decoded.vendorsDisclosed.has(7)).to.be.true;

    });

  });

  it('normalizes scope with an explicit segment selection', (): void => {

    const encoded = TCString.encode(model(), {segments: [Segment.CORE]});

    expect(encoded.split('.')).to.have.lengthOf(1);
    expect(TCString.decode(encoded).isServiceSpecific).to.be.true;

  });

  it('continues decoding historical globally scoped strings', (): void => {

    const decoded = TCString.decode('COwK6gaOwK6gaFmAAAENAPCAAAAAAAAAAAAAAAAAAAAA');

    expect(decoded.isServiceSpecific).to.be.false;
    expect(decoded.version).to.equal(2);

  });

  it('does not change explicitly requested legacy version 1 encoding', (): void => {

    const encoded = TCString.encode(model(), {version: 1});

    expect(TCString.decode(encoded).version).to.equal(1);

  });

});
