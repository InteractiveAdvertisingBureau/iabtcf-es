import {Vector} from '@iabtcf/core';
import {BoolString} from '../types';

export interface StringBoolVector {
  [id: string]: BoolString;
}

/**
 * Creates a string bool vector with a value for each id where each value is '1' if its id is in the passed in vector
 * @param {string[]} ids
 * @param {Vector} vector
 * @return {StringBoolVector}
 */
export const createStringBoolVector = function(ids: string[], vector: Vector): StringBoolVector {

  const stringBoolVector = {};

  vector.forEach((value: boolean, id: number): void => {

    stringBoolVector[id.toString(10)] = +value.toString();

  });

  return stringBoolVector;

};
