import {GVLBase, GVLMap, Vendor} from './GVLBase';

export interface VendorList extends GVLBase {
  vendors: GVLMap<Vendor>;
};
