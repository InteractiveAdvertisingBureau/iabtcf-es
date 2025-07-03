import {expect} from 'chai';
import {isPrimitive} from './isPrimitive.js';

export const sameDataDiffRef = (obj1: object, obj2: object, objName: string, ignoreKeys?: string[]): void => {

  if (obj1 === undefined && obj2 === undefined) {

    return;

  }

  expect(typeof obj1, `typeof ${objName}`).to.equal(typeof obj2);
  expect(obj1, objName).not.to.equal(obj2);

  const keySet = new Set<string>(
    Object.keys(obj1)
      .concat(Object.keys(obj2))
    /**
     * filter out all of the keys that end with an underscore since those are
     * private members
     */
      .filter((key: string) => (key.indexOf('_') !== key.length - 1)),
  );

  if (Array.isArray(ignoreKeys)) {

    ignoreKeys.forEach((item: string): void => {

      if (keySet.has(item)) {

        keySet.delete(item);

      }

    });

  }

  for (const key of keySet) {

    if (key.indexOf('_') !== key.length - 1) {

      const item1 = obj1[key];
      const item2 = obj2[key];
      const itsType = typeof item1;

      expect(typeof item2, `typeof ${objName}->${key}`).to.equal(itsType);

      if (item1 === undefined && item2 === undefined) {

        continue;

      }

      if (isPrimitive(item1)) {

        expect(item2, `${objName}->${key}`).to.equal(item1);

      } else {

        if (item1 instanceof Date) {

          const time1 = item1.getTime();
          const time2 = item2.getTime();
          // should be within the 200 milisecond range
          expect(time2, `${objName}->${key}`).to.be.within(time1 - 100, time1 + 100);

        } else {

          sameDataDiffRef(item1, item2, key, ignoreKeys);

        }

      }

    }

  }

};
