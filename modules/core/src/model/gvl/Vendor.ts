import {GVLMapItem} from './GVLMapItem.js';

export interface Vendor extends GVLMapItem {
  purposes: number[];
  legIntPurposes: number[];
  flexiblePurposes: number[];
  specialPurposes: number[];
  features: number[];
  specialFeatures: number[];
  policyUrl: string;
  usesCookies: boolean;
  cookieMaxAgeSeconds: number | null;
  cookieRefresh: boolean;
  usesNonCookieAccess: boolean;
  deviceStorageDisclosureUrl?: string;
  deletedDate?: Date | string;
  overflow?: {
    httpGetLimit: 32 | 128;
  };
}
