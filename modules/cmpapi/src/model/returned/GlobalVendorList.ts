import {Declarations, Feature, GVL, IntMap, Purpose, Stack, Vendor, VendorList} from '@iabtcf/core';
import {Return} from './Return';

interface GlobalVendorListFields extends VendorList, Declarations {}

export class GlobalVendorList extends Return implements GlobalVendorListFields {

  public gvlSpecificationVersion: number;
  public vendorListVersion: number;
  public lastUpdated: string | Date;
  public purposes: IntMap<Purpose>;
  public specialPurposes: IntMap<Purpose>;
  public features: IntMap<Feature>;
  public specialFeatures: IntMap<Feature>;
  public vendors: IntMap<Vendor>;
  public stacks: IntMap<Stack>;

  public constructor(gvl: GVL) {

    super();

    this.gvlSpecificationVersion = gvl.gvlSpecificationVersion;
    this.vendorListVersion = gvl.vendorListVersion;
    this.lastUpdated = gvl.lastUpdated;
    this.purposes = gvl.purposes;
    this.specialPurposes = gvl.specialPurposes;
    this.features = gvl.features;
    this.specialFeatures = gvl.specialFeatures;
    this.vendors = gvl.vendors;
    this.stacks = gvl.stacks;

  }

}
