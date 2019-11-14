export interface Cloneable<T> {
  clone(): T;
}

export function isCloneable(obj: object): obj is Cloneable<unknown> {

  return obj !== undefined && (obj as Cloneable<unknown>).clone !== undefined;

}
