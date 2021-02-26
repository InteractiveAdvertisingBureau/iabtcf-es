import {GVLMapItem} from './GVLMapItem';
export interface Vendor extends GVLMapItem {
  purposes: number[];
  legIntPurposes: number[];
  flexiblePurposes: number[];
  specialPurposes: number[];
  features: number[];
  specialFeatures: number[];
  policyUrl: string;
  cookieMaxAgeSeconds: number | null;
  cookieRefresh: boolean;
  usesNonCookieAccess: boolean;
  deviceStorageDisclosureUrl?: string;
  deletedDate?: Date | string;
  overflow?: {
    httpGetLimit: 32 | 128;
  };
};
