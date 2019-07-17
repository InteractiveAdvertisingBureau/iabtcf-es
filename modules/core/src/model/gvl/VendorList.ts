import {GVLBase} from './GVLBase';
import {IntMap} from '../IntMap';
import {Vendor} from './Vendor';


export interface VendorList extends GVLBase {
  vendors: IntMap<Vendor>;
};
