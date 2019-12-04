import {IntMap} from '../IntMap';
import {Vendor} from './Vendor';
import {Declarations} from './Declarations';

export interface VendorList extends Declarations {
  vendors: IntMap<Vendor>;
};
