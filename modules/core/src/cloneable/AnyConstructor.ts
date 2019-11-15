import {AnyArray} from "./AnyArray";

export interface AnyConstructor<T> {
  new(...args: AnyArray): T;
}
