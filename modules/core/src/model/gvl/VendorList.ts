import {IntMap} from '../IntMap';
import {Vendor} from './Vendor';
import {Declarations} from './Declarations';

export interface VendorList extends Declarations {
  lastUpdated: string | Date;
  gvlSpecificationVersion: number;
  vendorListVersion: number;
  tcfPolicyVersion: number;
  vendors: IntMap<Vendor>;
};
