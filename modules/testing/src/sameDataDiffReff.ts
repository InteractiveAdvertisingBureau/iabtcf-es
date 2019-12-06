import {expect} from 'chai';
import {isPrimitive} from './isPrimitive';

export const sameDataDiffRef = (obj1: object, obj2: object, objName: string): void => {

  expect(typeof obj1, `objects are not both ${objName}s!`).to.equal(typeof obj2);
  expect(obj1, 'these are the same reference...').not.to.equal(obj2);

  const keySet = new Set<string>(Object.keys(obj1).concat(Object.keys(obj2)));

  for (const key of keySet) {

    expect(obj1[key]).to.not.be.undefined;
    expect(obj2[key]).to.not.be.undefined;

    if (isPrimitive(obj1[key])) {

      expect(obj2[key], `${key} is not equal`).to.equal(obj1[key]);

    } else {

      if (typeof obj1[key].forEach === 'function') {

        obj1[key].forEach((value: unknown, key2: string): void => {

          if (isPrimitive(value)) {

            expect(obj2[key2], `${key2} is not equal`).to.equal(obj1[key2]);

          } else {

            sameDataDiffRef(obj1[key2], obj2[key2], key2);

          }

        });

      } else {

        sameDataDiffRef(obj1[key], obj2[key], key);
        // expect(obj2[key], `${key} is not deep equal`).to.deep.equal(obj1[key]);

      }

    }

  }

};
