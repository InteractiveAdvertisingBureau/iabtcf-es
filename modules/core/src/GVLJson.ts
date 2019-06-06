interface Purpose {
  id: number;
  name: string;
  description: string;
  descriptionLegal: string;
  consentable? : boolean;
  rightToObject?: boolean;
};

interface Purposes {
  [id: string]: Purpose;
};

interface SpecialPurposes {
  [id: string]: Purpose;
};

interface Feature {
  id: number;
  name: string;
  description: string;
  descriptionLegal: string;
};

interface Features {
  [id: string]: Feature;
};

interface SpecialFeatures {
  [id: string]: Feature;
};

interface Vendor {
  id: number;
  name: string;
  purposeIds: number[];
  legIntPurposeIds: number[];
  flexiblePurposeIds?: number[];
};

interface Vendors {
  [id: string]: Vendor;
};

interface GVLJson {
  gvlSpecificationVersion: number;
  vendorListVersion: number;
  tcfPolicyVersion: number;
  lastUpdated: string;
  purposes: Purposes;
  specialPurposes: SpecialPurposes;
  features: Features;
  speciaLFeatures: SpecialFeatures;
  vendors: Vendors;
};

export {GVLJson, Purpose, Purposes, Feature, Features, Vendor, Vendors};
