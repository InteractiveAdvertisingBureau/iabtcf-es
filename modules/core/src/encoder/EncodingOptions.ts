import {Segment} from '../model';

export interface EncodingOptions {
  isForVendors?: boolean;
  version?: 1 | 2;
  segments?: Segment[];
}
