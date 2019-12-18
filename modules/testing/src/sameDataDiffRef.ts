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

    const item1 = obj1[key];
    const item2 = obj2[key];
    const itsType = typeof item1;
    
    expect(typeof item2).to.equal(itsType);

    if (item1 === undefined && item2 === undefined) {

      continue;

    }

    if (isPrimitive(item1)) {

      expect(item2, `${objName}:${key}`).to.equal(item1);

    } else {

      if (item1 instanceof Date) {

        expect(item1.getTime()).to.equal(item2.getTime());

      } else {

        sameDataDiffRef(item1, item2, key);

      }

    }

  }

};
