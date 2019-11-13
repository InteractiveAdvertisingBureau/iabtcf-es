import {Vector} from '@iabtcf/core';

export interface StringBoolVector {
  [id: string]: string;
}

/**
 * Creates a string bool vector with a value for each id where each value is '1' if its id is in the passed in vector
 * @param {string[]} ids
 * @param {Vector} vector
 * @return {StringBoolVector}
 */
export const createStringBoolVector = function(ids: string[], vector: Vector): StringBoolVector {

  return ids.reduce<StringBoolVector>((map, obj) => {

    map[obj] = vector.has(+obj) ? '1' : '0';
    return map;

  }, {});

};
