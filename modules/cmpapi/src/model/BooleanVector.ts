import {IdBoolTuple, Vector} from '@iabtcf/core';

export interface BooleanVector {
  [id: string]: boolean;
}

/**
 * Creates a boolean vector with a value for each id where each value is true if its id is in the passed in vector
 * @param {Vector} vector
 * @param {number[]} ids filter used only by GetTcData not InApp
 * @return {BooleanVector}
 */
export const createBooleanVector = function(vector: Vector, ids?: number[]): BooleanVector {

  if (ids) {

    return ids.reduce<BooleanVector>((booleanVector, obj): BooleanVector => {

      booleanVector[obj] = vector.has(+obj);
      return booleanVector;

    }, {});

  }

  return [...vector].reduce<BooleanVector>((booleanVector, keys: IdBoolTuple): BooleanVector => {

    booleanVector[keys[0].toString(10)] = keys[1];
    return booleanVector;

  }, {});

};
