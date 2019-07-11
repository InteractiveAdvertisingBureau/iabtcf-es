import {GVLBase} from './GVLBase';
import {GVLMap} from './GVLMap';
import {Vendor} from './Vendor';


export interface VendorList extends GVLBase {
  vendors: GVLMap<Vendor>;
};
