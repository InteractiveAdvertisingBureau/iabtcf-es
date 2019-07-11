import {expect} from 'chai';
import {Vector} from '../../src/model/structures/Vector';

export function run(): void {

  describe('Vector', (): void => {

    it('should set ids array passed into constructor', (): void => {

      const idAr: number[] = [1, 3, 5, 7, 9, 12, 15];
      const vector: Vector = new Vector(idAr);

      idAr.forEach((id: number): void => {

        expect(vector.has(id)).to.be.true;

      });

    });
    it('should set a single id using the set method', (): void => {

      const vector: Vector = new Vector();
      const id = 2;

      vector.set(id);

      expect(vector.has(id)).to.be.true;
      expect(vector.maxId).to.equal(id);

    });

    it('should set ids array passed into set method', (): void => {

      const idAr: number[] = [1, 3, 5, 7, 9, 12, 15];
      const vector: Vector = new Vector();

      vector.set(idAr);

      idAr.forEach((id: number): void => {

        expect(vector.has(id)).to.be.true;

      });

    });
    it('should unset a single id using the unset method', (): void => {

      const vector: Vector = new Vector();
      const id = 2;

      vector.set(id);

      expect(vector.has(id)).to.be.true;
      expect(vector.maxId).to.equal(id);

      vector.unset(id);

      expect(vector.has(id)).to.be.false;
      expect(vector.maxId).to.equal(0);

    });

    it('should unset ids array passed into unset method', (): void => {

      const idAr: number[] = [1, 3, 5, 7, 9, 12, 15];
      const vector: Vector = new Vector();

      vector.set(idAr);

      idAr.forEach((id: number): void => {

        expect(vector.has(id)).to.be.true;

      });

      const lastValue = idAr[idAr.length - 1];
      const secondToLastValue = idAr[idAr.length - 2];
      const firstValue = idAr[0];

      vector.unset([lastValue, firstValue]);
      expect(vector.maxId).to.equal(secondToLastValue);

      expect(vector.has(firstValue)).to.be.false;
      expect(vector.has(lastValue)).to.be.false;
      expect(vector.has(secondToLastValue)).to.be.true;

    });

    it('forEach method should traverse in order sequentially from 1 to maxVendorId', (): void => {

      const idAr: number[] = [1, 3, 5, 7, 9, 12, 15];
      const vector: Vector = new Vector();

      vector.set(idAr);

      let i = 1;
      let lastId = 0;

      vector.forEach((value: boolean, id: number): void => {

        expect(id).to.equal(i);
        lastId = id;

        // if we sent it in it should have been set
        if (idAr.includes(id)) {

          expect(vector.has(id)).to.be.true;

        }
        i++;

      });

      expect(i).to.equal(Math.max(...idAr) + 1);
      expect(vector.maxId).to.equal(lastId);
      expect(vector.maxId).to.equal(Math.max(...idAr));

    });


  });

}
