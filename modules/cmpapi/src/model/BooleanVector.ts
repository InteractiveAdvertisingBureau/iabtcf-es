import {Vector} from '@iabtcf/core';

export interface BooleanVector {
  [id: string]: boolean;
}

/**
 * Creates a boolean vector with a value for each id where each value is true if its id is in the passed in vector
 * @param {Vector} vector
 * @return {BooleanVector}
 */
export const createBooleanVector = function(vector: Vector): BooleanVector {

  const booleanVector = {};
  vector.forEach((value: boolean, id: number): void => {

    booleanVector[id.toString(10)] = value;

  });

  return booleanVector;

};
