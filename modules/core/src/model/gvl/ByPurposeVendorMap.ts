export interface ByPurposeVendorMap {
  [purposeId: string]: {
    legInt: Set<number>;
    consent: Set<number>;
    flexible: Set<number>;
  };
}
