import {makeRandomInt} from './makeRandomInt.js';

export function makeRandomIntArray(intsBetweenStart: number, intsBetweenEnd: number, length?: number): number[] {

  const intSet = new Set<number>();
  let retr: number[] = [];

  if (length !== undefined && intsBetweenEnd - intsBetweenStart <= length) {

    while (intSet.size != length) {

      intSet.add(makeRandomInt(intsBetweenStart, intsBetweenEnd));

    }

    retr = Array.from(intSet);

  } else {

    length = makeRandomInt(intsBetweenStart, intsBetweenEnd);

    while (intSet.size != length) {

      intSet.add(makeRandomInt(intsBetweenStart, intsBetweenEnd));

    }

    retr = Array.from(intSet);

  }

  return retr;

}
