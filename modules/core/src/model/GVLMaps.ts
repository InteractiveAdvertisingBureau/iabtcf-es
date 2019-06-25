export interface ByPurposeVendorMap {
  [purposeId: string]: {
    legInt: Set<number>;
    consent: Set<number>;
    flexible: Set<number>;
  };
}

export interface BySpecialPurposeVendorMap {
  [purposeId: string]: Set<number>;
}

export interface ByFeatureVendorMap {
  [featureId: string]: Set<number>;
}

export interface BySpecialFeatureVendorMap {
  [featureId: string]: Set<number>;
}
