import {AnyArray} from './AnyArray';

/**
 * Interface represents a constructor that can take any params.
 */
export interface AnyConstructor<T> {
  new(...args: AnyArray): T;
}
