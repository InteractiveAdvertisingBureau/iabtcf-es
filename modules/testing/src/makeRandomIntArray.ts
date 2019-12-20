import {makeRandomInt} from './makeRandomInt';

export function makeRandomIntArray(intsBetweenStart: number, intsBetweenEnd: number, length?: number): number[] {

  const intSet = new Set<number>();
  let retr:number[] = [];

  if(length !== undefined && intsBetweenEnd - intsBetweenStart < length) {

    throw new Error(`Cannot create a unique integer set between ${intsBetweenStart} and ${intsBetweenEnd} if the length is ${length}`);

 } else {

   if(length !== undefined && length > 0) {

      length = makeRandomInt(intsBetweenStart, intsBetweenEnd);
      while(intSet.size != length) {
        intSet.add(makeRandomInt(intsBetweenStart, intsBetweenEnd));
      }
      retr = Array.from(intSet);
   }
 }

  return  retr;

}
