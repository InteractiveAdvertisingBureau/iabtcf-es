import {expect} from 'chai';
import {isPrimitive} from './isPrimitive';

export const sameDataDiffRef = (obj1: object, obj2: object, objName: string): void => {

  if (obj1 === undefined && obj2 === undefined) {

    return;

  }

  expect(typeof obj1, `typeof ${objName}`).to.equal(typeof obj2);
  expect(obj1).not.to.equal(obj2);

  const keySet = new Set<string>(Object.keys(obj1).concat(Object.keys(obj2)));

  for (const key of keySet) {

    if (obj1[key] === undefined && obj2[key] === undefined) {

      continue;

    }

    if (isPrimitive(obj1[key])) {

      expect(obj2[key], `${objName}:${key}`).to.equal(obj1[key]);

    } else {

      if (typeof obj1[key].forEach === 'function') {

        obj1[key].forEach((value: unknown, key2: string): void => {

          if (isPrimitive(value)) {

            expect(obj2[key2], `${objName}:${key2}`).to.equal(obj1[key2]);

          } else {

            sameDataDiffRef(obj1[key2], obj2[key2], key2);

          }

        });

      } else {

        sameDataDiffRef(obj1[key], obj2[key], key);

      }

    }

  }

};
