export interface Encoder<T> {
  encode(value: T, param?: number | string): string;
  decode(value: string, target?: T, param?: number | string): T;
  getBitLength?(): number;
}
