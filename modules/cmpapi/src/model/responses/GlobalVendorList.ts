import {Declarations, VendorList} from '@iabtcf/core';
import {Response} from './Response';

/**
 * GlobalVendorList response model to be returned to TCF Api Command issuer
 */
export interface GlobalVendorList extends VendorList, Declarations, Response {
}
