import {Vector} from '@iabtcf/core';

export interface BooleanVector {
  [id: string]: boolean;
}

/**
 * Creates a boolean vector with a value for each id where each value is true if its id is in the passed in vector
 * @param {string[]} ids
 * @param {Vector} vector
 * @return {BooleanVector}
 */
export const createBooleanVector = function(ids: string[], vector: Vector): BooleanVector {

  return ids.reduce<BooleanVector>((map, obj): BooleanVector => {

    map[obj] = vector.has(+obj);
    return map;

  }, {});

};
