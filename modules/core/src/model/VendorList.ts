import {GVLBase, GVLMap, GVLMapItem} from './GVLBase';

export interface Vendor extends GVLMapItem {
  purposeIds: number[];
  legIntPurposeIds: number[];
  flexiblePurposeIds?: number[];
  specialPurposeIds: number[];
  featureIds: number[];
  specialFeatureIds: number[];
  policyUrl: string;
  deletedDate?: Date | string;
  overflow?: {
    httpGetLimit: 32 | 128;
  };
};

export interface VendorList extends GVLBase {
  vendors: GVLMap<Vendor>;
};
