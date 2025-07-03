import {makeRandomInt} from './makeRandomInt.js';

export function makeRandomString(length: number, asciiStart = 0, asciiEnd=127): string {

  let retr = '';

  for (let i = 0; i < length; i++) {

    retr += String.fromCharCode(makeRandomInt(asciiStart, asciiEnd));

  }

  return retr;

}
