import {expect} from 'chai';
import {GVL, TCModel, TCString} from '../src';
import {EncodingError} from '../src/errors';
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

  it('rejects default TCF v2 encoding of a globally scoped model', (): void => {

    const tcModel = model();

    expect((): void => {

      TCString.encode(tcModel);

    }).to.throw(EncodingError, 'isServiceSpecific must be true');
    expect(tcModel.isServiceSpecific).to.be.false;

  });

  [false, true].forEach((isForVendors: boolean): void => {

    it(`rejects global scope with isForVendors=${isForVendors}`, (): void => {

      expect((): void => {

        TCString.encode(model(), {isForVendors});

      }).to.throw(EncodingError, 'isServiceSpecific must be true');

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

  it('cannot bypass global-scope rejection with an explicit segment selection', (): void => {

    expect((): void => {

      TCString.encode(model(), {segments: [Segment.CORE]});

    }).to.throw(EncodingError, 'isServiceSpecific must be true');

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
