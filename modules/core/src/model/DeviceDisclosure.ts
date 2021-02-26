export interface DeviceDisclosure {
  domain?: string;
  cookieRefresh?: boolean;
  identifier: string;
  maxAgeSeconds: number | null;
  purposes: number[];
  type: string;
}
