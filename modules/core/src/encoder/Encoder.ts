export interface Encoder<T> {
  encode(value: T, param?: number | string | boolean): string;
  decode(value: string, target?: T, param?: number | string): T;
  getBitLength?(): number;
}
