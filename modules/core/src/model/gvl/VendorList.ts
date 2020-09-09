import {IntMap} from '../IntMap';
import {Vendor} from './Vendor';
import {DeclarationMap} from './DeclarationMap';

export interface VendorList extends DeclarationMap {
  lastUpdated: string | Date;
  gvlSpecificationVersion: number;
  vendorListVersion: number;
  tcfPolicyVersion: number;
  vendors: IntMap<Vendor>;
};
