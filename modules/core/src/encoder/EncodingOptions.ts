import {Segment} from '../model/index.js';

export interface EncodingOptions {
  isForVendors?: boolean;
  version?: 1 | 2;
  segments?: Segment[];
}
