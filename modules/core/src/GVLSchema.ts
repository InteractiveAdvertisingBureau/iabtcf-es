interface Purpose {
  id: number;
  name: string;
  description: string;
  descriptionLegal: string;
  /*
   * default=true  false means CMPs should never afford users the means to
   * provide an opt-in consent choice
   */
  consentable? : boolean;
  /**
   * default=true  false means CMPs should never afford users the means to
   * exercise a right to object
   */
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

interface Overflow {
  httpGetLimit: 32 | 128;
}

interface Vendor {
  id: number;
  name: string;
  purposeIds: number[];
  legIntPurposeIds: number[];
  flexiblePurposeIds?: number[];
  featureIds: number[];
  specialFeatureIds: number[];
  policyUrl: string;
  deletedDate?: Date | string;
  overflow?: Overflow;
};

interface Vendors {
  [id: string]: Vendor;
};

interface Stack {
  id: number;
  purposes: number[];
  specialPurposes: number[];
  name: string;
  description: string;
}
interface Stacks {
  [id: string]: Stack;
};

interface GVLSchema {
  gvlSpecificationVersion: number;
  vendorListVersion: number;
  tcfPolicyVersion: number;
  lastUpdated: string | Date;
  purposes: Purposes;
  specialPurposes: SpecialPurposes;
  features: Features;
  specialFeatures: SpecialFeatures;
  vendors: Vendors;
  stacks: Stacks;
};

export {GVLSchema, Purpose, Purposes, Features, Vendor, Vendors, SpecialPurposes, SpecialFeatures, Stacks};
