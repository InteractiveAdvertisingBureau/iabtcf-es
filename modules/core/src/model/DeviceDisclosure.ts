import {DeviceDisclosureStorageAccessType} from './DeviceDisclosureStorageAccessType.js';

export interface DeviceDisclosure {
  domain?: string;
  cookieRefresh?: boolean;
  identifier: string;
  maxAgeSeconds: number | null;
  purposes: number[];
  type: DeviceDisclosureStorageAccessType;
}
